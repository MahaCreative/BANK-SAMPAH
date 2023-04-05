<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriSampah extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function petugas()
    {
        return $this->belongsTo(ProfilePetugas::class, 'petugas_id');
    }
}
