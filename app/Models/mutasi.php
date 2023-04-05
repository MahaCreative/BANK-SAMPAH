<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mutasi extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function profile_anggota(){
        return $this->belongsTo(ProfileAnggota::class, 'profile_anggota_id');
    }
    public function profile_petugas(){
        return $this->belongsTo(ProfilePetugas::class);
    }
}
