<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="apple-touch-icon" sizes="76x76" href="../assets/img/apple-icon.png">
  <link rel="icon" type="image/png" href="../assets/img/favicon.png">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <title>
    @yield('title')
  </title>
  <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
  <!--     Fonts and icons     -->
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
  <!-- CSS Files -->
  <link href="{{ url('./assets/inside/css/custom.css') }}" rel="stylesheet" />
  <link href="{{ url('./assets/inside/css/bootstrap.min.css') }}" rel="stylesheet" />
  <link href="{{ url('./assets/inside/css/paper-dashboard.css') }}" rel="stylesheet" />

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>

<body class="">
  <div id="ajax-noti"></div>
  <div class="wrapper ">
    <div class="sidebar" data-color="white" data-active-color="danger">
      <div class="logo text-center">
        <a href="http://www.creative-tim.com" class="simple-text logo-mini">
          <div class="logo-image-small">
            <img src="{{url('./assets/inside/img/logo-small.png')}}">
          </div>
        </a>
        <a href="{{url('quanly')}}" class="simple-text logo-normal">
          Quản lý bán hàng
        </a>
      </div>
      <div class="sidebar-wrapper">
        <ul class="nav">
          <li class="{{ (Request::is('quanly/') ? 'active' : '') }} ">
            <a href="{{url('quanly')}}">
              <i class="nc-icon nc-bank"></i>
              <p>Trang chủ</p>
            </a>
          </li>
          <li class="{{ (Request::is('quanly/caidat/*') || Request::is('quanly/caidat') ? 'active' : '') }}">
            <a href="{{url('quanly/caidat')}}">
              <i class="nc-icon nc-settings"></i>
              <p>Cài đặt Trang</p>
            </a>
          </li>
          <li>
            <a href="{{url('quanly/donhang')}}">
              <i class="nc-icon nc-cart-simple"></i>
              <p>Đơn hàng</p>
            </a>
          </li>
          <li>
            <a data-toggle="collapse" href="#sub-item-1" aria-expanded="false">
              <i class="nc-icon nc-bag-16"></i>
              <p>Sản phẩm</p>
            </a>
            <div class="collapse" id="sub-item-1">
              <ul class="nav pl-4">

                <li class="{{ (Request::is('quanly/sanpham/them') ? 'active' : '') }}">
                  <a href="{{url('quanly/sanpham/them/')}}">
                    <i class="nc-icon nc-simple-add"></i>
                    <p>Thêm sản phẩm mới</p>
                  </a>
                </li>

                <li class="{{ (Request::is('quanly/danhmuc/them') ? 'active' : '') }}">
                  <a href="{{url('quanly/danhmuc/them/')}}">
                    <i class="nc-icon nc-simple-add"></i>
                    <p>Thêm danh mục SP</p>
                  </a>
                </li>

                <li class="{{ (Request::is('quanly/size/them') ? 'active' : '') }}">
                  <a href="{{url('quanly/size/them/')}}">
                    <i class="nc-icon nc-simple-add"></i>
                    <p>Thêm Size</p>
                  </a>
                </li>

                <li class="{{ (Request::is('quanly/sanpham') ? 'active' : '') }}">
                  <a href="{{url('quanly/sanpham')}}">
                    <i class="nc-icon nc-settings-gear-65"></i>
                    <p>Quản lý sản phẩm</p>
                  </a>
                </li>

                <li class="{{ (Request::is('quanly/danhmuc') ? 'active' : '') }}">
                  <a href="{{url('quanly/danhmuc')}}">
                    <i class="nc-icon nc-settings-gear-65"></i>
                    <p>Quản lý danh mục</p>
                  </a>
                </li>

                <li class="{{ (Request::is('quanly/size') ? 'active' : '') }}">
                  <a href="{{url('quanly/size')}}">
                    <i class="nc-icon nc-settings-gear-65"></i>
                    <p>Quản lý Size</p>
                  </a>
                </li>

              </ul>
            </div>
          </li>
          @if(Auth::user()->level>2)
          <li class="{{ (Request::is('quanly/nguoidung/*') || Request::is('quanly/nguoidung') ? 'active' : '') }}">
            <a href="{{url('quanly/nguoidung')}}">
              <i class="nc-icon nc-single-02"></i>
              <p>Quản lý người dùng</p>
            </a>
          </li>
          
          <li  class="{{ (Request::is('quanly/thongke/*') || Request::is('quanly/thongke') ? 'active' : '') }}">
            <a href="{{url('quanly/thongke')}}">
              <i class="nc-icon nc-chart-pie-36"></i>
              <p>Thống kê</p>
            </a>
          </li>
          @endif
        </ul>
      </div>
    </div>
    <div class="main-panel">
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
        <div class="container-fluid">
          <div class="navbar-wrapper">
            <div class="navbar-toggle">
              <button type="button" class="navbar-toggler">
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <a class="navbar-brand" href="#!">@yield('banner')</a>
          </div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-bar navbar-kebab"></span>
            <span class="navbar-toggler-bar navbar-kebab"></span>
            <span class="navbar-toggler-bar navbar-kebab"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navigation">
            <form>
              <div class="input-group no-border">
                <input type="text" value="" class="form-control" placeholder="Search...">
                <div class="input-group-append">
                  <div class="input-group-text">
                    <i class="nc-icon nc-zoom-split"></i>
                  </div>
                </div>
              </div>
            </form>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link btn-magnify" href="#pablo">
                  <i class="nc-icon nc-layout-11"></i>
                  <p>
                    <span class="d-lg-none d-md-block">Stats</span>
                  </p>
                </a>
              </li>
              <li class="nav-item btn-rotate dropdown">
                <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="nc-icon nc-bell-55"></i>
                  <p>
                    <span class="d-lg-none d-md-block">Some Actions</span>
                  </p>
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link btn-rotate" data-toggle="tooltip" title="Đăng xuất" href="{{url('taikhoan/logout')}}">
                  <i class="nc-icon nc-user-run"></i>
                  <p>
                    <span class="d-lg-none d-md-block">Đăng xuất</span>
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- End Navbar -->
      <!-- <div class="panel-header panel-header-lg">

  <canvas id="bigDashboardChart"></canvas>


