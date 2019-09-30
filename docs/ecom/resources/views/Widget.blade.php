<?php use App\Http\Controllers\Admin\CategoryManagementController; ?>
<!DOCTYPE html>
<html class="no-js" lang="en">
<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<head>
  <meta charset="utf-8"> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, height=device-height, minimum-scale=1.0, user-scalable=0">
  <meta name="theme-color" content="">

  <title>
   @yield('title')
 </title>
 <link rel="canonical" href="index.html">
 <link rel="shortcut icon" href="" type="image/png">
 <!--  SEO -->
 <meta property="title" content="@yield('title')" />
 <meta property="type" content="@yield('type')" />
 <meta property="url" content="{{url()->current()}}" />
 <meta property="image" content="@yield('img')" />
 <meta property="keyword" content="@yield('keyword')">
 <meta property="description" content="@yield('page_content')" />

 <meta property="og:title" content="@yield('title')" />
 <meta property="og:type" content="@yield('type')" />
 <meta property="og:url" content="{{url()->current()}}" />
 <meta property="og:image" content="@yield('img')" />
 <meta property="og:keyword" content="@yield('keyword')">
 <meta property="og:description" content="@yield('page_content')" />
 <!--  END SEO -->
 <link rel="stylesheet" href="{{url('./assets/outside/css/bootstrap.css')}}" type="text/css">
 <link rel="stylesheet" href="{{url('./assets/outside/css/theme.scss.css')}}" type="text/css">
 <link rel="stylesheet" href="{{url('./assets/outside/css/custom.css')}}" type="text/css">
 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css">
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

 <script>
      // This allows to expose several variables to the global scope, to be used in scripts
      window.theme = {
        productImageSize: "natural",
        searchMode: "product,article",
        showPageTransition: true,
        showElementStaggering: true,
        showImageZooming: true
      };

      window.languages = {
        productImageLoadingError: "Lỗi tải ảnh vui lòng ấn F5 và tải lại trang.",
      };

      window.lazySizesConfig = {
        loadHidden: false,
        hFac: 0.5,
        expFactor: 2,
        ricTimeout: 150,
        lazyClass: 'Image--lazyLoad',
        loadingClass: 'Image--lazyLoading',
        loadedClass: 'Image--lazyLoaded'
      };

      document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
      document.documentElement.style.setProperty('--window-height', window.innerHeight + 'px');

      // We do a quick detection of some features (we could use Modernizr but for so little...)
      (function() {
        document.documentElement.className += ((window.CSS && window.CSS.supports('(position: sticky) or (position: -webkit-sticky)')) ? ' supports-sticky' : ' no-supports-sticky');
        document.documentElement.className += (window.matchMedia('(-moz-touch-enabled: 1), (hover: none)')).matches ? ' no-supports-hover' : ' supports-hover';
      }());

      // This code is done to force reload the page when the back button is hit (which allows to fix stale data on cart, for instance)
      if (performance.navigation.type === 2) {
        location.reload(true);
      }
    </script>

    <script src="{{url('./assets/outside/js/lazysizes.js')}}" async></script>
    <script src="{{url('./assets/outside/js/lib.js')}}" defer></script>
    <script src="{{url('./assets/outside/js/theme.js')}}" defer></script>
  <!--   <script src="{{url('./assets/outside/js/custom.js')}}" defer>
  </script> -->


