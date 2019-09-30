@extends('Widget')
@section('title','Thông tin khách hàng')
@section('type','Thông tin')
@section('img','')
@section('page_content','Thông tin khách hàng')
@section('content')

<div class="Container">
	<center>
	<div class="PageContent PageContent--fitScreen PageContent-custom-register ">
		<form method="post" action="{{url('taikhoan/thongtin')}}" class="Form Form--spacingTight">
			{{ csrf_field() }}
			<header class="Form__Header">
				<h1 class="Form__Title Heading u-h1">Thông tin khách hàng</h1>
			</header>
			<div class="row">
				<div class="ol-sm-12 col-md-12 col-lg-12">
					<div class="Form__Item">
						<input type="text" class="Form__Input" value="{{Auth::user()->username}}" disabled="true">
						<label class="Form__FloatingLabel">Tài khoản</label>
					</div>
					<div class="Form__Item">
						<input type="text" class="Form__Input" name="name" value="{{Auth::user()->name}}">
						<label class="Form__FloatingLabel">Họ và Tên</label>
					</div>

					<div class="Form__Item">
						<input type="text" class="Form__Input" name="phone" value="{{Auth::user()->phone}}">
						<label class="Form__FloatingLabel label-phone">Số điện thoại</label>
					</div>
					
					<div class="Form__Item">
						<textarea class="Form__Input" name="address" placeholder="" rows="7">{{Auth::user()->address}}</textarea>
						<label class="Form__FloatingLabel">Địa chỉ</label>
					</div>
					<button type="submit" class="Form__Submit Button Button--primary Button--full">Lưu</button>
				</div>
			</div>
		</form>
	</div>
</center>
</div>

@endsection