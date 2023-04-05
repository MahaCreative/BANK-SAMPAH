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
        Schema::create('informasis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('petugas_id')->constrained('profile_petugas')->onDelete('cascade')->onUpdate('cascade');
            $table->string('judul');
            $table->string('slug');
            $table->date('tanggal_release');
            $table->text('deskripsi_singkat');
            $table->text('isi_informasi');
            $table->string('gambar_informasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('informasis');
    }
};
