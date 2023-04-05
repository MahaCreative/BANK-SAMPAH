<?php

namespace App\Http\Controllers\Anggota;

use App\Http\Controllers\Controller;
use App\Http\Resources\MutasiResource;
use App\Models\mutasi;
use App\Models\ProfileAnggota;
use Illuminate\Http\Request;

class HistoryPenarikan extends Controller
{
    public function query($request){
        $anggota = ProfileAnggota::where('user_id', $request->user()->id)->first();
        if($request->tanggal_awal === null && $request->tanggal_akhir === null){

            return mutasi::where('profile_anggota_id', $anggota->id)
            ->with('profile_petugas')
            ->where('jenis_mutasi', 'Penarikan')
            ->latest()->fastPaginate();
        }else if($request->tanggal_awal !== null && $request->tanggal_akhir == null){
            return mutasi::where('profile_anggota_id', $anggota->id)
            ->with('profile_petugas')
            ->where('jenis_mutasi', 'Penarikan')
            ->where('tanggal_mutasi', '>=', $request->tanggal_awal)
            ->latest()->fastPaginate();

        }else if($request->tanggal_awal === null && $request->tanggal_akhir !== null){
            return mutasi::where('profile_anggota_id', $anggota->id)
            ->with('profile_petugas')
            ->where('jenis_mutasi', 'Penarikan')
            ->where('tanggal_mutasi', '<=', $request->tanggal_akhir)
            ->latest()->fastPaginate();
        }else{
            return mutasi::where('profile_anggota_id', $anggota->id)
            ->with('profile_petugas')
            ->where('jenis_mutasi', 'Penarikan')
            ->where('tanggal_mutasi', '>=', $request->tanggal_awal)
            ->where('tanggal_mutasi', '<=', $request->tanggal_akhir)
            ->latest()->fastPaginate();
        }
    }
    public function index(Request $request){
        $anggota = ProfileAnggota::where('user_id', $request->user()->id)->first();
        $mutasi = MutasiResource::collection($this->query($request));
        // return $mutasi;
        $PenarikanBulan = mutasi::where('profile_anggota_id', $anggota->id)
        ->where('jenis_mutasi', 'Penarikan')
        ->whereMonth('tanggal_mutasi', date('m'))
        ->whereYear('tanggal_mutasi', date('Y'))
        ->sum('jumlah_mutasi');
        $PenarikanTahun = mutasi::where('profile_anggota_id', $anggota->id)
        ->where('jenis_mutasi', 'Penarikan')
        ->whereYear('tanggal_mutasi', date('Y'))
        ->sum('jumlah_mutasi');
        // dd($PenjualanBulan, $PenjualanTahun);
        // dd($mutasi);
        return inertia('Anggota/Penarikan/HistoryPenarikan', ['mutasi' => $mutasi,'penarikan_bulan' => $PenarikanBulan, 'penarikan_tahun' => $PenarikanTahun]);
    }
}