</head>
<body class="prestige--v4  template-index">
  @if ($message = session('Message'))
  <div id="MessageModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Thông báo</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="alert">
            <ul>
              <li style="display: block;"><?php echo $message; ?></li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-second btn-outline-none" data-dismiss="modal">Đóng</button>
        </div>
      </div>
    </div>
  </div>
  @endif
  @if ($message = session('Message'))
  <script>
    $(function() {
      $('#MessageModal').modal('show');
    })
  </script>
  @endif

  @if (count($errors) > 0)
  <div id="ErrorModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Thông báo</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="alert">
            <ul>
              @foreach ($errors->all() as $error)
              <li style="display: block;">{{ $error }}</li>
              @endforeach
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-second btn-outline-none" data-dismiss="modal">Đóng</button>
        </div>
      </div>
    </div>
  </div>
  @endif
  @if (count($errors) > 0)
  <script>
    $(function() {
      $('#ErrorModal').modal('show');
    })
  </script>
  @endif
  <a class="PageSkipLink u-visually-hidden" href="#main">Skip to content</a>
  <span class="LoadingBar"></span>
  <div class="PageOverlay"></div>
  <div class="PageTransition"></div>

  <div id="shopify-section-popup" class="shopify-section">

    <aside class="NewsletterPopup" data-section-id="popup" data-section-type="newsletter-popup" data-section-settings='{"apparitionDelay": 7,"showOnlyOnce": false}' aria-hidden="true">
      <button class="NewsletterPopup__Close" data-action="close-popup" aria-label="Close">
        <svg class="Icon Icon--close" role="presentation" viewBox="0 0 16 14">
          <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd">
          </path>
        </svg>
      </button>
      <h2 class="NewsletterPopup__Heading Heading u-h2">Join Us</h2>
      <div class="NewsletterPopup__Content">
        <p>Subscribe to get notified about product launches, special offers and company news</p>
      </div>
      <form method="post" action="https://prestige-theme-couture.myshopify.com/contact#newsletter-popup" id="newsletter-popup" accept-charset="UTF-8" class="NewsletterPopup__Form">
        <input type="hidden" name="form_type" value="customer" />
        <input type="hidden" name="utf8" value="✓" />
        <input type="hidden" name="contact[tags]" value="newsletter">

        <input type="email" name="contact[email]" class="Form__Input" required="required" aria-label="Enter your email" placeholder="Enter your email">
        <button class="Form__Submit Button Button--primary Button--full" type="submit">Subscribe</button>
      </form>
    </aside>
  </div>


  <div id="shopify-section-sidebar-menu" class="shopify-section">
    <section id="sidebar-menu" class="SidebarMenu Drawer Drawer--small Drawer--fromLeft" aria-hidden="true" data-section-id="sidebar-menu" data-section-type="sidebar-menu">
      <header class="Drawer__Header" data-drawer-animated-left>
        <button class="Drawer__Close Icon-Wrapper--clickable" data-action="close-drawer" data-drawer-id="sidebar-menu" aria-label="Close navigation">
          <svg class="Icon Icon--close" role="presentation" viewBox="0 0 16 14">
            <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd">
            </path>
          </svg>
        </button>
      </header>

      <div class="Drawer__Content">
        <div class="Drawer__Main" data-drawer-animated-left data-scrollable>
          <div class="Drawer__Container">
            <!-- MOBILE MENU -->
            <nav class="SidebarMenu__Nav SidebarMenu__Nav--primary" aria-label="Sidebar navigation">
              <div class="Collapsible">
                <a href="{{url('/')}}" class="Collapsible__Button Heading Link Link--primary u-h6">Trang chủ</a>
              </div>
              <div class="Collapsible">
                <button class="Collapsible__Button Heading u-h6" data-action="toggle-collapsible" aria-expanded="false">Danh mục sản phẩm<span class="Collapsible__Plus">
                </span>
              </button>

              <div class="Collapsible__Inner">
                <div class="Collapsible__Content">
                  @foreach (CategoryManagementController::_2LevelCategory() as $category)
                  @if(isset($category['sub']))
                  <div class="Collapsible">
                    <button class="Collapsible__Button Heading Text--subdued Link--primary u-h7" data-action="toggle-collapsible" aria-expanded="false">{{$category['name']}}<span class="Collapsible__Plus"></span>
                    </button>

                    <div class="Collapsible__Inner">
                      <div class="Collapsible__Content">
                        <ul class="Linklist Linklist--bordered Linklist--spacingLoose">
                          <li class="Linklist__Item">
                            <a href="{{url('danh-muc')}}/{{$category['link']}}" class="Text--subdued Link Link--primary">Tất cả</a>
                          </li>
                          @foreach($category['sub'] as $sub)
                          <li class="Linklist__Item">
                            <a href="{{url('danh-muc')}}/{{$sub['link']}}" class="Text--subdued Link Link--primary">{{$sub['name']}}</a>
                          </li>
                          @endforeach
                        </ul>
                      </div>
                    </div>
                  </div>
                  @else
                  <div class="Collapsible">
                    <a href="{{url('danh-muc')}}/{{$category['link']}}" class="Collapsible__Button Heading Text--subdued Link Link--primary u-h7">{{$category['name']}}</a>
                  </div>
                  @endif
                  @endforeach
                </div>
              </div>
            </div>
            <div class="Collapsible">
              <a href="blogs/news.html" class="Collapsible__Button Heading Link Link--primary u-h6">Điều khoản</a>
            </div>
            <div class="Collapsible">
              <a href="pages/about.html" class="Collapsible__Button Heading Link Link--primary u-h6">Giới Thiệu</a>
            </div>
          </nav>
          <nav class="SidebarMenu__Nav SidebarMenu__Nav--secondary">
            <ul class="Linklist Linklist--spacingLoose">
              @if(Auth::user())
              <li class="Linklist__Item">
                Chào <a href="{{url('taikhoan/thongtin')}}" class="Text--subdued Link Link--primary">{{Auth::user()->name}}!</a>
              </li>
              @else
              <li class="Linklist__Item">
                <a href="{{url('taikhoan')}}" class=" Link Link--primary">Tài khoản</a>
              </li>
              @endif
            </ul>
          </nav>
        </div>
      </div>
      <aside class="Drawer__Footer" data-drawer-animated-bottom>
        <ul class="SidebarMenu__Social HorizontalList HorizontalList--spacingFill">
          <li class="HorizontalList__Item">
            <a href="https://www.facebook.com/augustethelabel" class="Link Link--primary" target="_blank" rel="noopener" aria-label="Facebook">
              <span class="Icon-Wrapper--clickable">
                <svg class="Icon Icon--facebook" viewBox="0 0 9 17">
                  <path d="M5.842 17V9.246h2.653l.398-3.023h-3.05v-1.93c0-.874.246-1.47 1.526-1.47H9V.118C8.718.082 7.75 0 6.623 0 4.27 0 2.66 1.408 2.66 3.994v2.23H0v3.022h2.66V17h3.182z">
                  </path>
                </svg>
              </span>
            </a>
          </li>
        </ul>
      </aside>
    </div>
  </section>