</div> -->
<div class="content">
  @section('content')
  @show
</div>
<footer class="footer footer-white ">
  <div class="container-fluid">
    <div class="row" style="padding-top: 20px">
      <nav class="footer-nav">
        <ul>
          <li>
            <a href="https://www.creative-tim.com" target="_blank">Creative Tim</a>
          </li>
          <li>
            <a href="http://blog.creative-tim.com/" target="_blank">Blog</a>
          </li>
          <li>
            <a href="https://www.creative-tim.com/license" target="_blank">Licenses</a>
          </li>
        </ul>
      </nav>
      <div class="credits ml-auto">
        <span class="copyright">
          ©
          <script>
            document.write(new Date().getFullYear())
          </script>, made with <i class="fa fa-heart heart"></i> by Creative Tim
        </span>
      </div>
    </div>
  </div>
</footer>
</div>
</div>
<!--   Core JS Files   -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script src="{{url('./assets/inside/js/plugins/perfect-scrollbar.jquery.min.js')}}"></script>
<!--  Google Maps Plugin    -->
<!-- Chart JS -->
<script src="{{url('./assets/inside/js/plugins/chartjs.min.js')}}"></script>
<!--  Notifications Plugin    -->
<script src="{{url('./assets/inside/js/plugins/bootstrap-notify.js')}}"></script>
<!-- Control Center for Now Ui Dashboard: parallax effects, scripts for the example pages etc -->
<script src="{{url('./assets/inside/js/paper-dashboard.js?v=2.0.0')}}" type="text/javascript"></script>
<!-- Paper Dashboard DEMO methods, don't include it in your project! -->
</body>
<script>
  function showNotification(message, color = "info", from = "top", align="center") {
    $.notify({
      icon: "nc-icon nc-bell-55",
      message: message

    }, {
      type: color,
      timer: 5000,
      placement: {
        from: from,
        align: align
      }
    });
  }
</script>
@if (count($errors) > 0)
<script>
  @foreach ($errors->all() as $error)
  showNotification('{{$error}}','danger');
  @endforeach
</script>
@endif
@if ($success = Session('Success'))
<script>
  showNotification('{{$success}}','success');
</script>
@endif
@if (( Request::is('quanly/sanpham/*') || Request::is('quanly/sanpham') || Request::is('quanly/danhmuc/*') || Request::is('quanly/danhmuc') || Request::is('quanly/size/*') || Request::is('quanly/size') ))
<script>
  $(function() {
    $('#sub-item-1').attr('class','collapse show');
    $('a[href="#sub-item-1"]').attr('aria-expanded','true');
  })
</script>
@endif
</html>
