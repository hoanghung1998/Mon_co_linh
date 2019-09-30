@extends('AdminWidget')
@section('title','Thêm sản phẩm')
@section('banner','Thêm sản phẩm')
@section('content')
<link rel="stylesheet"  media="screen" rel="stylesheet" href="{{url('./assets/inside/css/multi-select.css')}}">
<form enctype="multipart/form-data" method="post" action="{{url('quanly/sanpham/them')}}">
	{{ csrf_field() }}
	<input type="hidden" name="define_img_1">
	<input type="hidden" name="define_img_2">
	<input type="hidden" name="sizes" id="sizes">
	<input type="hidden" name="amounts" id="amounts">
	<div class="row">
		<div class="col-md-5">
			<div class="card">
				<div class="card-header">
					<div class="row">
						<div class="col-9 text-left">
							<h4 class="card-title">Chọn danh mục sản phẩm</h4> 
						</div>
						<div class="col-3 text-right">
							<a href="{{url('quanly/danhmuc/them')}}"><h5 class="card-title mt-3">Thêm</h5></a> 
						</div>
					</div>
				</div>
				<div class="card-body">
					<div class="row">
						<div class="col-12">
							<select multiple="multiple" id="categories" name="categories[]">
								@foreach ($categories as $cat)
								<option value="{{$cat['id']}}">{{$cat['name']}}</option>
								@if(isset($cat['sub']))
								@foreach ($cat['sub'] as $c)
								<option value="{{$c['id']}}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$c['name']}}</option>
								@endforeach
								@endif
								@endforeach
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="card">
				<div class="card-header">
					<div class="row">
						<div class="col-9 text-left">
							<h4 class="card-title">Nhập Size</h4> 
						</div>
						<div class="col-3 text-right">
							<a href="{{url('quanly/size/them')}}"><h5 class="card-title mt-3">Thêm</h5></a> 
						</div>
					</div>
				</div>
				<div class="card-body">
					@foreach ($sizes as $s)
					<div class="row mt-1 mb-1">
						<div class="col-5">
							Size: {{$s->name}}
						</div>
						<div class="col-7">
							<input type="number" value="" data-size="{{$s->id}}" class="form-control get-size">
						</div>
					</div>
					@endforeach
				</div>
			</div>
		</div>
		<div class="col-md-7">
			<div class="card card-user">
				<div class="card-header">
					<h5 class="card-title">Điền thông tin</h5>
				</div>
				<div class="card-body">

					<div class="row">
						<div class="col-md-8 pr-md-1 pr-sm-1 pl-sm-1">
							<div class="form-group">
								<label>Tên sản phẩm (*)</label>
								<input type="text" class="form-control" placeholder="" name="name" value="{{old('name')}}">
							</div>
						</div>
						<div class="col-md-4 pl-md-1 pr-sm-1 pl-sm-1">
							<div class="form-group">
								<label>Mã sản phẩm (*)</label>
								<input type="text" class="form-control" placeholder="" name="product_code" value="{{old('product_code')}}">
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-12  pr-sm-1 pl-sm-1">
							<div class="form-group">
								<label>Đường dẫn</label>
								<input type="text" class="form-control" disabled="" name="link" placeholder="Đường dẫn tới trang...">
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6 pr-md-1 pr-sm-1 pl-sm-1">
							<div class="form-group">
								<label>Giá sản phẩm (*)</label>
								<input type="text" class="form-control money-format"  display-text-at="#money1" name="price" value="{{old('price')}}">
								<label id="money1">&nbsp;</label>
							</div>
						</div>
						<div class="col-md-6 pl-md-1 pr-sm-1 pl-sm-1">
							<div class="form-group">
								<label>Giá khuyến mãi (Nếu có)</label>
								<input type="text" class="form-control money-format" display-text-at="#money2" name="sale_price" value="{{old('sale_price')}}">
								<label id="money2">&nbsp;</label>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12  pr-sm-1 pl-sm-1">
							<div class="form-group">
								<label>Từ khóa (Meta: Keyword - Danh mục sẽ được tự động thêm vào, nếu muốn, vui lòng nhập từ khóa khác. Với nhiều từ khóa, khuyến khích dùng dấu "," ngăn giữa - SEO)</label>
								<input type="text" class="form-control"  name="keyword" value="{{old('keyword')}}">
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12  pr-sm-1 pl-sm-1">
							<div class="form-group">
								<label>Mô tả sản phẩm (Meta:Description - SEO) (*)</label>
								<textarea class="form-control textarea" name="description">{{old('description')}}</textarea>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12  pr-sm-1 pl-sm-1">
							<div class="form-group">
								<label>Nội dung (Mô tả ngắn về sản phẩm ) (*)</label>
								<textarea class="form-control textarea" name="content" rows="20">{{old('content')}}</textarea>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-12  pr-sm-1 pl-sm-1">
							<label>Ảnh thêm (Có thể upload nhiều file ảnh - Thứ tự sẽ được sắp xếp theo alphabet dựa trên tên ảnh - Vui lòng chọn ảnh đại diện 1 và 2) (*)</label>
							<input type="file" class="form-control" name="img[]" multiple id="gallery-photo-add">
							<div class="gallery"></div>
						</div>
					</div>
					<div class="row">
						<div class="update ml-auto mr-auto">
							<button type="submit" class="btn btn-primary btn-round">Đăng bán</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>
