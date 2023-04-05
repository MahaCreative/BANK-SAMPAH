<?php

namespace App\Http\Controllers\Anggota;

use App\Http\Controllers\Controller;
use App\Http\Resources\MutasiResource;
use App\Models\mutasi;
use App\Models\ProfileAnggota;
use Illuminate\Http\Request;

class HistoryPenjualanController extends Controller
{
    public function query($request){
        $anggota = ProfileAnggota::where('user_id', $request->user()->id)->first();
        if($request->tanggal_awal === null && $request->tanggal_akhir === null){

            return mutasi::where('profile_anggota_id', $anggota->id)
            ->where('jenis_mutasi', 'Setoran')
            ->latest()->fastPaginate();
        }else if($request->tanggal_awal !== null && $request->tanggal_akhir == null){
            return mutasi::where('profile_anggota_id', $anggota->id)
            ->where('jenis_mutasi', 'Setoran')
            ->where('tanggal_mutasi', '>=', $request->tanggal_awal)
            ->latest()->fastPaginate();

        }else if($request->tanggal_awal === null && $request->tanggal_akhir !== null){
            return mutasi::where('profile_anggota_id', $anggota->id)
            ->where('jenis_mutasi', 'Setoran')
            ->where('tanggal_mutasi', '<=', $request->tanggal_akhir)
            ->latest()->fastPaginate();
        }else{
            return mutasi::where('profile_anggota_id', $anggota->id)
            ->where('jenis_mutasi', 'Setoran')
            ->where('tanggal_mutasi', '>=', $request->tanggal_awal)
            ->where('tanggal_mutasi', '<=', $request->tanggal_akhir)
            ->latest()->fastPaginate();
        }
    }
    public function index(Request $request){
        $anggota = ProfileAnggota::where('user_id', $request->user()->id)->first();
        $mutasi = MutasiResource::collection($this->query($request));
        // return $mutasi;
        $PenjualanBulan = mutasi::where('profile_anggota_id', $anggota->id)
        ->where('jenis_mutasi', 'Setoran')
        ->whereMonth('tanggal_mutasi', date('m'))
        ->whereYear('tanggal_mutasi', date('Y'))
        ->sum('jumlah_mutasi');
        $PenjualanTahun = mutasi::where('profile_anggota_id', $anggota->id)
        ->where('jenis_mutasi', 'Setoran')
        ->whereYear('tanggal_mutasi', date('Y'))
        ->sum('jumlah_mutasi');
        // dd($PenjualanBulan, $PenjualanTahun);
        // dd($mutasi);
        return inertia('Anggota/Penjualan/Penjualan', ['mutasi' => $mutasi,'penjualan_bulan' => $PenjualanBulan, 'penjualan_tahun' => $PenjualanTahun]);
    }
}