<?php

namespace App\Http\Controllers\Ketua;

use App\Http\Controllers\Controller;
use App\Http\Resources\penjualanResource;
use App\Http\Resources\PenjualanResources;
use App\Models\Penjualan as penjualan;
use Illuminate\Http\Request;

class TransaksiPenjualan extends Controller
{
     public $search;
    public function query($request){
        $this->search = $request->search;
        $count = penjualan::where('status_penjualan','penjualan_selesai')->count();
        if($request->search === null and $request->tanggal_awal !== null or $request->tanggal_akhir !== null){
            if($request->tanggal_awal === null && $request->tanggal_akhir === null){
        return penjualan::with(['profile_petugas'])
        ->where('status_penjualan' ,'penjualan selesai')->latest()->fastPaginate();
        }else if($request->tanggal_awal !== null && $request->tanggal_akhir == null){
            return penjualan::with(['profile_petugas'])
            ->where('status_penjualan' ,'penjualan selesai')
            ->where('created_at', '>=', $request->tanggal_awal)->latest()->fastPaginate($count);
        }else if($request->tanggal_awal == null && $request->tanggal_akhir !== null){
            return penjualan::with(['profile_petugas'])
            ->where('status_penjualan' ,'penjualan selesai')
            ->where('created_at', '<=', $request->tanggal_awal)->latest()->fastPaginate($count);
        }else if($request->tanggal_awal !== null && $request->tanggal_akhir !== null){
            return penjualan::with(['profile_petugas'])
            ->where('status_penjualan' ,'penjualan selesai')
            ->where('created_at', '>=', $request->tanggal_awal)
            ->where('created_at', '<=', $request->tanggal_akhir)->latest()->fastPaginate($count);
        }
        }else{
           if($request->paginate === 'all'){
                if($request->search === null){
                    return penjualan::with(['profile_petugas'])
                    ->where('status_penjualan' ,'penjualan selesai')->fastPaginate($count);
                }else{
                    return penjualan::with(['profile_petugas'])
                    ->where('status_penjualan' ,'penjualan selesai')
                    ->orWhereHas('profile_petugas', function($query){
                        $query->where('nama_petugas', 'like', '%' .$this->search . '%');
                    })
                    ->fastPaginate($count);
                }
            }else{
                if($request->search === null){
                    return penjualan::with(['profile_petugas'])
                    ->where('status_penjualan' ,'penjualan selesai')->fastPaginate($request->paginate);
                }else{
                    return penjualan::with(['profile_petugas'])
                    ->where('status_penjualan' ,'penjualan selesai')

                    ->orWhereHas('profile_petugas', function($query){
                        $query->where('nama_petugas', 'like', '%' .$this->search . '%');
                    })
                    ->fastPaginate($request->paginate);
                }
            }
        }




    }
    public function index(Request $request){
        $penjualan = PenjualanResources::collection($this->query($request));
        $penjualanBulan = penjualan::where('status_penjualan', '=', 'penjualan selesai')
        ->whereMonth('created_at', date('m'))
        ->whereYear('created_at', date('Y'))
        ->sum('total_penjualan');
        $penjualanTahun = penjualan::where('status_penjualan', '=', 'penjualan selesai')
        ->whereYear('created_at', date('Y'))
        ->sum('total_penjualan');

        return inertia('Ketua/Transaksi/Penjualan', ['penjualan' => $penjualan, 'penjualan_tahun' => $penjualanTahun, 'penjualan_bulan' => $penjualanBulan]);
    }
}