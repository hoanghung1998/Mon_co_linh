@extends('AdminWidget')
@section('title','Danh sách size')
@section('banner','Danh sách size')
@section('content')


<div class="row">
	<div class="col-md-12">
		<div class="card">
			<div class="card-header">
				<h4 class="card-title"> Danh sách Size</h4>
			</div>
			<div class="card-body">
				<ul>
					@foreach($sizes as $s)
		
					<li class="--category-item">
						<div class="row">
							<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
								<h5>
									Size : {{$s->name}}
								</h5>
							</div>
							<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right">
								<a class="mt-1 mb-1 btn btn-sm" href="{{url('quanly/size/chitiet')}}/{{$s->id}}" style="color: #fff; border: 1px solid #403d39">Chi tiết</a>
								<a class="mt-1 mb-1 btn btn-sm" data-toggle="modal" href='#delete-{{$s->id}}' style="color: #fff; border: 1px solid #403d39">Xóa</a>
							</div>
							<div class="modal fade" id="delete-{{$s->id}}">
								<div class="modal-dialog">
									<div class="modal-content">
										<div class="modal-header">
											<h4 class="modal-title mt-0">Thông báo</h4>
											<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
											
										</div>
										<div class="modal-body">
											Bạn chắc chắn muốn xóa size {{$s->name}} chứ?
										</div>
										<div class="modal-footer">
											<a  href="{{url('quanly/size/xoa')}}/{{$s->id}}" class="btn btn-primary">Xác nhận</a>
										</div>
									</div>
								</div>
							</div>
						</div>
						
					</li>
		
					@endforeach
				</ul>
			</div>
		</div>
	</div>
</div>
<script>
	$('.--category-item').on('click',function() {
		$($(this).attr('data-toggle')).toggle('fast');
		let iChild = $(this).find('.nc-icon');
		if(iChild.attr('class') == 'nc-icon nc-simple-delete mr-2'){
			iChild.attr('class','nc-icon nc-simple-add mr-2');
		}
		else{
			iChild.attr('class','nc-icon nc-simple-delete mr-2');
		}
	})
</script>
@endsection