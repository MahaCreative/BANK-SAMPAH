<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Informasi;
use App\Models\KategoriSampah;
use App\Models\ProfilAnggota;
use App\Models\ProfileAnggota;
use Database\Factories\KategoriSampahFactory;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        $user = \App\Models\User::factory()->create([
            'name' => 'ketua_bank_sampah',
            'email' => 'ketuabanksampah@gmail.com',
            'password' => bcrypt('passwords'),
        ]);
        $roles = Role::create([
            'name' => 'ketua bank sampah',
            'guard_name' => 'web'
        ]);
        $roles = Role::create([
            'name' => 'kasir',
            'guard_name' => 'web'
        ]);
        $roles = Role::create([
            'name' => 'anggota',
            'guard_name' => 'web'
        ]);
        $user->assignRole('ketua bank sampah');

        $user->profile_petugas()->create([
            'kd_petugas' => 'PG/0001',
            'nama_petugas' => 'Ketua',
            'no_telp' => '082345519999',
            'alamat' => 'jl. diponegoro'
        ]);

         $user = \App\Models\User::factory()->create([
            'name' => 'kasir',
            'email' => 'kasir@gmail.com',
            'password' => bcrypt('passwords'),
        ]);
        $user->assignRole('kasir');

    }
}
