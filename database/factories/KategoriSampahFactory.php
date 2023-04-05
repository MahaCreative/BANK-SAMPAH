<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\KategoriSampah>
 */
class KategoriSampahFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $harga = [3000, 5000, 7000, 10000, 1000, 2000];
        $satuan = ['PCS', 'KG'];
        return [
            'petugas_id' => 1,
            'nama_kategori' => $this->faker->sentence(1),
            'harga_beli' => $hargaBeli = $harga[rand(0, 5)],
            'harga_jual' => $hargaBeli + 500,
            'satuan' => $satuan[rand(0, 1)],
            'stok' => 50,
        ];
    }
}
