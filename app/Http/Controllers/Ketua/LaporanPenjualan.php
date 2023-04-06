<?php

namespace App\Http\Controllers\Ketua;

use App\Http\Controllers\Controller;
use App\Models\Penjualan;
use Illuminate\Http\Request;
 use Barryvdh\DomPDF\Facade\Pdf;
class LaporanPenjualan extends Controller
{
    public function index(Request $request){
        $penjualan =  Penjualan::with([ 'profile_petugas'])
        ->where('status_penjualan' ,'penjualan selesai')->latest()->get();
        $total =  Penjualan::with([ 'profile_petugas'])
        ->where('status_penjualan' ,'penjualan selesai')->sum('total_penjualan');
        return inertia('Ketua/Laporan/Penjualan', ['penjualan' => $penjualan, 'total' => $total]);
    }
    public function get_pdf(Request $request){
        $penjualan =  Penjualan::with(['profile_petugas'])
        ->where('status_penjualan' ,'penjualan selesai')->latest()->get();
        $total =  Penjualan::with(['profile_petugas'])
        ->where('status_penjualan' ,'penjualan selesai')->sum('total_penjualan');
         $petugas = $request->user()->profile_petugas->nama_petugas;
        $pdf = Pdf::loadView('Laporan.Penjualan', ['penjualan' => $penjualan, 'total' => $total, 'date' => now()->format('D-M-Y'), 'petugas' => $petugas]);
        return $pdf->download('Laporan_penjualan.pdf');
    }
}
