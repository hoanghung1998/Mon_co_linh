@extends('Widget')
@section('title','Đổi mật khẩu')
@section('type','Thông tin')
@section('img','')
@section('page_content','Đổi mật khẩu')
@section('content')

<div class="Container">
	<center>
		<div class="PageContent PageContent--fitScreen PageContent-custom-register ">
			<form method="post" action="{{url('taikhoan/doimatkhau')}}" class="Form Form--spacingTight">
				{{ csrf_field() }}
				<header class="Form__Header">
					<h1 class="Form__Title Heading u-h1">Đổi mật khẩu</h1>
				</header>
				<div class="row">
					<div class="ol-sm-12 col-md-12 col-lg-12">
						<div class="Form__Item">
							<input type="text" class="Form__Input" value="{{Auth::user()->username}}" disabled="true">
							<label class="Form__FloatingLabel">Tài khoản</label>
						</div>
						<br>
						<div class="Form__Item">
							<input type="password" class="Form__Input" name="oldPassword" value="">
							<label class="Form__FloatingLabel">Mật khẩu cũ</label>
						</div>
						<br>
						<div class="row">
							<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
								<div class="Form__Item">
									<input type="password" class="Form__Input" name="newPassword" value="">
									<label class="Form__FloatingLabel label-phone">Mật khẩu mới</label>
								</div>
							</div>
							<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
								<div class="Form__Item">
									<input type="password" class="Form__Input" name="confirmPassword" value="">
									<label class="Form__FloatingLabel">Nhập lại mật khẩu mới</label>
								</div>
							</div>
						</div>
						<br>
					</div>
					<button type="submit" class="Form__Submit Button Button--primary Button--full">Thay đổi</button>
				</div>
			</div>
		</form>
	</div>
</center>
</div>

@endsection