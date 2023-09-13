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
        Schema::create('mutasis', function (Blueprint $table) {
            $table->id();
            $table->string('no_mutasi')->unique();
            $table->foreignId('profile_anggota_id')->references('id')->on('profile_anggotas')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('profile_petugas_id')->references('id')->on('profile_petugas')->onUpdate('cascade')->onDelete('cascade');
            $table->date('tanggal_mutasi');
            $table->string('jenis_mutasi');
            $table->integer('jumlah_mutasi');
            $table->integer('saldo')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mutasis');
    }
};