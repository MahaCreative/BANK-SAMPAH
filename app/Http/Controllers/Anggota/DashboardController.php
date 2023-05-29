<?php

namespace App\Http\Controllers\Anggota;

use App\Http\Controllers\Controller;
use App\Models\mutasi;
use App\Models\ProfileAnggota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request){

        $anggota = ProfileAnggota::with('mutasi')->where('user_id', $request->user()->id)->first();
        $saldo = mutasi::where('profile_anggota_id', $anggota->id)->latest()->first() === null ? 0 : mutasi::where('profile_anggota_id', $anggota->id)->latest()->first();



        $pemasukan = mutasi::where('profile_anggota_id', $anggota->id)
            ->where('jenis_mutasi', '=', 'Setoran')
            ->whereMonth('tanggal_mutasi', date('m'))
            ->sum('jumlah_mutasi');
        $penarikan = mutasi::where('profile_anggota_id', $anggota->id)
            ->where('jenis_mutasi', '=', 'Penarikan')
            ->whereMonth('tanggal_mutasi', date('m'))
            ->sum('jumlah_mutasi');
            // ->get();
            // dd($anggota);
        // dd($penarikan);
        return inertia('Anggota/Dashboard/Dashboard', ['pemasukan' => $pemasukan, 'penarikan' => $penarikan, 'saldo' => $saldo]);
    }
}