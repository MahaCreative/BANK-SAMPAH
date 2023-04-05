<?php

namespace App\Http\Controllers\Kasir;

use App\Http\Controllers\Controller;
use App\Http\Resources\KategoriSampahResource;
use App\Models\KategoriSampah;
use Illuminate\Http\Request;

class KategoriSampahController extends Controller
{


    public function query($search, $paginate)
    {
        if ($paginate !== 'all') {

            if ($search !== null) {
                return KategoriSampah::where('nama_kategori', 'like', '%' . $search . '%')->fastPaginate($paginate);
            } else {
                return KategoriSampah::fastPaginate($paginate);
            }
        } else {
            if ($search !== null) {
                return KategoriSampah::where('nama_kategori', 'like', '%' . $search . '%')->get();
            }
            return KategoriSampah::all();
        }
    }

    public function index(Request $request)
    {
        $kategoriSampah = KategoriSampahResource::collection($this->query($request->search, $request->paginate));

        return inertia('Admin/KategoriSampah/KategoriSampah', ['kategori_sampah' => $kategoriSampah]);
    }
    public function store(Request $request)
    {

        $request->validate([
            'nama_kategori' => 'required',
            'harga_beli' => 'required',
            'harga_jual' => 'required',
            'satuan' => 'required',
            'stok' => 'required',
            'image' => 'required',
        ]);



        $harga_beli = preg_replace('/[^0-9]/', "", $request->harga_beli);
        $harga_jual = preg_replace('/[^0-9]/', "", $request->harga_jual);
        $urlImage = $request->file('image') ? $request->file('image')->store('images/kategori_sampah') : 'images/sampah.png';

        $kategori = KategoriSampah::create([
            'petugas_id' => $request->user()->id,
            'nama_kategori' => $request->nama_kategori,
            'harga_beli' => $harga_beli,
            'harga_jual' => $harga_jual,
            'satuan' => $request->satuan,
            'stok' => $request->stok,
            'image' => $urlImage,
        ]);

        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil menambahkan kategori sampah baru'
        ]);
    }
    public function update(Request $request)
    {
        // dd($request->all());
        $kategoriSampah = KategoriSampah::findOrFail($request->data['id']);

        $harga_beli = preg_replace('/[^0-9]/', "", $request->data['harga_beli']);
        $harga_jual = preg_replace('/[^0-9]/', "", $request->data['harga_jual']);

        $urlImage = $request->file('image') ? $request->file('image')->store('images/kategori_sampah') : 'images/sampah.png';

        $kategoriSampah->update([
            'petugas_id' => $request->user()->id,
            'nama_kategori' => $request->data['nama_kategori'],
            'harga_beli' => $harga_beli,
            'harga_jual' => $harga_jual,
            'satuan' => $request->data['satuan'],
            'stok' => $request->data['stok'],
            'image' => $urlImage,
        ]);

        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil melakukan perubaha data'
        ]);
    }
    public function delete(Request $request)
    {

        $kategoriSampah = KategoriSampah::findOrFail($request->id);
        $kategoriSampah->delete();
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil menghapus data'
        ]);
    }
}
