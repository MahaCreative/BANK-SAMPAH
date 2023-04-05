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
        Schema::create('penjualans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('petugas_id')->constrained('profile_petugas')->onDelete('cascade')->onUpdate('cascade');
            $table->string('no_penjualan');
            $table->date('tanggal_penjualan');
            $table->integer('total_penjualan');
            $table->string('status_penjualan')->default('belum selesai');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penjualans');
    }
};
