<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProfileAnggota>
 */
class ProfileAnggotaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $jenkel = ['Laki-Laki', 'Perempuan'];
        return [
            'nik' => rand(1111111111111111, 99999999999999999),
            'kk' => rand(1111111111111111, 99999999999999999),
            'kd_anggota' => 'AG/' . rand(1, 9999),
            'nama_anggota' => $name = $this->faker->name(),
            'alamat' => $this->faker->name(),
            'tempat_lahir' => $this->faker->address(),
            'tanggal_lahir' => $this->faker->date(),
            'tanggal_terdaftar' => $this->faker->date(),
            'jenis_kelamin' => $jenkel[rand(0, 1)],
            'foto_anggota' => '/images/user.png',
            'telp' => $this->faker->phoneNumber(),
            'status_verifikasi' => 'Aktif',
            'no_rekening' => rand(1111111111111111, 99999999999999999),
            'nama_rekening' => $name,
        ];
    }
}