<script src="{{url('./assets/inside/js/plugins/autoNumeric.js')}}"></script>
<script src="{{url('./assets/inside/js/plugins/jquery.multi-select.js')}}"></script>
<script src="https://cdn.ckeditor.com/ckeditor5/12.4.0/classic/ckeditor.js"></script>
<script>
	ClassicEditor.create( document.querySelector( 'textarea[name=content]' ),{
		removePlugins: [ 'MediaEmbed', 'ImageUpload' ],
	} ).catch( error => {console.error( error );} );
	$('#categories').multiSelect();

	$('.get-size').on('change',function() {
		var arrSize = [];
		var arrAmount = [];
		$('.get-size').each(function() {
			if($(this).val()!=""){
				arrAmount.push($(this).val());
				arrSize.push($(this).attr('data-size'));
			}
		});
		$('#amounts').val(arrAmount);
		$('#sizes').val(arrSize);
	});
	$(function() {
    // Multiple images preview in browser
    var imagesPreview = function(input, placeToInsertImagePreview) {

    	let total_file = input.files.length;
    	
    	for(let i=0;i<total_file;i++)
    	{
    		$(placeToInsertImagePreview).append("<img class='--upload-img' height='200' data-order='"+i+"' alt='"+input.files[i].name+"'' src='"+URL.createObjectURL(input.files[i])+"'>"+
    			"<div class='--upload-img-control' style='display:inline-block; width: 0'>"+
    			"<i data-order='"+i+"' class='nc-icon nc-simple-remove --upload-img-remove-btn'></i> <br> "+
    			"<i data-order='"+i+"' class='nc-icon --upload-img-control-btn --upload-set-img-1'>1</i> <br>"+
    			"<i data-order='"+i+"' class='nc-icon --upload-img-control-btn --upload-set-img-2'>2</i> "+
    			"</div>");
    	}


    	$('.--upload-set-img-1').on('click',function() {
    		$('.--upload-set-img-1').each(function() {
    			$(this).removeAttr('id');
    		});
    		let cur2 = $('#--selected-img-2');
    		if($(this).attr('data-order') == cur2.attr('data-order')){
    			cur2.removeAttr('id');
    		}
    		$(this).attr('id','--selected-img-1');
    	});

    	$('.--upload-set-img-2').on('click',function() {
    		$('.--upload-set-img-2').each(function() {
    			$(this).removeAttr('id');
    		});
    		let cur1 = $('#--selected-img-1');
    		if($(this).attr('data-order') == cur1.attr('data-order')){
    			cur1.removeAttr('id');
    		}
    		$(this).attr('id','--selected-img-2');
    	});


    	$('.--upload-img-control-btn').on('click',function() {
    		let img_1 = parseInt($('#--selected-img-1').attr('data-order'));
    		let img_2 = parseInt($('#--selected-img-2').attr('data-order'));
    		if(!Number.isNaN(img_1)){
    			$('input[name=define_img_1').val(input.files[img_1].name);
    		}
    		if(!Number.isNaN(img_2)){
    			$('input[name=define_img_2').val(input.files[img_2].name);
    		}
    	});

    	$('.--upload-img-remove-btn').on('click',function() {
    		let dT = new ClipboardEvent('').clipboardData || new DataTransfer();
    		for(let j = 0; j< total_file; j++){
    			if(j != $(this).attr('data-order'))
    			{
    				dT.items.add(input.files.item(j));
    			}
    		}
    		input.files = dT.files;
    		$('.gallery').html("");
    		imagesPreview(input, '.gallery');
    	});
    };


    $('#gallery-photo-add').on('change', function() {
    	$('.gallery').html("");
    	imagesPreview(this, '.gallery');
    });

    $('input[name=name]').on('keyup',function() {
    	let name = $(this).val().replace(/\s/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
    	let code = $('input[name=product_code]').val().replace(/\s/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toUpperCase();
    	changeLink(code,name);
    })
    $('input[name=product_code]').on('keyup',function() {
    	let code = $(this).val().replace(/\s/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toUpperCase();
    	let name = $('input[name=name]').val().replace(/\s/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
    	changeLink(code,name);
    })

});
	function changeLink(code, name) {
		$('input[name=link]').val(code+'-'+name);
	}
</script>
@endsection