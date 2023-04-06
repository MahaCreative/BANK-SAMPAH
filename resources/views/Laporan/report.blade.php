<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Report</title>
    <style type="text/css">

		table tr td,
		table tr th,p{
			font-size: 8pt;
            line-height: 1.2
		}
        .data{
            display: flex;
            flex-direction :row;
        }
        center{
            border-bottom: solid 2px black;
        }
	</style>

</head>
<body>
    <center>
		<h5> Bank Sampah Mamuju Keren</h4>
		<h3>@yield('title')</h3>
	</center>
    <div class="data">
            <p>Tanggal Laporan : @yield('tanggal')</p>
            <p>Cetak By : @yield('nama_petugas')</p>
    </div>
    <div>
        @yield('body')
    </div>
</body>
</html>
