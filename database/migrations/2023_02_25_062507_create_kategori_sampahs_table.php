<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kategori_sampahs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('petugas_id')->nullable()->constrained('profile_petugas')->onDelete('cascade')->onUpdate('cascade');
            $table->string('nama_kategori');
            $table->integer('harga_beli');
            $table->integer('harga_jual');
            $table->string('satuan');
            $table->integer('stok')->default(0);
            $table->string('image')->default('images/sampah.png');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kategori_sampahs');
    }
};