</div>
<div id="sidebar-cart" class="Drawer Drawer--fromRight" aria-hidden="true" data-section-id="cart" data-section-type="cart" data-section-settings='{
"type": "drawer",
"itemCount": 0,
"drawer": true,
"hasShippingEstimator": false }'>
<div class="Drawer__Header Drawer__Header--bordered Drawer__Container">
  <span class="Drawer__Title Heading u-h4">Giỏ hàng</span>

  <button class="Drawer__Close Icon-Wrapper--clickable" data-action="close-drawer" data-drawer-id="sidebar-cart" aria-label="Close cart">
    <svg class="Icon Icon--close" role="presentation" viewBox="0 0 16 14">
      <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd">
      </path>
    </svg>
  </button>
</div>

<form class="Cart Drawer__Content" action="https://prestige-theme-couture.myshopify.com/cart" method="POST" novalidate>
  <div class="Drawer__Main Cart__main" data-scrollable>
    <div class="Cart__ShippingNotice Text--subdued">
      <div class="Drawer__Container">
        <p>{{$config->banner}}</p>
        <div class="Cart__ItemList">
          
        </div>
      </div>
    </div>
    <p class="Cart__Empty Heading u-h5"></p> 
    
  </div>
  <div class="Drawer__Footer Cart__Footer" data-drawer-animated-bottom="">
   
  </div>
</form>




