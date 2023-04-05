<?php

use App\Http\Controllers\Admin\InformasiController;
use App\Http\Controllers\Admin\MutasiController;
use App\Http\Controllers\Admin\PembelianController;
use App\Http\Controllers\Admin\PenjualanController;
use App\Http\Controllers\Admin\PetugasController;
use App\Http\Controllers\Admin\SettingProfileController;
use App\Http\Controllers\Anggota\DashboardController;
use App\Http\Controllers\Anggota\HistoryMutasiController;
use App\Http\Controllers\Anggota\HistoryPenarikan;
use App\Http\Controllers\Anggota\HistoryPenjualanController;
use App\Http\Controllers\Anggota\InformasiController as AnggotaInformasiController;
use App\Http\Controllers\Anggota\KategoriSampah;
use App\Http\Controllers\Anggota\SettingProfile;
use App\Http\Controllers\Kasir\AnggotaController;
use App\Http\Controllers\Kasir\KategoriSampahController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function (Request $request) {

    if($request->user()->getRoleNames()[0] === 'anggota'){
        return redirect()->route('anggota.dashboard');
    }


    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified', ])->name('dashboard');

Route::prefix('anggota')->middleware(['auth', 'role:anggota'])->group(function(){
    Route::get('dashboard', [DashboardController::class, 'index'])->name('anggota.dashboard')->middleware('role:anggota');
    Route::get('kategori-sampah', [KategoriSampah::class, 'index'])->name('anggota.kategori-sampah');
    Route::get('history-penjualan', [HistoryPenjualanController::class, 'index'])->name('anggota.history-penjualan');
    Route::get('history-penarikan', [HistoryPenarikan::class, 'index'])->name('anggota.history-penarikan');
    Route::get('history-mutasi', [HistoryMutasiController::class, 'index'])->name('anggota.history-mutasi');
    Route::get('setting-profile', [SettingProfile::class, 'index'])->name('anggota.setting-profile');
    Route::patch('setting-profile', [SettingProfile::class, 'update'])->name('anggota.setting-profile');
    Route::post('create-profile', [SettingProfile::class, 'create_profile'])->name('anggota.create-profile');
    Route::patch('update-profile', [SettingProfile::class, 'update_profile'])->name('anggota.update-profile');
});



Route::prefix('admin')->middleware(['auth', ])->group(function () {

    // Route Admin
    Route::get('setting-profile', [SettingProfileController::class, 'index'])->name('admin.setting-profile');
    Route::patch('setting-profile', [SettingProfileController::class, 'update'])->name('admin.setting-profile');

    Route::post('create-profile', [SettingProfileController::class, 'create_profile'])->name('admin.create-profile');
    Route::patch('update-profile', [SettingProfileController::class, 'update_profile'])->name('admin.update-profile');


    Route::get('data-anggota', [AnggotaController::class, 'index'])->name('admin.anggota');
    Route::post('data-anggota', [AnggotaController::class, 'store']);
    Route::post('data-anggota-create-akun', [AnggotaController::class, 'create_akun'])->name('admin.data-anggota-create-akun');
    Route::patch('data-anggota', [AnggotaController::class, 'update']);
    Route::delete('data-anggota', [AnggotaController::class, 'delete']);

    Route::get('data-petugas', [PetugasController::class, 'index'])->name('admin.petugas');
    Route::post('data-petugas', [PetugasController::class, 'store']);
    Route::patch('data-petugas', [PetugasController::class, 'update']);
    Route::delete('data-petugas', [PetugasController::class, 'delete']);
    Route::post('data-petugas-create-akun', [PetugasController::class, 'create_akun'])->name('admin.petugas-create-akun');

    Route::get('kategori-sampah', [KategoriSampahController::class, 'index'])->name('admin.kategori-sampah');
    Route::post('kategori-sampah', [KategoriSampahController::class, 'store']);
    Route::patch('kategori-sampah', [KategoriSampahController::class, 'update']);
    Route::delete('kategori-sampah', [KategoriSampahController::class, 'delete']);

    // Route::get('')
    Route::get('informasi', [InformasiController::class, 'index'])->name('admin.informasi');
    Route::get('create-informasi', [InformasiController::class, 'create'])->name('admin.create-informasi');
    Route::get('show-informasi/{slug}', [InformasiController::class, 'show'])->name('admin.show-informasi');
    Route::post('informasi', [InformasiController::class, 'store']);
    Route::patch('informasi', [InformasiController::class, 'update']);
    Route::delete('informasi', [InformasiController::class, 'delete']);

    Route::get('data-penjualan', [PenjualanController::class, 'index'])->name('admin.penjualan');
    Route::get('create-penjualan', [PenjualanController::class, 'create_penjualan'])->name('admin.create-penjualan');
    Route::get('search-produk', [PenjualanController::class, 'search_produk'])->name('admin.search-produk');
    Route::post('add-produk', [PenjualanController::class, 'add_sampah'])->name('admin.add-produk');
    Route::post('insert-sampah', [PenjualanController::class, 'insert_sampah'])->name('admin.insert_sampah');
    Route::delete('delete-item-sampah', [PenjualanController::class, 'delete_item'])->name('admin.delete_item');
    Route::post('ceck-out-penjualan', [PenjualanController::class, 'check_out'])->name('admin.check_out_penjualan');

    // Route::get('pembelian')
    Route::get('data-pembelian', [PembelianController::class, 'index'])->name('admin.pembelian');
    Route::get('create-pembelian', [PembelianController::class, 'create_pembelian'])->name('admin.create-pembelian');
    Route::get('search-produk-pembelian', [PembelianController::class, 'search_produk'])->name('admin.search-produk-pembelian');
    Route::post('add-product-pembelian', [PembelianController::class, 'add_product_pembelian'])->name('admin.add_product_pembelian');
    Route::post('insert-pembelian-sampah', [PembelianController::class, 'insert_pembelian_sampah'])->name('admin.insert_pembelian_sampah');
    Route::delete('delete-item-sampah-pembelian', [PembelianController::class, 'delete_item_sampah_pembelian'])->name('admin.delete_item_sampah_pembelian');
    Route::post('ceck-out-pembelian', [PembelianController::class, 'check_out_pembelian'])->name('admin.check_out_pembelian');

    Route::get('data-mutasi', [MutasiController::class, 'index'])->name('admin-data-mutasi');
    Route::post('create-mutasi', [MutasiController::class, 'create_mutasi'])->name('admin.create-mutasi');
});

Route::get('informasi', [AnggotaInformasiController::class, 'index'])->name('informasi');
Route::get('informasi/{slug}', [AnggotaInformasiController::class, 'show'])->name('show-informasi');
require __DIR__ . '/auth.php';