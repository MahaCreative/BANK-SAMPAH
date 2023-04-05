<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PenjualanResource;
use App\Models\DetailPenjualan;
use App\Models\KategoriSampah;
use App\Models\Penjualan;
use Illuminate\Http\Request;

class PenjualanController extends Controller
{
    public function query()
    {
        return Penjualan::with(['profile_petugas', 'detail_penjualan' => function ($q) {
            $q->with('kategori_sampah');
        }])->latest()->fastPaginate();
    }
    public function index(Request $request)
    {

        $penjualan = PenjualanResource::collection($this->query());
        return inertia('Admin/Penjualan/Penjualan', ['penjualan' => $penjualan]);
    }

    public function create_penjualan(Request $request)
    {

        $countPenjulan = Penjualan::count();
        $kd_penjualan = 'PJ/' . now()->format('dmy') . rand(0, 999) . '0' . $countPenjulan + 1;

        $penjualan = Penjualan::create([
            'petugas_id' => $request->user()->profile_petugas->id,
            'no_penjualan' => $kd_penjualan,
            'tanggal_penjualan' => now()->format('Y-m-d'),
            'total_penjualan' => 0
        ]);
        $request->session()->put('penjualan', $penjualan);
        return redirect()->route('admin.search-produk');
    }
    public function search_produk(Request $request)
    {
        $sampah = [];
        if ($request->search === null) {
            $sampah = KategoriSampah::get();
        } else {
            $sampah = KategoriSampah::where('nama_kategori', 'like', '%' . $request->search . '%')->latest()->get();
        }
        $penjualan = $request->session()->get('penjualan');
        $getPenjualan = Penjualan::with(['detail_penjualan' => function ($q) {
            $q->with('kategori_sampah');
        }])->where('id', $penjualan->id)->first();

        $total = 0;
        foreach ($getPenjualan->detail_penjualan as $item) {
            $total = $total + ($item->jumlah * $item->harga_jual);
            $getPenjualan->update(['total_penjualan' => $total]);
        }
        // dd($total);

        return inertia("Admin/Penjualan/CreatePenjualan", ['penjualan' => $getPenjualan, 'sampah' => $sampah]);
    }

    public function add_sampah(Request $request)
    {
        // dd($request->all());
        $penjualan = $request->session()->get('penjualan');
        $getPenjualan = Penjualan::findOrFail($penjualan->id);
        $getPenjualan->detail_penjualan()->create([
            'kategori_sampah_id' => $request->id,
            'harga_jual' => $request->harga_jual,
            'jumlah' => 1
        ]);

        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil menambahkan item'
        ]);
    }

    public function insert_sampah(Request $request)
    {
        // dd($request->all());
        $sessionPenjualan = $request->session()->get('penjualan');
        // dd($sessionPenjualan);
        $penjualan = Penjualan::with('detail_penjualan')->where('id', $sessionPenjualan->id)->first();
        $item_sampah = $penjualan->detail_penjualan()->where('kategori_sampah_id', $request->id_sampah)->first();
        if ($item_sampah !== null) {
            $item_sampah->update([
                'jumlah' => $request->jumlah,
            ]);
        }
    }

    public function check_out(Request $request)
    {
        $penjualan = $request->session()->get('penjualan');
        $getPenjualan = Penjualan::with(['detail_penjualan' => function ($q) {
            $q->with('kategori_sampah');
        }])->findOrFail($penjualan->id);
        // dd($getPenjualan->detail_penjualan[0]['kategori_sampah_id']);
        for ($i = 0; $i <= count($getPenjualan->detail_penjualan) - 1; $i++) {
            $kategori_sampah = KategoriSampah::findOrFail($getPenjualan->detail_penjualan[$i]['kategori_sampah_id']);
            $kategori_sampah['stok'] = $kategori_sampah['stok'] - $getPenjualan->detail_penjualan[$i]['jumlah'];
            $kategori_sampah->save();
        }



        $getPenjualan->update([
            'status_penjualan' => 'penjualan selesai'
        ]);

        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Penjualan berhasil dilakukan'
        ]);
    }

    public function delete_item(Request $request)
    {
        // dd($request->all());
        $itemPenjualan = DetailPenjualan::findOrFail($request->id);
        $itemPenjualan->delete();
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil menghapus item'
        ]);
    }
}
