@extends('Widget')
@section('title','Hoàn thiện thông tin')
@section('type','Đăng nhập tài khoản')
@section('img','')
@section('page_content','Trang đăng nhập của '.url('/'))
@section('content')

<div class="Container">
	<center>
	<div class="PageContent PageContent--fitScreen PageContent-custom-register ">
		<form method="post" action="{{route('Facebook.Register')}}" class="Form Form--spacingTight">
			{{ csrf_field() }}
			<input type="hidden" name="provider_id" value="{{$fb_user->id}}">
			<header class="Form__Header">
				<h1 class="Form__Title Heading u-h1">Hoàn thiện thông tin</h1>
				<p class="Form__Legend">Vui lòng điền những thông tin bên dưới để hoàn thiện thông tin tài khoản</p>
			</header>
			<div class="row">
				<div class="ol-sm-12 col-md-3 col-lg-3">
					 <a class=" facebook-register-btn" href="{{route('Facebook.Get')}}">Facebook</a> <br><br>
					<img src="{{$fb_user->avatar}}" alt="">
					<br>
					<b>{{$fb_user->name}}</b>
				</div>
				<div class="col-sm-12 col-md-9 col-lg-9">
					<b>Thông tin cá nhân</b> <br><br>
					<div class="Form__Item">
						<input type="text" class="Form__Input" name="phone" value="{{old('phone')}}">
						<label class="Form__FloatingLabel label-phone">Số điện thoại</label>
					</div>
					
					<div class="Form__Item">
						<textarea class="Form__Input" name="address" placeholder="" rows="7">{{old('address')}}</textarea>
						<label class="Form__FloatingLabel">Địa chỉ</label>
					</div>
					<button type="submit" class="Form__Submit Button Button--primary Button--full">Xác nhận</button>
					<div class="Form__Hint Form__Hint--center">
						<span class="Text--subdued">Nếu bạn đã có tài khoản ?</span>
						<a href="{{url('taikhoan')}}" class="Link Link--secondary" data-action="toggle-recover-form">Quay lại đăng nhập</a>
					</div>
				</div>
			</div>
		</form>
	</div>
</center>
</div>

@endsection