<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Informasi>
 */
class InformasiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'petugas_id' => 1,
            'judul' => $judul = $this->faker->sentence(),
            'slug' => \Str::slug($judul),
            'tanggal_release' => $this->faker->date(),
            'deskripsi_singkat' => $this->faker->sentence(50),
            'isi_informasi' => $this->faker->sentence(200),
            'gambar_informasi' => '/images/preview.png',
        ];
    }
}