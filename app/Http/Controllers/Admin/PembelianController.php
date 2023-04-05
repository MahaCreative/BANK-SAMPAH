<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PembelianResource;
use App\Models\DetailPembelian;
use App\Models\KategoriSampah;
use App\Models\mutasi;
use App\Models\Pembelian;
use App\Models\ProfileAnggota;
use Illuminate\Http\Request;

class PembelianController extends Controller
{
    public $search;
    public function query($search, $paginate)
    {
        $this->search = $search;
        $count = Pembelian::count();
        if($paginate == "all"){
            if($search == null){
                return Pembelian::with(['profile_petugas','profile_anggota', 'detail_pembelian' => function ($q) {
                    $q->with('kategori_sampah');
                }])->latest()->fastPaginate( $count);
            }else{
                return Pembelian::with(['profile_petugas','profile_anggota', 'detail_pembelian' => function ($q) {
                    $q->with('kategori_sampah');
                }])->whereHas('profile_anggota', function($q){
                    $q->where('nama_anggota', 'like', '%' . $this->search . '%');
                })
                ->latest()->fastPaginate( $count);
            }
        }else{
             if($search == null){
                return Pembelian::with(['profile_petugas','profile_anggota', 'detail_pembelian' => function ($q) {
                    $q->with('kategori_sampah');
                }])->latest()->fastPaginate($paginate);
            }else{
                return Pembelian::with(['profile_petugas','profile_anggota', 'detail_pembelian' => function ($q) {
                    $q->with('kategori_sampah');
                }])->whereHas('profile_anggota', function($q){
                    $q->where('nama_anggota', 'like', '%' . $this->search . '%');
                })
                ->latest()->fastPaginate($paginate);
            }
        }


    }
    public function index(Request $request)
    {
        $anggota = ProfileAnggota::latest()->get();
        $pembelian = PembelianResource::collection($this->query($request->search, $request->paginate));

        return inertia('Admin/Pembelian/Pembelian', ['pembelian' => $pembelian,'anggota' => $anggota]);
    }

    public function create_pembelian(Request $request)
    {
        $countPembelian = Pembelian::count();

        $kd_pembelian = 'PB/00' . rand(0, 999) . now()->format('dmy') . '0' . $countPembelian + 1;
        // dd($request->all());
        $pembelian = Pembelian::create([
            'no_pembelian' => $kd_pembelian,
            'petugas_id' => $request->user()->profile_petugas->id,
            'anggota_id' => $request->id,
            'tanggal_pembelian' => now()->format('Y-m-d'),
            'total_pembelian' => 0,
        ]);

        $request->session()->put('pembelian', $pembelian);
        return redirect()->route('admin.search-produk-pembelian');
    }

    public function search_produk(Request $request)
    {
        $pembelian = $request->session()->get('pembelian');
        $getPembelian = Pembelian::with(['profile_anggota','detail_pembelian' => function ($q) {
            $q->with('kategori_sampah');
        }])->where('id', $pembelian->id)->first();
        $sampah = [];
        if ($request->search === null) {
            $sampah = KategoriSampah::get();
        } else {
            $sampah = KategoriSampah::where('nama_kategori', 'like', '%' . $request->search . '%')->latest()->get();
        }

        $total = 0;
        foreach ($getPembelian->detail_pembelian as $item) {
            $total = $total + ($item->jumlah * $item->harga_beli);
            $getPembelian->update(['total_pembelian' => $total]);
        }


        return inertia('Admin/Pembelian/CreatePembelian', ['pembelian' => $getPembelian, 'sampah' => $sampah]);
    }
    // methode menambahkan item sampah baru ke keranjang
    public function add_product_pembelian(Request $request){
        $pembelian = $request->session()->get('pembelian');
        $getPembelian = Pembelian::findOrFail($pembelian->id);
        $detail_pembelian = $getPembelian->detail_pembelian()->where('kategori_sampah_id', $request->id)->first();
        // $detail_pembelian = $getPembelian->detail_pembelian()->count();
        if($detail_pembelian == null){
            $getPembelian->detail_pembelian()->create([
                'kategori_sampah_id' => $request->id,
                'harga_beli' => $request->harga_beli,
                'jumlah' => 1
            ]);
        }else{
            $detail_pembelian['jumlah'] = $detail_pembelian['jumlah'] + 1;
            $detail_pembelian->save();
        }
         return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil menambahkan item'
        ]);
    }
// menambahkan value jumlah item sampah yang dibeli
    public function insert_pembelian_sampah(Request $request)
    {
        // dd($request->all());
        $sessionPembelian = $request->session()->get('pembelian');
        // dd($sessionPembelian);
        $pembelian = Pembelian::with('detail_pembelian')->where('id', $sessionPembelian->id)->first();
        $item_sampah = $pembelian->detail_pembelian()->where('kategori_sampah_id', $request->id_sampah)->first();
        if ($item_sampah !== null) {
            $item_sampah->update([
                'jumlah' => $request->jumlah,
            ]);
        }
    }
    // proses menghapus item sampah di keranjang pembelian
    public function delete_item_sampah_pembelian(Request $request){
        $itemPenjualan = DetailPembelian::findOrFail($request->id);
        $itemPenjualan->delete();
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil menghapus item'
        ]);
    }
    // proses pembayaran pembelian sampah dari anggota
        public function check_out_pembelian(Request $request)
    {
        $pembelian = $request->session()->get('pembelian');
        $getpembelian = pembelian::with(['detail_pembelian' => function ($q) {
            $q->with('kategori_sampah');
        }])->findOrFail($pembelian->id);
        // // dd($getpembelian->detail_pembelian[0]['kategori_sampah_id']);
        for ($i = 0; $i <= count($getpembelian->detail_pembelian) - 1; $i++) {
            $kategori_sampah = KategoriSampah::findOrFail($getpembelian->detail_pembelian[$i]['kategori_sampah_id']);
            $kategori_sampah['stok'] = $kategori_sampah['stok'] + $getpembelian->detail_pembelian[$i]['jumlah'];
            $kategori_sampah->save();
        }

        $getpembelian->update([
            'status_pembelian' => 'pembelian selesai'
        ]);

        $countMutasi = mutasi::where('jenis_mutasi', 'setoran')->count();
        $kd_mutasi = 'SN'. now()->format('dmy').rand(1,100).$countMutasi + 1;

        // Cek Saldo Anggota
        $cekMutasi = mutasi::where('profile_anggota_id', $pembelian->anggota_id)->first();
        if($cekMutasi == null){
            mutasi::create([
                'no_mutasi' => $kd_mutasi,
                'profile_anggota_id' => $pembelian->anggota_id,
                'profile_petugas_id' => $request->user()->id,
                'tanggal_mutasi' => now(),
                'jenis_mutasi' => 'Setoran',
                'jumlah_mutasi' => $getpembelian->total_pembelian,
                'saldo' => $getpembelian->total_pembelian,
            ]);
        }else{
            $cekMutasi->create([
                'no_mutasi' => $kd_mutasi,
                'profile_anggota_id' => $pembelian->anggota_id,
                'profile_petugas_id' => $request->user()->id,
                'tanggal_mutasi' => now(),
                'jenis_mutasi' => 'Setoran',
                'jumlah_mutasi' => $getpembelian->total_pembelian,
                'saldo' => $cekMutasi['saldo'] + $getpembelian->total_pembelian,
            ]);
        }
        // proses mutasi pembelian

        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'pembelian berhasil dilakukan'
        ]);
    }
}