<?php

namespace App\Http\Controllers\Ketua;

use App\Http\Controllers\Controller;
use App\Models\Pembelian;
use Illuminate\Http\Request;
 use Barryvdh\DomPDF\Facade\Pdf;
class LaporanPembelian extends Controller
{
    public function index(Request $request){
        $pembelian =  Pembelian::with(['profile_anggota', 'profile_petugas'])
        ->where('status_pembelian' ,'pembelian selesai')->latest()->get();
        $total =  Pembelian::with(['profile_anggota', 'profile_petugas'])
        ->where('status_pembelian' ,'pembelian selesai')->sum('total_pembelian');
        return inertia('Ketua/Laporan/Pembelian', ['pembelian' => $pembelian, 'total' => $total]);
    }
    public function get_pdf(Request $request){
        $pembelian =  Pembelian::with(['profile_anggota', 'profile_petugas'])
        ->where('status_pembelian' ,'pembelian selesai')->latest()->get();
        $total =  Pembelian::with(['profile_anggota', 'profile_petugas'])
        ->where('status_pembelian' ,'pembelian selesai')->sum('total_pembelian');
         $petugas = $request->user()->profile_petugas->nama_petugas;
        $pdf = Pdf::loadView('Laporan.Pembelian', ['pembelian' => $pembelian, 'total' => $total, 'date' => now()->format('D-M-Y'), 'petugas' => $petugas]);
        return $pdf->download('Laporan_pembelian.pdf');
    }
}