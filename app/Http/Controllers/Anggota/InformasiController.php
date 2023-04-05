<?php

namespace App\Http\Controllers\Anggota;

use App\Http\Controllers\Controller;
use App\Http\Resources\InformasiResource;
use App\Models\Informasi;
use Illuminate\Http\Request;

class InformasiController extends Controller
{

    public function query($search)
    {
        if ($search == null) {
            return Informasi::with('profile_petugas')->fastPaginate(14);
        } else {
            return Informasi::with('profile_petugas')->where('judul', 'like', '%' . $search . '%')->fastPaginate(14);
        }
    }

    public function index(Request $request)
    {
        // dd($request->all());
        $informasi = $this->query($request->search);
        $informasi = InformasiResource::collection($informasi);
        return inertia("Anggota/Informasi/Index", ['informasi' => $informasi]);
    }

    public function show($slug, Request $request)
    {
        $informasi = Informasi::with('profile_petugas')->where('slug', $slug)->first();
        // dd($informasi);
        return inertia("Anggota/Informasi/Informasi", ['informasi' => $informasi]);
    }
}
