<?php

namespace App\Http\Controllers\Ketua;

use App\Http\Controllers\Controller;
use App\Http\Resources\MutasiResource;
use App\Models\mutasi;
use Illuminate\Http\Request;

class TransaksiMutasi extends Controller
{
    public $search;
    public function query($request){
        $this->search = $request->search;
        $count = mutasi::count();
        if($request->search === null){
            if($request->tanggal_awal === null && $request->tanggal_akhir === null){

                return mutasi::with(['profile_petugas', 'profile_anggota'])
                ->latest()->fastPaginate($count);
            }else if($request->tanggal_awal !== null && $request->tanggal_akhir == null){
                return mutasi::with(['profile_petugas', 'profile_anggota'])
                ->where('tanggal_mutasi', '>=', $request->tanggal_awal)
                ->latest()->fastPaginate($count);

            }else if($request->tanggal_awal === null && $request->tanggal_akhir !== null){
                return mutasi::with(['profile_petugas', 'profile_anggota'])
                ->where('tanggal_mutasi', '<=', $request->tanggal_akhir)
                ->latest()->fastPaginate($count);
            }else{
                return mutasi::with(['profile_petugas', 'profile_anggota'])
                ->where('tanggal_mutasi', '>=', $request->tanggal_awal)
                ->where('tanggal_mutasi', '<=', $request->tanggal_akhir)
                ->latest()->fastPaginate($count);
            }
        }else if($request->search != null){
            if($request->paginate == 'all'){
                if($request->search === null){
                    return mutasi::with(['profile_petugas', 'profile_anggota'])
                    ->latest()->fastPaginate($count);
                }else{
                    return mutasi::with(['profile_petugas', 'profile_anggota'])
                    ->whereHas('profile_anggota', function($query){
                        $query->where('nama_anggota', 'like', '%' .$this->search . '%');
                    })
                    ->whereHas('profile_petugas', function($query){
                        $query->where('nama_petugas', 'like', '%' .$this->search . '%');
                    })
                    ->latest()->fastPaginate($count);
                }
            }else{
                  if($request->search === null){
                    return mutasi::with(['profile_petugas', 'profile_anggota'])
                    ->latest()->fastPaginate($request->paginate);
                }else{
                    return mutasi::with(['profile_petugas', 'profile_anggota'])
                    ->whereHas('profile_anggota', function($query){
                        $query->where('nama_anggota', 'like', '%' .$this->search . '%');
                    })
                    ->whereHas('profile_petugas', function($query){
                        $query->where('nama_petugas', 'like', '%' .$this->search . '%');
                    })
                    ->latest()->fastPaginate($request->paginate);
                }
            }
        }

    }
    public function index(Request $request){
        $penarikan = mutasi::where('jenis_mutasi', 'Penarikan')->sum('jumlah_mutasi');
        $setoran = mutasi::where('jenis_mutasi', 'Setoran')->sum('jumlah_mutasi');
        $mutasi = MutasiResource::collection($this->query($request));
        return inertia('Ketua/Transaksi/Mutasi', ['penarikan' => $penarikan, 'setoran' => $setoran, 'mutasi' => $mutasi]);
    }
}