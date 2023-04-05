<?php

namespace App\Http\Controllers\Anggota;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SettingProfile extends Controller
{
    public function index(Request $request){
        return inertia('Anggota/Setting/SettingProfile');
    }
    public function update(Request $request){

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

    public function create_profile(Request $request){
    }
    public function update_profile(Request $request){}
}
