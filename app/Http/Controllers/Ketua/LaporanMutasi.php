<?php

namespace App\Http\Controllers\Ketua;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LaporanMutasi extends Controller
{
    public function index(Request $request){
        return inertia('Ketua/Laporan/Mutasi');
    }
}