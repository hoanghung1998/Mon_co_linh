@extends('AdminWidget')
@section('title','Danh mục sản phẩm')
@section('banner','Danh mục sản phẩm')
@section('content')

<div class="row">
	<div class="col-md-12">
		<div class="card">
			<div class="card-header">
				<h4 class="card-title"> Danh sách danh mục</h4>
			</div>
			<div class="card-body">
				<ul>
					@foreach($categories as $cat)
					@if(isset($cat['sub']))
					<li class="--category-item" data-toggle="#sub-{{$cat['id']}}">
						<div class="row">
							<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
								<h5>
									{{$cat['name']}}
								</h5>
							</div>
							<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right">
								<i class="nc-icon nc-simple-add mr-2"></i>
								<a class="mt-1 mb-1 btn btn-sm" href="{{url('quanly/danhmuc/chitiet')}}/{{$cat['id']}}" style="color: #fff; border: 1px solid #403d39">Chi tiết</a>
								<a class="mt-1 mb-1 btn btn-sm" href="{{url('quanly/danhmuc/xoa')}}/{{$cat['id']}}" style="color: #fff; border: 1px solid #403d39">Xóa</a>
							</div>
							
						</div>
						<div class="--category-sub-items" id="sub-{{$cat['id']}}">
							<hr>
							<p class="text-muted mt-2">Danh mục con</p>
							@foreach($cat['sub'] as $c)
							<div class="row">
								<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
									<h5 class="ml-3">
										{{$c['name']}}
									</h5>
								</div>
								<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right">
									<a class="mt-1 mb-1 btn btn-sm btn-secondary" href="{{url('quanly/danhmuc/chitiet')}}/{{$c['id']}}">Chi tiết</a>
									<a class="mt-1 mb-1 btn btn-sm btn-secondary" href="{{url('quanly/danhmuc/xoa')}}/{{$c['id']}}">Xóa</a>
								</div>
								
							</div>
							@endforeach
						</div>
					</li>
					@else
					<li class="--category-item">
						<div class="row">
							<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
								<h5>
									{{$cat['name']}}
								</h5>
							</div>
							<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right">
								<a class="mt-1 mb-1 btn btn-sm" href="{{url('quanly/danhmuc/chitiet')}}/{{$cat['id']}}" style="color: #fff; border: 1px solid #403d39">Chi tiết</a>
								<a class="mt-1 mb-1 btn btn-sm" href="{{url('quanly/danhmuc/xoa')}}/{{$cat['id']}}" style="color: #fff; border: 1px solid #403d39">Xóa</a>
							</div>
							
						</div>
					</li>
					@endif
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