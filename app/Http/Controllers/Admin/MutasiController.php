<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\MutasiResource;
use App\Models\mutasi;
use App\Models\ProfileAnggota;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Profiler\Profile;

class MutasiController extends Controller
{
    public $search;
    public function query($search, $paginate){
        $count = mutasi::count();
        $this->search = $search;
        if($paginate == "all"){
            if($search == null){
                return mutasi::with(['profile_anggota', 'profile_petugas'])->latest()->fastPaginate($count);
            }else{
                return mutasi::with(['profile_anggota', 'profile_petugas'])
                ->whereHas('profile_anggota', function($q){
                    $q->where('nama', 'like', '%' . $this->search . '%');
                })
                ->latest()->fastPaginate($count);
            }
        }else{
            if($search == null){
                return mutasi::with(['profile_anggota', 'profile_petugas'])->latest()->fastPaginate($paginate);
            }else{
                return mutasi::with(['profile_anggota', 'profile_petugas'])
                ->whereHas('profile_anggota', function($q){
                    $q->where('nama', 'like', '%' . $this->search . '%');
                })
                ->latest()->fastPaginate($paginate);
            }
        }

    }
    public function index(Request $req){
        $mutasi = MutasiResource::collection($this->query($req->search, $req->paginate));

        $anggota = ProfileAnggota::with(['mutasi' => function($q){
            $q->latest()->first();
        }])->get();
        $date = now()->format('-d-m-Y');
        $countPenarikan = mutasi::where('jenis_mutasi', 'penarikan')->count();
        $kd_mutasi = 'PN'.now()->format('ymd').rand(1,100).$countPenarikan +1;

        return inertia('Admin/Mutasi/Mutasi', ['date' => $date,'mutasi' => $mutasi, 'anggota' => $anggota, 'kd_mutasi' => $kd_mutasi], );
    }

    public function create_mutasi(Request $request){
        $mutasi = mutasi::create([
            'no_mutasi' => $request->kd_mutasi,
            'profile_anggota_id' => $request->id_anggota,
            'profile_petugas_id' => $request->user()->id,
            'tanggal_mutasi' => now()->format('y-m-d'),
            'jenis_mutasi' => 'Penarikan',
            'jumlah_mutasi' => $request->besar_penarikan,
            'saldo' => $request->sisa_saldo,
        ]);
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Transaksi berhasil dilakukan'
        ]);
    }
}