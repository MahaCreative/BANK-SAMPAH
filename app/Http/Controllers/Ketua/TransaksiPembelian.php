<?php

namespace App\Http\Controllers\Ketua;

use App\Http\Controllers\Controller;
use App\Http\Resources\PembelianResource;
use App\Models\Pembelian;
use App\Models\Penjualan;
use Illuminate\Http\Request;

class TransaksiPembelian extends Controller
{
    public $search;
    public function query($request){
        $this->search = $request->search;
        $count = Pembelian::where('status_pembelian','pembelian_selesai')->count();
        if($request->search === null and $request->tanggal_awal !== null or $request->tanggal_akhir !== null){
            if($request->tanggal_awal === null && $request->tanggal_akhir === null){
        return Pembelian::with(['profile_anggota', 'profile_petugas'])
        ->where('status_pembelian' ,'pembelian selesai')->latest()->fastPaginate();
        }else if($request->tanggal_awal !== null && $request->tanggal_akhir == null){
            return Pembelian::with(['profile_anggota', 'profile_petugas'])
            ->where('status_pembelian' ,'pembelian selesai')
            ->where('created_at', '>=', $request->tanggal_awal)->latest()->fastPaginate($count);
        }else if($request->tanggal_awal == null && $request->tanggal_akhir !== null){
            return Pembelian::with(['profile_anggota', 'profile_petugas'])
            ->where('status_pembelian' ,'pembelian selesai')
            ->where('created_at', '<=', $request->tanggal_awal)->latest()->fastPaginate($count);
        }else if($request->tanggal_awal !== null && $request->tanggal_akhir !== null){
            return Pembelian::with(['profile_anggota', 'profile_petugas'])
            ->where('status_pembelian' ,'pembelian selesai')
            ->where('created_at', '>=', $request->tanggal_awal)
            ->where('created_at', '<=', $request->tanggal_akhir)->latest()->fastPaginate($count);
        }
        }else{
           if($request->paginate === 'all'){
                if($request->search === null){
                    return Pembelian::with(['profile_anggota', 'profile_petugas'])
                    ->where('status_pembelian' ,'pembelian selesai')->fastPaginate($count);
                }else{
                    return Pembelian::with(['profile_anggota', 'profile_petugas'])
                    ->where('status_pembelian' ,'pembelian selesai')
                    ->whereHas('profile_anggota', function($query){
                        $query->where('nama_anggota', 'like', '%' .$this->search . '%');
                    })
                    ->orWhereHas('profile_petugas', function($query){
                        $query->where('nama_petugas', 'like', '%' .$this->search . '%');
                    })
                    ->fastPaginate($count);
                }
            }else{
                if($request->search === null){
                    return Pembelian::with(['profile_anggota', 'profile_petugas'])
                    ->where('status_pembelian' ,'pembelian selesai')->fastPaginate($request->paginate);
                }else{
                    return Pembelian::with(['profile_anggota', 'profile_petugas'])
                    ->where('status_pembelian' ,'pembelian selesai')
                    ->whereHas('profile_anggota', function($query){
                        $query->where('nama_anggota', 'like', '%' .$this->search . '%');
                    })
                    ->orWhereHas('profile_petugas', function($query){
                        $query->where('nama_petugas', 'like', '%' .$this->search . '%');
                    })
                    ->fastPaginate($request->paginate);
                }
            }
        }




    }
    public function index(Request $request){
        $pembelian = PembelianResource::collection($this->query($request));
        $pembelianBulan = Pembelian::where('status_pembelian', '=', 'pembelian selesai')
        ->whereMonth('created_at', date('m'))
        ->whereYear('created_at', date('Y'))
        ->sum('total_pembelian');
        $pembelianTahun = Pembelian::where('status_pembelian', '=', 'pembelian selesai')
        ->whereYear('created_at', date('Y'))
        ->sum('total_pembelian');

        return inertia('Ketua/Transaksi/Pembelian', ['pembelian' => $pembelian, 'pembelian_tahun' => $pembelianTahun, 'pembelian_bulan' => $pembelianBulan]);
    }
}