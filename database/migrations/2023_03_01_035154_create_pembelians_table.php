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
        Schema::create('pembelians', function (Blueprint $table) {
            $table->id();
            $table->string('no_pembelian')->unique();
            $table->foreignId('petugas_id')->references('id')->on('profile_petugas')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('anggota_id')->references('id')->on('profile_anggotas')->onUpdate('cascade')->onDelete('cascade');
            $table->date('tanggal_pembelian');
            $table->integer('total_pembelian');
            $table->string('status_pembelian')->default('belum selesai');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembelians');
    }
};