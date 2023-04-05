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
        Schema::create('profile_anggotas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade')->onUpdate('cascade');
            $table->string('nik')->unique();
            $table->string('kk')->unique();
            $table->string('kd_anggota')->unique();
            $table->string('nama_anggota', 60);
            $table->text('alamat');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->date('tanggal_terdaftar');
            $table->string('jenis_kelamin');
            $table->string('foto_anggota');
            $table->string('telp');
            $table->string('status_verifikasi');
            $table->string('no_rekening')->unique();
            $table->string('nama_rekening');
            $table->foreignId('petugas_id')->nullable()->constrained('profile_petugas')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profile_anggotas');
    }
};
