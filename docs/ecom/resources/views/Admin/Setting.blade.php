@extends('AdminWidget')
@section('title','Cài đặt trang')
@section('banner','Cài đặt trang')
@section('content')
{{ csrf_field() }}

<div class="card card-user">
	<div class="card-header">
		<h5 class="card-title">Chung</h5>
	</div>
	<div class="card-body">
		<div class="row">
			<div class="col-md-12 pr-md-1 pr-sm-1 pl-sm-1">
				<div class="form-group">
					<label>Banner đầu trang:</label>
					<input type="text" class="form-control" placeholder="" id="banner" value="{{$config->common->banner}}">
				</div>
			</div>
			<div class="col-md-12 pr-md-1 pr-sm-1 pl-sm-1">
				<div class="form-group">
					<label>Trang chủ (Meta:Description)</label>
					<input type="text" class="form-control" placeholder="" id="meta_description" value="{{$config->common->meta_description}}">
				</div>
			</div>
			<div class="col-md-12 pr-md-1 pr-sm-1 pl-sm-1">
				<div class="form-group">
					<label>Trang chủ (Meta:Keyword)</label>
					<input type="text" class="form-control" placeholder="" id="meta_keyword" value="{{$config->common->meta_keyword}}">
				</div>
			</div>
			<div class="col-md-6 pl-md-1 pr-sm-1 pl-sm-1">
				<div class="form-group">
					<label>Tên Facebook</label>
					<input type="text" class="form-control" placeholder="" id="facebook_name" value="{{$config->common->facebook->facebook_name}}">
				</div>
			</div>
			<div class="col-md-6 pl-md-1 pr-sm-1 pl-sm-1">
				<div class="form-group">
					<label>Link Facebook</label>
					<input type="text" class="form-control" placeholder="" id="facebook_link" value="{{$config->common->facebook->facebook_link}}">
				</div>
			</div>
			<div class="col-md-12 pr-md-1 pr-sm-1 pl-sm-1">
				<div class="form-group">
					<label>Giới thiệu</label>
					<textarea class="form-control textarea" id="shop_intro">{{$config->common->shop_intro}}</textarea>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="update col-12 text-right">
				<button type="submit" class="btn btn-primary btn-round" id="common">Lưu</button>
			</div>
		</div>
	</div>
</div>

<div class="card card-user">
	<div class="card-header">
		<h5 class="card-title">Trang chủ</h5>
	</div>
	<div class="card-body">
		<div class="row">
			Ảnh đại diện - Sản phẩm top
		</div>
		<div class="row">
			<div class="update col-12 text-right">
				<button type="submit" class="btn btn-primary btn-round" id="dashboard">Lưu</button>
			</div>
		</div>
	</div>
</div>

<div class="card card-user">
	<div class="card-header">
		<h5 class="card-title">Trang sản phẩm</h5>
	</div>
	<div class="card-body">
		<div class="row">
			<div class="col-md-12 pr-md-1 pr-sm-1 pl-sm-1">
				<div class="form-group">
					<label>Vận chuyển</label>
					<textarea class="form-control textarea" id="shipping">{{$config->product->shipping}}</textarea>
				</div>
			</div>
			<div class="col-md-12 pr-md-1 pr-sm-1 pl-sm-1">
				<div class="form-group">
					<label>Chính sách</label>
					<textarea class="form-control textarea" id="policy">{{$config->product->policy}}</textarea>
				</div>
			</div>
			<div class="col-md-12 pr-md-1 pr-sm-1 pl-sm-1">
				<div class="form-group">
					<label>Bảng Size</label>
					<textarea class="form-control textarea" id="size_chart">{{$config->product->size_chart}}</textarea>
				</div>
			</div>
			<div class="col-md-12 pr-md-1 pr-sm-1 pl-sm-1">
				<div class="form-group">
					<label>Ghi chú phía dưới bảng size</label>
					<textarea class="form-control textarea" id="size_chart_note">{{$config->product->size_chart_note}}</textarea>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="update col-12 text-right">
				<button type="submit" class="btn btn-primary btn-round" id="product">Lưu</button>
			</div>
		</div>
	</div>
</div>

<script src="https://cdn.ckeditor.com/ckeditor5/12.4.0/classic/ckeditor.js"></script>
<script>
	let shop_introEditor;
	ClassicEditor.create( document.querySelector( '#shop_intro' ),{
		removePlugins: [ 'MediaEmbed', 'ImageUpload' ],
	} ).then( newEditor => {
		shop_introEditor = newEditor;
	} ).catch( error => {console.error( error );} );


	let shippingEditor;
	ClassicEditor.create( document.querySelector( '#shipping' ),{
		removePlugins: [ 'MediaEmbed', 'ImageUpload' ],
	} ).then( newEditor => {
		shippingEditor = newEditor;
	} ).catch( error => {console.error( error );} );

	let policyEditor;
	ClassicEditor.create( document.querySelector( '#policy' ),{
		removePlugins: [ 'MediaEmbed', 'ImageUpload' ],
	} ).then( newEditor => {
		policyEditor = newEditor;
	} ).catch( error => {console.error( error );} );

	let size_chartEditor;
	ClassicEditor.create( document.querySelector( '#size_chart' ),{
		removePlugins: [ 'MediaEmbed', 'ImageUpload' ],
	} ).then( newEditor => {
		size_chartEditor = newEditor;
	} ).catch( error => {console.error( error );} );

	let size_chart_noteEditor;
	ClassicEditor.create( document.querySelector( '#size_chart_note' ),{
		removePlugins: [ 'MediaEmbed', 'ImageUpload' ],
	} ).then( newEditor => {
		size_chart_noteEditor = newEditor;
	} ).catch( error => {console.error( error );} );

	$('#common').on('click',function(e) {
		e.preventDefault();
		$(this).prop('disabled',true);
		let _token = $('input[name="_token"]').val();
		$.ajax({
			url : "{{url('quanly/caidat/common')}}",
			type : "POST",
			data : {
				_token: _token,
				banner: $('#banner').val(),
				facebook_link: $('#facebook_link').val(),
				facebook_name: $('#facebook_name').val(),
				shop_intro: shop_introEditor.getData(),
				meta_description: $('#meta_description').val(),
				meta_keyword: $('#meta_keyword').val()
			},
			success : function (result){
				$('#common').prop('disabled',false);
			},
			error: function(){
				showNotification('Xảy ra lỗi! Vui lòng tải lại trang và thử lại!','danger');
			}
		});
	})

	$('#product').on('click',function(e) {
		e.preventDefault();
		let _token = $('input[name="_token"]').val();
		$(this).prop('disabled',true);
		$.ajax({
			url : "{{url('quanly/caidat/product')}}",
			type : "POST",
			data : {
				_token: _token,
				shipping: shippingEditor.getData(),
				policy: policyEditor.getData(),
				size_chart: size_chartEditor.getData(),
				size_chart_note: size_chart_noteEditor.getData()
			},
			success : function (result){
				$('#product').prop('disabled',false);
			},
			error: function(){
				 showNotification('Xảy ra lỗi! Vui lòng tải lại trang và thử lại!','danger');
			}
		});
	})
</script>

@endsection