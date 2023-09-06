<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProfilePetuagsResource;
use App\Models\ProfileAnggota;
use App\Models\ProfilePetugas;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PetugasController extends Controller
{
    public function query($search, $paginate)
    {
        $count = ProfilePetugas::count();
        if ($paginate === 'all') {
            if ($search === null) {
                return ProfilePetugas::with(['user' => function($query){
                    $query->with('roles');
                }])->fastPaginate($count);
            } else {
                return ProfilePetugas::with(['user' => function($query){
                    $query->with('roles');
                }])->where('nama_petugas', 'like', '%' . $search . '%')->fastPaginate($count);
            }
        } else {
            if ($search === null) {
                return ProfilePetugas::with(['user' => function($query){
                    $query->with('roles');
                }])->fastPaginate($paginate);
            } else {
                return ProfilePetugas::with(['user' => function($query){
                    $query->with('roles');
                }])->where('nama_petugas', 'like', '%' . $search . '%')->fastPaginate($paginate);
            }
        }
    }
    public function index(Request $request)
    {
        $petugas = ProfilePetuagsResource::collection($this->query($request->search, $request->paginate));

        return inertia('Admin/Petugas/Petugas', ['petugas' => $petugas]);
    }
    public function store(Request $request)
    {

        $request->validate([
            'nama_petugas' => 'required|min:6|max:60|string',
            'alamat' => 'required|string',
            'no_telp' => 'required|numeric|min:12',
            'foto_petugas' => 'required|image|mimes:png,jpg,jpeg,jfif',
        ]);
        $count = ProfilePetugas::count();
        $kd_petugas = 'PG/00' . now()->format('my') . $count + 1;
        $urlImage = $request->file('foto_petugas') ? $request->file('foto_petugas')->store('images/profile_petugas') : 'images/user.png';
        $profilePetugas = ProfilePetugas::create([
            'kd_petugas' => $kd_petugas,
            'nama_petugas' => $request->nama_petugas,
            'no_telp' => $request->no_telp,
            'alamat' => $request->alamat,
            'foto_petugas' => $urlImage
        ]);
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil menambahkan data petugas baru'
        ]);
    }
    public function update(Request $request)
    {
        // dd($request->all());
        $petugas = ProfilePetugas::findOrFail($request->data['id']);
        $urlImage = $request->file('foto_petugas') ? $request->file('foto_petugas')->store('images/profile_petugas') : 'images/user.png';
        $petugas->update([
            'nama_petugas' => $request->data['nama_petugas'],
            'no_telp' => $request->data['no_telp'],
            'alamat' => $request->data['alamat'],
            'foto_petugas' => $urlImage
        ]);
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil merubah data petugas'
        ]);
    }
    public function delete(Request $request)
    {
        $petugas = ProfilePetugas::findOrFail($request->id);
        $petugas->delete();
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil menghapus data petugas'
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
        $profile = ProfilePetugas::findOrFail($request->id_user);
        $profile->update([
            'user_id' => $user->id
        ]);
        $user->assignRole('kasir');
        event(new Registered($user));
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil menambahkan data'
        ]);
    }
}