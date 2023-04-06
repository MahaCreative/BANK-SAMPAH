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
				<td>Kode Pembelian</td>
				<td>Tanggal Pembelian</td>
				<td>Nama Anggota</td>
				<td>Petugas Menangani</td>
				<td>Total Pembelian</td>
			</tr>
		</thead>
		<tbody>
			@php $i=1 @endphp
			@foreach($pembelian as $p)
			<tr>
				<td>{{ $i++ }}</td>
				<td>{{$p->no_pembelian}}</td>
				<td>{{$p->created_at->format('Y-M-D')}}</td>
				<td>{{$p->profile_anggota->nama_anggota}}</td>
				<td>{{$p->profile_petugas->nama_petugas}}</td>
				<td>{{$p->total_pembelian}}</td>
				{{-- <td>@rupiah($p->total_pembelian)</td> --}}
			</tr>
			@endforeach
		</tbody>
	</table>
    @endsection
