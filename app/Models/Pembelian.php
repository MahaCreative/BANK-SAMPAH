<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pembelian extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function profile_petugas()
    {
        return $this->belongsTo(ProfilePetugas::class, 'petugas_id');
    }

    public function profile_anggota()
    {
        return $this->belongsTo(ProfileAnggota::class, 'anggota_id');
    }

    public function detail_pembelian()
    {
        return $this->hasMany(DetailPembelian::class, 'pembelian_id');
    }
}