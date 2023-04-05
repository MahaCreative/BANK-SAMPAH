<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\InformasiResource;
use App\Models\Informasi;
use Illuminate\Http\Request;

class InformasiController extends Controller
{
    public $search, $paginate;
    public function query($paginate, $search)
    {
        $count = Informasi::count();
        if ($paginate == 'all') {
            if ($search == null) {
                return Informasi::with('profile_petugas')->fastPaginate($count);
            } else {
                return Informasi::with('profile_petugas')->where('judul', 'like', '%' . $search . '%')->fastPaginate($count);
            }
        } else {
            if ($search == null) {
                return Informasi::with('profile_petugas')->fastPaginate($paginate);
            } else {
                return Informasi::with('profile_petugas')->where('judul', 'like', '%' . $search . '%')->fastPaginate($paginate);
            }
        }
    }
    public function index(Request $request)
    {
        // dd($request->paginate);
        $informasi = $this->query($request->paginate, $request->search);
        $informasi = InformasiResource::collection($informasi);
        return inertia('Admin/Informasi/Informasi', ['informasi' => $informasi]);
    }

    public function create(Request $request)
    {
        return inertia('Admin/Informasi/Form');
    }

    public function store(Request $request)
    {

        $request->validate([
            'judul' => 'required',
            'deskripsi_singkat' => 'required',
            'isi_informasi' => 'required',
            'gambar_informasi' => 'required|image|mimes:png,jpg,jfif,jpeg',
        ]);

        $urlGambar = $request->file('gambar_informasi') ? $request->file('gambar_informasi')->store('images/informasi') : 'images/preview.png';

        $informasi = Informasi::create([
            'petugas_id' => $request->user()->profile_petugas->id,
            'judul' => $judul = $request->judul,
            'slug' => \Str::slug($judul),
            'tanggal_release' => now()->format('Y-m-d'),
            'deskripsi_singkat' => $request->deskripsi_singkat,
            'isi_informasi' => $request->isi_informasi,
            'gambar_informasi' => $urlGambar
        ]);

        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil menambahkan data'
        ]);
    }

    public function show($slug, Request $request)
    {
        $informasi = Informasi::where('slug', $slug)->first();
        return inertia('Admin/Informasi/Form', ['informasi' => $informasi]);
    }

    public function update(Request $request)
    {
        $informasi = Informasi::findOrFail($request->data['id']);
        $urlGambar = $request->file('gambar_informasi') ? $request->file('gambar_informasi')->store('images/informasi') : 'images/preview.png';
        $informasi->update([
            'petugas_id' => $request->user()->profile_petugas->id,
            'judul' => $judul = $request->data['judul'],
            'tanggal_release' => now()->format('Y-m-d'),
            'deskripsi_singkat' => $request->data['deskripsi_singkat'],
            'isi_informasi' => $request->data['isi_informasi'],
            'gambar_informasi' => $urlGambar
        ]);

        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil melakukan perubahan data informasi'
        ]);
    }

    public function delete(Request $request)
    {
        $informasi = Informasi::findOrFail($request->id);
        $informasi->delete();
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil menghapus data'
        ]);
    }
}
