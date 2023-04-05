<?php

namespace App\Http\Controllers\Anggota;

use App\Http\Controllers\Controller;
use App\Http\Resources\KategoriSampahResource;
use App\Models\KategoriSampah as ModelsKategoriSampah;
use Illuminate\Http\Request;

class KategoriSampah extends Controller
{
        public function query($search, $paginate)
    {
        if ($paginate !== 'all') {

            if ($search !== null) {
                return ModelsKategoriSampah::where('nama_kategori', 'like', '%' . $search . '%')->fastPaginate($paginate);
            } else {
                return ModelsKategoriSampah::fastPaginate($paginate);
            }
        } else {
            if ($search !== null) {
                return ModelsKategoriSampah::where('nama_kategori', 'like', '%' . $search . '%')->get();
            }
            return ModelsKategoriSampah::all();
        }
    }

    public function index(Request $request){
        $kategoriSampah = KategoriSampahResource::collection($this->query($request->search, $request->paginate));
        return inertia('Anggota/KategoriSampah/KategoriSampah', ['kategori_sampah' => $kategoriSampah]);
    }
}