@extends('Laporan.report')
    @section('title')
        Laporan Pembelian Sampah
    @endsection
@section('tanggal')
    {{$date}}
@endsection
@section('nama_petugas')
    {{$petugas}}
@endsection
    @section('body')
       <table class='table table-bordered'>
		<thead>
			<tr>
				<td>No</td>
				<td>Kode Penjualan</td>
				<td>Tanggal Penjualan</td>
				<td>Petugas Menangani</td>
				<td>Total Penjualan</td>
			</tr>
		</thead>
		<tbody>
			@php $i=1 @endphp
			@foreach($penjualan as $p)
			<tr>
				<td>{{ $i++ }}</td>
				<td>{{$p->no_penjualan}}</td>
				<td>{{$p->created_at->format('Y-M-D')}}</td>

				<td>{{$p->profile_petugas->nama_petugas}}</td>
				<td>{{$p->total_penjualan}}</td>
				{{-- <td>@rupiah($p->total_pembelian)</td> --}}
			</tr>
			@endforeach
		</tbody>
	</table>
    @endsection
