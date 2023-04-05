<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProfilePetugas;
use Illuminate\Http\Request;

class SettingProfileController extends Controller
{
    public function index()
    {
        return inertia('Admin/Profile/SettingProfile');
    }
    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|min:6',
            'email' => 'email|required',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required'
        ]);

        $request->user()->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil di lakukan'
        ]);
    }

    public function create_profile(Request $request)
    {
        $request->validate([
            'nama_petugas' => 'required|min:4',
            'no_telp' => 'required|min:12|numeric',
            'alamat' => 'required',
            'foto_petugas' => 'required|image|mimes:png,jpg,jpeg,jfif'
        ]);

        $foto_url = $request->file('foto_petugas') ? $request->file('foto_petugas')->store('images/profile_petugas') : 'images/user.png';

        $kode_petugas = 'PG00' . ProfilePetugas::count() + 1;

        $profile = ProfilePetugas::create([
            'user_id' => $request->user()->id,
            'kd_petugas' => $kode_petugas,
            'nama_petugas' =>  $request->nama_petugas,
            'no_telp' => $request->no_telp,
            'alamat' => $request->alamat,
            'foto_petugas' => $foto_url
        ]);

        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil melakukan penambahan profile'
        ]);
    }

    public function update_profile(Request $request)
    {
        // dd($request->all());
        $foto_url = $request->file('foto_petugas') ? $request->file('foto_petugas')->store('images/profile_petugas') : 'images/user.png';
        $kode_petugas = 'PG00' . ProfilePetugas::count() + 1;
        $profile = $request->user()->profile_petugas()->update([
            'user_id' => $request->user()->id,
            'nama_petugas' =>  $request->data['nama_petugas'],
            'no_telp' => $request->data['no_telp'],
            'alamat' => $request->data['alamat'],
            'foto_petugas' => $foto_url
        ]);
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil melakukan perubahan data'
        ]);
    }
}