</div>
<div class="PageContainer">
  <div id="shopify-section-announcement" class="shopify-section">
    <section id="section-announcement" data-section-id="announcement" data-section-type="announcement-bar">
      <div class="AnnouncementBar">
        <div class="AnnouncementBar__Wrapper">
          <p class="AnnouncementBar__Content Heading">{{$config->banner}}</p>
        </div>
      </div>
    </section>

    <style>
      #section-announcement {
        background: #f3f3f3;
        color: #5c5c5c;
      }
    </style>

    <script>
      document.documentElement.style.setProperty('--announcement-bar-height', document.getElementById('shopify-section-announcement').offsetHeight + 'px');
    </script>
  </div>
  <div id="shopify-section-header" class="shopify-section shopify-section--header">
    <div id="Search" class="Search" aria-hidden="true">
      <div class="Search__Inner">
        <div class="Search__SearchBar">
          <form action="https://prestige-theme-couture.myshopify.com/search" name="GET" role="search" class="Search__Form">
            <div class="Search__InputIconWrapper">
              <span class="hidden-tablet-and-up">
                <svg class="Icon Icon--search" role="presentation" viewBox="0 0 18 17">
                  <g transform="translate(1 1)" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="square">
                    <path d="M16 16l-5.0752-5.0752">
                    </path>
                    <circle cx="6.4" cy="6.4" r="6.4">
                    </circle>
                  </g>
                </svg>
              </span>
              <span class="hidden-phone">
                <svg class="Icon Icon--search-desktop" role="presentation" viewBox="0 0 21 21">
                  <g transform="translate(1 1)" stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="square">
                    <path d="M18 18l-5.7096-5.7096">
                    </path>
                    <circle cx="7.2" cy="7.2" r="7.2">
                    </circle>
                  </g>
                </svg>
              </span>
            </div>
            <!-- seach bar -->
            <input type="search" class="Search__Input Heading" name="q" autocomplete="off" autocorrect="off" autocapitalize="off" placeholder="Search..." autofocus>
            <input type="hidden" name="type" value="product">
          </form>

          <button class="Search__Close Link Link--primary" data-action="close-search">
            <svg class="Icon Icon--close" role="presentation" viewBox="0 0 16 14">
              <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd">
              </path>
            </svg>
          </button>
        </div>

        <div class="Search__Results" aria-hidden="true">
          <div class="PageLayout PageLayout--breakLap">
            <div class="PageLayout__Section">
            </div>
            <div class="PageLayout__Section PageLayout__Section--secondary">
            </div>
          </div>
        </div>
      </div>
    </div>


    <header id="section-header"
    class="Header Header--center Header--initialized  "
    data-section-id="header"
    data-section-type="header"
    data-section-settings='{
    "navigationStyle": "center",
    "hasTransparentHeader": false,
    "isSticky": true
  }'
  role="banner">
  <div class="Header__Wrapper">
    <div class="Header__FlexItem Header__FlexItem--fill">
      <button class="Header__Icon Icon-Wrapper Icon-Wrapper--clickable hidden-desk" aria-expanded="false" data-action="open-drawer" data-drawer-id="sidebar-menu" aria-label="Open navigation">
        <span class="hidden-tablet-and-up">
          <svg class="Icon Icon--nav" role="presentation" viewBox="0 0 20 14">
            <path d="M0 14v-1h20v1H0zm0-7.5h20v1H0v-1zM0 0h20v1H0V0z" fill="currentColor">
            </path>
          </svg>
        </span>
        <span class="hidden-phone">
          <svg class="Icon Icon--nav-desktop" role="presentation" viewBox="0 0 24 16">
            <path d="M0 15.985v-2h24v2H0zm0-9h24v2H0v-2zm0-7h24v2H0v-2z" fill="currentColor">
            </path>
          </svg>
        </span>
      </button>
      <nav class="Header__MainNav hidden-pocket hidden-lap" aria-label="Main navigation">
        <ul class="HorizontalList HorizontalList--spacingExtraLoose">
          <li class="HorizontalList__Item {{ (Request::is('/') ? 'is-active' : '') }}" >
            <a href="{{url('/')}}" class="Heading u-h6">Trang chủ<span class="Header__LinkSpacer">Trang chủ</span>
            </a>
          </li>
          <li class="HorizontalList__Item " aria-haspopup="true">
            <a href="{{url('san-pham')}}" class="Heading u-h6">Sản phẩm<span class="Header__LinkSpacer">Sản phẩm</span>
            </a>
            <div class="MegaMenu  " aria-hidden="true" >
              <div class="MegaMenu__Inner">
                @foreach(CategoryManagementController::_2LevelCategory() as $category)
                @if(isset($category['sub']))
                <div class="MegaMenu__Item MegaMenu__Item--fit">
                  <a href="{{url('danh-muc')}}/{{$category['link']}}" class="MegaMenu__Title Heading Text--subdued u-h7">{{$category['name']}}</a>
                  <ul class="Linklist">
                    @foreach($category['sub'] as $sub)
                    <li class="Linklist__Item">
                      <a href="{{url('danh-muc')}}/{{$sub['link']}}" class="Link Link--secondary">{{$sub['name']}}</a>
                    </li>
                    @endforeach
                  </ul>
                </div>
                @endif
                @endforeach
                <div class="MegaMenu__Item MegaMenu__Item--fit">
                  <a href="{{url('danh-muc')}}" class="MegaMenu__Title Heading Text--subdued u-h7">Ngoài ra</a>
                  <ul class="Linklist">
                    @foreach(CategoryManagementController::_2LevelCategory() as $category)
                    @if(!isset($category['sub']))
                    <li class="Linklist__Item">
                      <a href="{{url('danh-muc')}}/{{$category['link']}}" class="Link Link--secondary">{{$category['name']}}</a>
                    </li>
                    @endif
                    @endforeach
                  </ul>
                </div>
                <div class="MegaMenu__Item MegaMenu__Item--fit">
                  <a href="collections/shop.html" class="MegaMenu__Title Heading Text--subdued u-h7">Facebook iframe</a>
                  
                </div>
              </div>
            </div>
          </li>
          <li class="HorizontalList__Item " >
            <a href="blogs/news.html" class="Heading u-h6">Giới thiệu<span class="Header__LinkSpacer">Giới thiệu</span>
            </a>
          </li>
          <li class="HorizontalList__Item " >
            <a href="pages/about.html" class="Heading u-h6">Hỏi - Đáp<span class="Header__LinkSpacer">Hỏi - Đáp</span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="Header__CurrencySelector Text--subdued Heading Link Link--primary u-h8 hidden-pocket hidden-lap">
        <a href="https://www.facebook.com/augustethelabel" class="Link Link--primary" target="_blank" rel="noopener" aria-label="Facebook">
          <span class="Icon-Wrapper--clickable">
            <svg class="Icon Icon--facebook" viewBox="0 0 9 17">
              <path d="M5.842 17V9.246h2.653l.398-3.023h-3.05v-1.93c0-.874.246-1.47 1.526-1.47H9V.118C8.718.082 7.75 0 6.623 0 4.27 0 2.66 1.408 2.66 3.994v2.23H0v3.022h2.66V17h3.182z">
              </path>
            </svg>
          </span>
        </a>
      </div>
    </div>
    <!-- logo -->
    <div class="Header__FlexItem Header__FlexItem--logo">
      <h1 class="Header__Logo">
        <a href="{{url('/')}}" class="Header__LogoLink">
          <img class="Header__LogoImage Header__LogoImage--primary"
          src="../cdn.shopify.com/s/files/1/0011/9242/7564/files/Logo-black-2x-prestige_130x3617.png?v=1524939414"
          srcset="//cdn.shopify.com/s/files/1/0011/9242/7564/files/Logo-black-2x-prestige_130x.png?v=1524939414 1x, //cdn.shopify.com/s/files/1/0011/9242/7564/files/Logo-black-2x-prestige_130x@2x.png?v=1524939414 2x"
          width="130"
          alt="Prestige - Couture">
        </a>
      </h1>
    </div>

    <div class="Header__FlexItem Header__FlexItem--fill">
      <nav class="Header__SecondaryNav hidden-phone">
        <ul class="HorizontalList HorizontalList--spacingLoose hidden-pocket hidden-lap">
          <!-- User -->
          @if(Auth::user())
          <li class="HorizontalList__Item">
            <div class="dropdown">
              <button class="dropdown-toggle Heading Link Link--primary Text--subdued u-h6" id="dropdownMenuButton"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Chào {{Auth::user()->name}}
              </button>
              <div class="dropdown-menu" style="border-top: none; margin-top: 8px; font-family: sans-serif;" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="{{url('taikhoan/thongtin')}}"> <i class="fa fa-user-o" aria-hidden="true"></i>&nbsp;&nbsp; Thông tin khách hàng</a>
                @if(!Auth::user()->provider_id)
                <a class="dropdown-item" href="{{url('taikhoan/doimatkhau')}}"> <i class="fa fa-key" aria-hidden="true"></i>&nbsp;&nbsp; Đổi mật khẩu</a>
                @endif
                <a class="dropdown-item" href="{{url('taikhoan/lichsu')}}"> <i class="fa fa-file-text-o" aria-hidden="true"></i>&nbsp;&nbsp; Lịch sử mua hàng</a>
                <a class="dropdown-item" href="{{url('taikhoan/logout')}}"> <i class="fa fa-power-off" aria-hidden="true"></i>&nbsp;&nbsp; Đăng xuất</a>
              </div>
            </div>
          </li>
          @else
          <li class="HorizontalList__Item">
            <a href="{{url('taikhoan')}}" class="Heading Link Link--primary Text--subdued u-h6">Tài khoản</a>
          </li>
          @endif
          <li class="HorizontalList__Item">
            <a href="search.html" class="Heading Link Link--primary Text--subdued u-h6" data-action="toggle-search">Tìm kiếm</a>
          </li>

          <li class="HorizontalList__Item">
            <a href="cart.html" class="Heading u-h6" data-action="open-drawer" data-drawer-id="sidebar-cart" aria-label="Open cart">Giỏ hàng (<span class="Header__CartCount">0</span>)</a>
          </li>
        </ul>
      </nav>
      <a href="search.html" class="Header__Icon Icon-Wrapper Icon-Wrapper--clickable hidden-desk" data-action="toggle-search" aria-label="Search">
        <span class="hidden-tablet-and-up">
          <svg class="Icon Icon--search" role="presentation" viewBox="0 0 18 17">
            <g transform="translate(1 1)" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="square">
              <path d="M16 16l-5.0752-5.0752">
              </path>
              <circle cx="6.4" cy="6.4" r="6.4">
              </circle>
            </g>
          </svg>
        </span>
        <span class="hidden-phone">
          <svg class="Icon Icon--search-desktop" role="presentation" viewBox="0 0 21 21">
            <g transform="translate(1 1)" stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="square">
              <path d="M18 18l-5.7096-5.7096">
              </path>
              <circle cx="7.2" cy="7.2" r="7.2">
              </circle>
            </g>
          </svg>
        </span>
      </a>

      <a href="cart.html" class="Header__Icon Icon-Wrapper Icon-Wrapper--clickable hidden-desk" data-action="open-drawer" data-drawer-id="sidebar-cart" aria-expanded="false" aria-label="Open cart">
        <span class="hidden-tablet-and-up">
          <svg class="Icon Icon--cart" role="presentation" viewBox="0 0 17 20">
            <path d="M0 20V4.995l1 .006v.015l4-.002V4c0-2.484 1.274-4 3.5-4C10.518 0 12 1.48 12 4v1.012l5-.003v.985H1V19h15V6.005h1V20H0zM11 4.49C11 2.267 10.507 1 8.5 1 6.5 1 6 2.27 6 4.49V5l5-.002V4.49z" fill="currentColor">
            </path>
          </svg>
        </span>
        <span class="hidden-phone">
          <svg class="Icon Icon--cart-desktop" role="presentation" viewBox="0 0 19 23">
            <path d="M0 22.985V5.995L2 6v.03l17-.014v16.968H0zm17-15H2v13h15v-13zm-5-2.882c0-2.04-.493-3.203-2.5-3.203-2 0-2.5 1.164-2.5 3.203v.912H5V4.647C5 1.19 7.274 0 9.5 0 11.517 0 14 1.354 14 4.647v1.368h-2v-.912z" fill="currentColor">
            </path>
          </svg>
        </span>
        <span class="Header__CartDot ">
        </span>
      </a>
    </div>
  </div>


