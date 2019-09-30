@extends('AdminWidget')
@section('title','Danh mục sản phẩm')
@section('banner','Danh mục sản phẩm')
@section('content')
<link rel="stylesheet" href="//cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
<div class="row">
	<div class="col-md-12">
		<div class="card">
			<div class="card-header">
				<h4 class="card-title"> Danh sách sản phẩm</h4>
			</div>
			<div class="card-body">
				<table id="table_id" class="display">
					<thead>
						<tr>
							<th></th>
							<th>Tên sản phẩm</th>
							<th>Giá</th>
							<th>Giá khuyến mãi</th>
							<th>Lượt xem</th>
							<th>Ngày khởi tạo</th>
						</tr>
					</thead>
					<tbody>
						@foreach ($products as $product)
						<tr>
							<td align="center"><a href="{{url('san-pham/'.$product->link)}}"><img src="{{url($product->Images()->first()->link)}}" height="100px" alt=""></a></td>
							<td>{{ $product->name }}</td>
							<td>{{ number_format($product->price) }} VNĐ</td>
							<td>{{ number_format($product->sale_price) }} VNĐ</td>
							<td>{{ $product->view }}</td>
							<td>{{ $product->created_at }}</td>
						</tr>
						@endforeach
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<script src="//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script>
	$(document).ready( function () {
		$('#table_id').DataTable({
			stateSave: true,
			"language": {
				"lengthMenu": "Hiển thị  _MENU_  sản phẩm mỗi trang",
				"zeroRecords": "Không có sản phẩm nào khớp..",
				"info": "Trang _PAGE_ / _PAGES_",
				"search": "Lọc :",
				"paginate": {
					"first":      "Đầu tiên",
					"last":       "Cuối cùng",
					"next":       "Trang tiếp",
					"previous":   "Trang trước"
				},
			}
		});
	} );
</script>
@endsection