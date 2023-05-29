<?php

namespace App\Http\Controllers\Kasir;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProfilAnggotaResource;

use App\Models\ProfileAnggota;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;

class AnggotaController extends Controller
{
    public $search = '';
    public $paginate;
    public function query($search, $paginate)
    {
        $this->search = $search;
        $this->paginate = $paginate !== null ? $paginate : '10';

        if ($this->paginate == 'all') {
            if ($this->search !== null) {
                return ProfileAnggota::with('user')->where('nama_anggota', 'like', '%' . $this->search . '%')->get();
            }
            return ProfileAnggota::with('user')->get();
        } else {
            if ($this->search !== null) {
                return ProfileAnggota::with('user')->where('nama_anggota', 'like', '%' . $this->search . '%')->fastPaginate($paginate);
            }
            return ProfileAnggota::with('user')->fastPaginate($paginate);
        }
    }
    public function index(Request $request)
    {
        $anggota = ProfilAnggotaResource::collection($this->query($request->search, $request->paginate));
        $lk = ProfileAnggota::where('jenis_kelamin', '=', 'Laki-Laki')->count();
        $pr = ProfileAnggota::where('jenis_kelamin', '=', 'Laki-Laki')->count();
        $count = ProfileAnggota::count();

        return inertia('Kasir/Anggota/Anggota', ['anggota' => $anggota, 'lk' => $lk, 'pr'=> $pr, 'count' => $count]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'nama_anggota' => 'required|min:4',
            'nik' => 'unique:profile_anggotas,nik,except,id|numeric|required|',
            'kk' => 'unique:profile_anggotas,kk,except,id|numeric|required|',
            'tempat_lahir' => 'required',
            'tanggal_lahir' => 'required|date|before:now',
            'nama_rekening' => 'required',
            'no_rekening' => 'required|',
            'telp' => 'required|',
            'alamat' => 'required',
            'jenis_kelamin' => 'required',
            'foto_anggota' => 'required|image|mimes:png,jpg,jpeg,jfif',
        ]);

        $countAnggota = ProfileAnggota::count();
        $kd_anggota = 'AG' . now()->format('m') . now()->format('y') . $countAnggota + 1;
        $urlFoto = $request->file('foto_anggota') ? $request->file('foto_anggota')->store('images/profile_anggota') : 'images/user.png';
        $anggota = ProfileAnggota::create([
            'nik' => $request->nik,
            'kk' => $request->kk,
            'kd_anggota' => $kd_anggota,
            'nama_anggota' => $request->nama_anggota,
            'alamat' => $request->alamat,
            'tempat_lahir' => $request->tempat_lahir,
            'tanggal_lahir' => $request->tanggal_lahir,
            'tanggal_terdaftar' => now()->format('Y-m-d'),
            'jenis_kelamin' => $request->jenis_kelamin,
            'foto_anggota' => $urlFoto,
            'nama_rekening' => $request->nama_rekening,
            'no_rekening' => $request->no_rekening,
            'status_verifikasi' => 'aktif',
            'telp' => $request->telp,
            'petugas_id' => $request->user()->id,
        ]);
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Menambahkan Data Anggota'
        ]);
    }

    public function update(Request $request)
    {
        // dd($request->all());
        $profile = ProfileAnggota::findOrFail($request->data['id']);
        $urlFoto = $request->file('foto_anggota') ? $request->file('foto_anggota')->store('images/profile_anggota') : 'images/user.png';
        $profile->update([
            'nik' => $request->data['nik'],
            'kk' => $request->data['kk'],
            'nama_anggota' => $request->data['nama_anggota'],
            'alamat' => $request->data['alamat'],
            'tempat_lahir' => $request->data['tempat_lahir'],
            'tanggal_lahir' => $request->data['tanggal_lahir'],
            'tanggal_terdaftar' => now()->format('Y-m-d'),
            'jenis_kelamin' => $request->data['jenis_kelamin'],
            'foto_anggota' => $urlFoto,
            'nama_rekening' => $request->data['nama_rekening'],
            'no_rekening' => $request->data['no_rekening'],
            'status_verifikasi' => 'aktif',
            'telp' => $request->data['telp'],
        ]);
    }

    public function delete(Request $request)
    {
        $profile = ProfileAnggota::findOrFail($request->id);
        $profile->delete();

        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil menghapus data'
        ]);
    }

    public function create_akun(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'username' => ['required', 'string', 'min:6', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', 'min:6', 'max:255'],
            'password_confirmation' => ['required']
        ]);
        $user = User::create([
            'name' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $profile = ProfileAnggota::findOrFail($request->id_user);
        $profile->update([
            'user_id' => $user->id
        ]);
        $user->assignRole('anggota');
        event(new Registered($user));
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil menambahkan data'
        ]);
    }
}