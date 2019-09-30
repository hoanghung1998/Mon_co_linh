@extends('Widget')
@section('title','Đăng nhập tài khoản')
@section('type','Đăng nhập tài khoản')
@section('img','')
@section('page_content','Trang đăng nhập của '.url('/'))

@section('content')

<div class="Container">
  <div class="PageContent PageContent--fitScreen PageContent--extraNarrow">
   <form method="post" action="{{url('taikhoan')}}" id="customer_login" accept-charset="UTF-8" name="login" class="Form Form--spacingTight" style="display: block">
    {{ csrf_field() }}
    <header class="Form__Header">
      <h1 class="Form__Title Heading u-h1">Đăng nhập</h1>
      <p class="Form__Legend">Vui lòng nhập tên tài khoản và mật khẩu:</p>
    </header>
    <div class="Form__Item">
      <input type="text" class="Form__Input" name="username" required="required" placeholder="Tài khoản" aria-label="Email" autofocus="">
      <label class="Form__FloatingLabel">Tài khoản</label>
    </div>

    <div class="Form__Item">
      <input type="password" class="Form__Input" name="password" required="required" placeholder="Mật khẩu" aria-label="Password">
      <label class="Form__FloatingLabel">Mật khẩu</label>
      <button type="button" id="recovery" class="Form__ItemHelp Link Link--primary">Quên mật khẩu?</button>
    </div>

    <button type="submit" class="Form__Submit Button Button--primary Button--full">Đăng nhập</button>
    <a href="{{route('Facebook.Get')}}" class="Form__Submit Button Button--full" style="background: #4267b2; color:white">Đăng nhập với Facebook</a>
    <div class="Form__Hint Form__Hint--center">
      <span class="Text--subdued">Chưa có tài khoản?</span>
      <a href="{{url('taikhoan/dangky')}}" class="Link Link--secondary" >Tạo tài khoản mới</a>
    </div>
  </form>

  <form method="post" action="{{url('taikhoan/quenmatkhau')}}" id="customer_recovery" style="display: none" accept-charset="UTF-8" class="Form Form--spacingTight" style="display: block">
    {{ csrf_field() }}
    <header class="Form__Header">
      <h1 class="Form__Title Heading u-h1">Tìm lại mật khẩu</h1>
      <p class="Form__Legend">Vui lòng nhập tên tài khoản và số điện thoại:</p>
    </header>
    <div class="Form__Item">
      <input type="text" class="Form__Input" name="username" required="required" placeholder="Tài khoản" aria-label="Email" autofocus="">
      <label class="Form__FloatingLabel">Tài khoản</label>
    </div>
    <div class="Form__Item">
      <input type="text" class="Form__Input" name="phone" value="{{old('phone')}}">
      <label class="Form__FloatingLabel label-phone">Số điện thoại</label>
    </div>
    <button type="submit" class="Form__Submit Button Button--primary Button--full">Phục hồi</button>
    <div class="Form__Hint Form__Hint--center">
            <span class="Text--subdued">Nếu bạn đã có tài khoản ?</span>
            <a href="" class="Link Link--secondary" id="login">Quay lại đăng nhập</a>
          </div>
  </form>
</div>
</div>
<script>
  $('#recovery').on('click',function() {
    $('#customer_login').fadeOut('400');
    setTimeout(function(){ $('#customer_recovery').fadeIn(); }, 450);
  })

  $('#login').on('click',function(event) {
    event.preventDefault();
    $('#customer_recovery').fadeOut('400');
    setTimeout(function(){ $('#customer_login').fadeIn(); }, 450);
  })
</script>
@endsection