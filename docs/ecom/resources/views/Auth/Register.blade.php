@extends('Widget')
@section('title','Đăng ký')
@section('type','Đăng ký')
@section('img','')
@section('page_content','Trang đăng ký của '.url('/'))
@section('content')

<div class="Container">
	<center>
	<div class="PageContent PageContent--fitScreen PageContent-custom-register ">
		<form method="post" action="{{route('Register')}}" class="Form Form--spacingTight">
			{{ csrf_field() }}
			<header class="Form__Header">
				<h1 class="Form__Title Heading u-h1">Đăng ký</h1>
				<p class="Form__Legend">Vui lòng điền những thông tin bên dưới hoặc  <a class=" facebook-register-btn" href="{{route('Facebook.Get')}}">Đăng ký với Facebook</a></p>

			</header>
			<div class="row">
				<div class="ol-sm-12 col-md-6 col-lg-6">
					Thông tin cá nhân <br><br>
					<div class="Form__Item">
						<input type="text" class="Form__Input" name="name" value="{{old('name')}}">
						<label class="Form__FloatingLabel">Họ và Tên</label>
					</div>

					<div class="Form__Item">
						<input type="text" class="Form__Input" name="phone" value="{{old('phone')}}">
						<label class="Form__FloatingLabel label-phone">Số điện thoại</label>
					</div>
					
					<div class="Form__Item">
						<textarea class="Form__Input" name="address" placeholder="" rows="7"> {{old('address')}}</textarea>
						<label class="Form__FloatingLabel">Địa chỉ</label>
					</div>
				</div>
				<div class="col-sm-12 col-md-6 col-lg-6">
					Tài khoản <br><br>
					<div class="Form__Item">
						<input type="text" class="Form__Input" name="username" value="{{old('username')}}">
						<label class="Form__FloatingLabel">Tên đăng nhập</label>
					</div>
					<div class="Form__Item">
						<input type="password" class="Form__Input" name="password">
						<label class="Form__FloatingLabel">Mật khẩu (6-32 ký tự)</label>
					</div>
					<div class="Form__Item">
						<input type="password" class="Form__Input" name="password-confirm">
						<label class="Form__FloatingLabel">Xác nhận mật khẩu</label>
					</div>
					
					<button type="submit" class="Form__Submit Button Button--primary Button--full">Xác nhận đăng ký</button>
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