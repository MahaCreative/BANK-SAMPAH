<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailPembelian extends Model
{
    use HasFactory;
    protected $guarded =[];

    public function kategori_sampah()
    {
        return $this->belongsTo(KategoriSampah::class, 'kategori_sampah_id');
    }
}
