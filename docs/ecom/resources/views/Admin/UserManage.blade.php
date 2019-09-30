@extends('AdminWidget')
@section('title','Quản lý người dùng')
@section('banner','Quản lý người dùng')
@section('content')
<style>
	td{
		font-size: .8rem !important;
	}
	th{
		font-size: .8rem !important;
	}
</style>
<div class="row">
	<div class="col-md-12">
		<div class="card">
			<div class="card-header">
				<h4 class="card-title"> Danh sách tài khoản</h4>
			</div>
			<div class="card-body">
				<div class="table-responsive">
					<table class="table">
						<thead class=" text-primary">
							<tr>
								<th>Tài khoản</th>
								<th>Tên người dùng</th>
								<th class="text-center">Loại tài khoản</th>
								<th class="text-center">Số điện thoại</th>
								<th class="text-center">Cấp độ</th>
								<th class="text-center">Ngày tạo</th>
								<th class="text-center">Hành động</th>
							</tr>
						</thead>
						<tbody>
							{{ csrf_field() }}
							@foreach($users as $user)
							<tr>
								<td>{{$user->username}}</td>
								<td>{{$user->name}}</td>
								@if($user->provider_id != "")
								<td class="text-center">Mạng xã hội</td>
								@else
								<td class="text-center">Chung</td>
								@endif
								<td class="text-center">{{$user->phone}}</td>
								<td class="text-center">
									<select name="" class="user-level">
										@if($user->level == 3)
										<option value="3and{{$user->id}}" selected="">Admin</option>
										@else
										<option value="3and{{$user->id}}">Admin</option>
										@endif
										@if($user->level == 2)
										<option value="2and{{$user->id}}" selected="">Nhân viên</option>
										@else
										<option value="2and{{$user->id}}">Nhân viên</option>
										@endif
										@if($user->level == 1)
										<option value="1and{{$user->id}}" selected="">Khách hàng</option>
										@else
										<option value="1and{{$user->id}}">Khách hàng</option>
										@endif
									</select>
								</td>
								<td class="text-center">{{$user->created_at}}</td>
								<td class="text-center">
									<a class="btn btn-info btn-sm" href="{{url('quanly/nguoidung/chitiet')}}/{{$user->id}}"s style="color:#fff">Chi tiết</a>
									<a class="btn btn-danger btn-sm" href="{{url('quanly/nguoidung/xoa')}}/{{$user->id}}" style="color:#fff">Xóa</a>
								</td>
							</tr>
							@endforeach
							<tr><td colspan="7" class="text-center">{{$users->links()}}</td></tr>
						</tbody>
					</table>
					
				</div>
			</div>
		</div>
	</div>
</div>
<script>
	$(function() {
		var _token = $('input[name="_token"]').val();
	

	$('.user-level').on('change',function() {
		let v = $(this).val().split('and');
		$.ajax({
			url:"{{ url('quanly/nguoidung/capdo') }}", 
			method:"POST", 
			data:{
				_token: _token,
				id: v[1],
				level: v[0]
			},
			success:function(data){
				$('#ajax-noti').html(data);
			},
			error: function(){
				 showNotification('Xảy ra lỗi! Vui lòng tải lại trang và thử lại!','danger');
			}
		});
	});
	})
</script>
@endsection