</header>

<style>:root {
  --use-sticky-header: 1;
  --use-unsticky-header: 0;
}

.shopify-section--header {
  position: -webkit-sticky;
  position: sticky;
  }@media screen and (max-width: 640px) {
    .Header__LogoImage {
      max-width: 90px;
    }
    }:root {
      --header-is-not-transparent: 1;
      --header-is-transparent: 0;
    }</style>

    <script>
      document.documentElement.style.setProperty('--header-height', document.getElementById('shopify-section-header').offsetHeight + 'px');
    </script>

  </div>

  <main id="main" role="main">
    @section('content')
    @show
  </main>

  <div id="shopify-section-footer" class="shopify-section shopify-section--footer">
    <footer id="section-footer" class="Footer  " role="contentinfo">
      <div class="Container">
        <div class="Footer__Inner">
          <div class="Footer__Block Footer__Block--text" >
            <h2 class="Footer__Title Heading u-h6">Về cửa hàng</h2>
            <div class="Footer__Content Rte">
              <?php echo $config->shop_intro ?>
              <p>
              </p>
            </div>
            <ul class="Footer__Social HorizontalList HorizontalList--spacingLoose">
              <li class="HorizontalList__Item">
                <a href="https://www.facebook.com/augustethelabel" class="Link Link--primary" target="_blank" rel="noopener" aria-label="Facebook">
                  <span class="Icon-Wrapper--clickable">
                    <svg class="Icon Icon--facebook" viewBox="0 0 9 17">
                      <path d="M5.842 17V9.246h2.653l.398-3.023h-3.05v-1.93c0-.874.246-1.47 1.526-1.47H9V.118C8.718.082 7.75 0 6.623 0 4.27 0 2.66 1.408 2.66 3.994v2.23H0v3.022h2.66V17h3.182z">
                      </path>
                    </svg>
                  </span>
                </a>
              </li>


              <li class="HorizontalList__Item">
                <a href="https://www.instagram.com/augustethelabel/" class="Link Link--primary" target="_blank" rel="noopener" aria-label="Instagram">
                  <span class="Icon-Wrapper--clickable">
                    <svg class="Icon Icon--instagram" role="presentation" viewBox="0 0 32 32">
                      <path d="M15.994 2.886c4.273 0 4.775.019 6.464.095 1.562.07 2.406.33 2.971.552.749.292 1.283.635 1.841 1.194s.908 1.092 1.194 1.841c.216.565.483 1.41.552 2.971.076 1.689.095 2.19.095 6.464s-.019 4.775-.095 6.464c-.07 1.562-.33 2.406-.552 2.971-.292.749-.635 1.283-1.194 1.841s-1.092.908-1.841 1.194c-.565.216-1.41.483-2.971.552-1.689.076-2.19.095-6.464.095s-4.775-.019-6.464-.095c-1.562-.07-2.406-.33-2.971-.552-.749-.292-1.283-.635-1.841-1.194s-.908-1.092-1.194-1.841c-.216-.565-.483-1.41-.552-2.971-.076-1.689-.095-2.19-.095-6.464s.019-4.775.095-6.464c.07-1.562.33-2.406.552-2.971.292-.749.635-1.283 1.194-1.841s1.092-.908 1.841-1.194c.565-.216 1.41-.483 2.971-.552 1.689-.083 2.19-.095 6.464-.095zm0-2.883c-4.343 0-4.889.019-6.597.095-1.702.076-2.864.349-3.879.743-1.054.406-1.943.959-2.832 1.848S1.251 4.473.838 5.521C.444 6.537.171 7.699.095 9.407.019 11.109 0 11.655 0 15.997s.019 4.889.095 6.597c.076 1.702.349 2.864.743 3.886.406 1.054.959 1.943 1.848 2.832s1.784 1.435 2.832 1.848c1.016.394 2.178.667 3.886.743s2.248.095 6.597.095 4.889-.019 6.597-.095c1.702-.076 2.864-.349 3.886-.743 1.054-.406 1.943-.959 2.832-1.848s1.435-1.784 1.848-2.832c.394-1.016.667-2.178.743-3.886s.095-2.248.095-6.597-.019-4.889-.095-6.597c-.076-1.702-.349-2.864-.743-3.886-.406-1.054-.959-1.943-1.848-2.832S27.532 1.247 26.484.834C25.468.44 24.306.167 22.598.091c-1.714-.07-2.26-.089-6.603-.089zm0 7.778c-4.533 0-8.216 3.676-8.216 8.216s3.683 8.216 8.216 8.216 8.216-3.683 8.216-8.216-3.683-8.216-8.216-8.216zm0 13.549c-2.946 0-5.333-2.387-5.333-5.333s2.387-5.333 5.333-5.333 5.333 2.387 5.333 5.333-2.387 5.333-5.333 5.333zM26.451 7.457c0 1.059-.858 1.917-1.917 1.917s-1.917-.858-1.917-1.917c0-1.059.858-1.917 1.917-1.917s1.917.858 1.917 1.917z">
                      </path>
                    </svg>
                  </span>
                </a>
              </li>


              <li class="HorizontalList__Item">
                <a href="https://www.pinterest.com.au/augustethelabel/" class="Link Link--primary" target="_blank" rel="noopener" aria-label="Pinterest">
                  <span class="Icon-Wrapper--clickable">
                    <svg class="Icon Icon--pinterest" role="presentation" viewBox="0 0 32 32">
                      <path d="M16 0q3.25 0 6.208 1.271t5.104 3.417 3.417 5.104T32 16q0 4.333-2.146 8.021t-5.833 5.833T16 32q-2.375 0-4.542-.625 1.208-1.958 1.625-3.458l1.125-4.375q.417.792 1.542 1.396t2.375.604q2.5 0 4.479-1.438t3.063-3.937 1.083-5.625q0-3.708-2.854-6.437t-7.271-2.729q-2.708 0-4.958.917T8.042 8.689t-2.104 3.208-.729 3.479q0 2.167.812 3.792t2.438 2.292q.292.125.5.021t.292-.396q.292-1.042.333-1.292.167-.458-.208-.875-1.083-1.208-1.083-3.125 0-3.167 2.188-5.437t5.729-2.271q3.125 0 4.875 1.708t1.75 4.458q0 2.292-.625 4.229t-1.792 3.104-2.667 1.167q-1.25 0-2.042-.917t-.5-2.167q.167-.583.438-1.5t.458-1.563.354-1.396.167-1.25q0-1.042-.542-1.708t-1.583-.667q-1.292 0-2.167 1.188t-.875 2.979q0 .667.104 1.292t.229.917l.125.292q-1.708 7.417-2.083 8.708-.333 1.583-.25 3.708-4.292-1.917-6.938-5.875T0 16Q0 9.375 4.687 4.688T15.999.001z">
                      </path>
                    </svg>
                  </span>
                </a>
              </li>


              <li class="HorizontalList__Item">
                <a href="https://www.youtube.com/channel/UCke1cKhycmjcbcYO97Es--A" class="Link Link--primary" target="_blank" rel="noopener" aria-label="YouTube">
                  <span class="Icon-Wrapper--clickable">
                    <svg class="Icon Icon--youtube" role="presentation" viewBox="0 0 33 32">
                      <path d="M0 25.693q0 1.997 1.318 3.395t3.209 1.398h24.259q1.891 0 3.209-1.398t1.318-3.395V6.387q0-1.997-1.331-3.435t-3.195-1.438H4.528q-1.864 0-3.195 1.438T.002 6.387v19.306zm12.116-3.488V9.876q0-.186.107-.293.08-.027.133-.027l.133.027 11.61 6.178q.107.107.107.266 0 .107-.107.213l-11.61 6.178q-.053.053-.107.053-.107 0-.16-.053-.107-.107-.107-.213z">
                      </path>
                    </svg>
                  </span>
                </a>
              </li>


              <li class="HorizontalList__Item">
                <a href="https://auguste-the-label.tumblr.com/" class="Link Link--primary" target="_blank" rel="noopener" aria-label="Tumblr">
                  <span class="Icon-Wrapper--clickable">
                    <svg class="Icon Icon--tumblr" role="presentation" viewBox="0 0 32 32">
                      <path d="M6.593 13.105h3.323v11.256q0 2.037.456 3.35.509 1.206 1.581 2.144 1.045.965 2.76 1.581 1.635.563 3.725.563 1.822 0 3.404-.402 1.367-.268 3.564-1.313v-5.038q-2.224 1.528-4.61 1.528-1.179 0-2.358-.616-.697-.456-1.045-1.26-.268-.884-.268-3.564v-8.228h7.236V8.068h-7.236V.001h-4.342q-.214 2.278-1.045 4.047-.831 1.715-2.09 2.734-1.313 1.233-3.055 1.769v4.556z">
                      </path>
                    </svg>
                  </span>
                </a>
              </li>

            </ul>
          </div>
          <div class="Footer__Block Footer__Block--links" >
            <h2 class="Footer__Title Heading u-h6">Sản phầm</h2>

            <ul class="Linklist">
              @foreach(CategoryManagementController::_2LevelCategory() as $category)
              <li class="Linklist__Item">
                <a href="{{url('danh-muc')}}/{{$category['link']}}" class="Link Link--primary">{{$category['name']}}</a>
              </li>
              @endforeach
            </ul>
          </div>
          <div class="Footer__Block Footer__Block--links" >
            <h2 class="Footer__Title Heading u-h6">About</h2>

            <ul class="Linklist">
              <li class="Linklist__Item">
                <a href="pages/contact-us-1.html" class="Link Link--primary">Contact</a>
              </li>
              <li class="Linklist__Item">
                <a href="pages/about.html" class="Link Link--primary">About Us</a>
              </li>
              <li class="Linklist__Item">
                <a href="pages/faq.html" class="Link Link--primary">FAQ</a>
              </li>
              <li class="Linklist__Item">
                <a href="blogs/news.html" class="Link Link--primary">Blog</a>
              </li>
            </ul>
          </div>
          <div class="Footer__Block Footer__Block--newsletter" >
            <h2 class="Footer__Title Heading u-h6">Newsletter</h2>
            <div class="Footer__Content Rte">
              <p>Subscribe to get notified about product launches, special offers and company news.</p>
            </div>
            <form method="post" action="https://prestige-theme-couture.myshopify.com/contact#footer-newsletter" id="footer-newsletter" accept-charset="UTF-8" class="Footer__Newsletter Form">
              <input type="hidden" name="form_type" value="customer" />
              <input type="hidden" name="utf8" value="✓" />
              <input type="hidden" name="contact[tags]" value="newsletter">
              <input type="email" name="contact[email]" class="Form__Input" aria-label="Enter your email address" placeholder="Enter your email address" required>
              <button type="submit" class="Form__Submit Button Button--primary">Subscribe</button>
            </form>
          </div>
        </div>
        <div class="Footer__Aside">
          <div class="Footer__Copyright">
            <a href="index.html" class="Footer__StoreName Heading u-h7 Link Link--secondary">© Prestige - Couture</a>
            <p class="Footer__ThemeAuthor">Theme by Maestrooo | <a class="Link Link--primary" target="_blank" rel="nofollow" href="https://www.shopify.com/?utm_campaign=poweredby&amp;utm_medium=shopify&amp;utm_source=onlinestore">Powered by Shopify</a>
            </p>
          </div>
          <ul class="Footer__PaymentList HorizontalList">
            <li class="HorizontalList__Item">

            </li>
          </ul>
        </div>
      </div>
    </footer>

  </div>
</div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script src="{{url('./assets/outside/js/jquery.mask.js')}}"></script>
<script src="{{url('./assets/outside/js/custom.js')}}"></script>
<script>
  $(function() {
    GetCartItem();
  })
  
</script>
</html>
