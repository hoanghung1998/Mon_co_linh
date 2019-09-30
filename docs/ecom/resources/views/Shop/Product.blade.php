@extends('Widget')
@section('title',$product->name)
@section('type', $type)
@section('img',url($imgs[0]->link))
@section('page_content',$product->description)
@section('keyword',$product->keyword.','.$type)

@section('content')
{{ csrf_field() }}
<main id="main" role="main">
	<div id="shopify-section-product-template" class="shopify-section shopify-section--bordered">
		<section class="Product Product--medium" data-section-id="product-template" data-section-type="product" data-section-settings='{
		"enableHistoryState": true,
		"templateSuffix": "",
		"showInventoryQuantity": true,
		"showSku": false,
		"stackProductImages": true,
		"showThumbnails": true,
		"inventoryQuantityThreshold": 5,
		"enableImageZoom": true
	}'>
	<div class="Product__Wrapper">
		<div class="Product__Gallery Product__Gallery--stack Product__Gallery--withThumbnails">
			<span id="ProductGallery" class="Anchor"></span>
			<div class="Product__ActionList hidden-lap-and-up">
				<div class="Product__ActionItem hidden-lap-and-up">
					<button class="RoundButton RoundButton--small RoundButton--flat" data-action="open-product-zoom">
						<svg class="Icon Icon--plus" role="presentation" viewBox="0 0 16 16">
							<g stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="square">
								<path d="M8,1 L8,15"></path>
								<path d="M1,8 L15,8"></path>
							</g>
						</svg>
					</button>
				</div>
			</div>
			<div class="Product__SlideshowNav Product__SlideshowNav--thumbnails">
				<div class="Product__SlideshowNavScroller">
					@foreach($imgs as $i)
					<a href="#Image{{$i->id}}" data-image-id="{{$i->id}}" class="Product__SlideshowNavImage">
						<img src="{{url($i->link)}}">
					</a>
					@endforeach
				</div>
			</div>
			<div class="Product__SlideshowNav Product__SlideshowNav--dots">
				<div class="Product__SlideshowNavScroller">
					@foreach($imgs as $i)
					<a href="#Image{{$i->id}}" class="Product__SlideshowNavDot"></a>
					@endforeach
				</div>
			</div>
			<div class="Product__Slideshow Product__Slideshow--zoomable Carousel" data-flickity-config='{
			"prevNextButtons": false,
			"pageDots": true,
			"adaptiveHeight": true,
			"watchCSS": true,
			"dragThreshold": 8,
			"initialIndex": 0,
			"arrowShape": {"x0": 20, "x1": 60, "y1": 40, "x2": 60, "y2": 35, "x3": 25}}'>
			@foreach($imgs as $i)
			<div id="Image{{$i->id}}" class="Product__SlideItem Product__SlideItem--image Carousel__Cell"
				data-image-position-ignoring-video="{{$i->img_order-1}}"
				data-image-position="{{$i->img_order-1}}"
				data-image-id="{{$i->id}}">
				<center>
					<img class="Image--lazyLoad Image--fadeIn" src="{{url($i->link)}}" data-src="{{url($i->link)}}" alt="{{$product->name}}"
					data-max-width="1780"
					data-max-height="2530"
					data-original-src="{{url($i->link)}}">
					<span class="Image__Loader"></span>
					<noscript>
						<img src="{{url($i->link)}}" alt="{{$product->name}}">
					</noscript>
				</center>
				<hr>
			</div>
			@endforeach

		</div>
	</div>


	<!-- END IMAGE -->
	<div class="Product__InfoWrapper">
		<div class="Product__Info ">
			<div class="Container">
				<div class="ProductMeta">
					<h1 class="ProductMeta__Title Heading u-h2">{{$product->name}}</h1>
					<div class="ProductMeta__PriceList Heading">
						@if($product->sale_price == 0)
						<span class="ProductMeta__Price Price Text--subdued u-h4" data-money-convertible >{{number_format($product->price,0)}} VNĐ</span>
						@else
						<span class="ProductMeta__Price Price Text--subdued u-h4" style="text-decoration: line-through;" data-money-convertible>{{number_format($product->price,0)}} VNĐ</span>
						➜ 
						<span class="ProductMeta__Price Price Text--subdued u-h4" data-money-convertible>{{number_format($product->sale_price,0)}} VNĐ</span>
						@endif
					</div>
					<div class="ProductMeta__Description">
						<div class="Rte">
							<?php echo $product->content; ?>
						</div>
						<hr>
						<div class="category">
							@foreach($categories as $cat)
							<a href="{{url('danh-muc')}}/{{$cat->link}}" style="display: inline-block; background: gray; padding: 3px 5px; color:white">{{$cat->name}}</a>
							@endforeach
						</div>
					</div>
				</div>
				<form method="post" action="https://prestige-theme-couture.myshopify.com/cart/add" id="product_form_855841210412" accept-charset="UTF-8" class="ProductForm" enctype="multipart/form-data">
					<div class="ProductForm__Variants">
						<div class="ProductForm__Option ">
							<button type="button" class="ProductForm__Item" aria-expanded="false" aria-controls="popover-855841210412-product-template-size">
								@if(count($sizes) != 0)
								<span class="ProductForm__OptionName">Size: 
									<span class="ProductForm__SelectedValue" value="{{$sizes->first()->id}}" size="{{$sizes->first()->name}}">{{$sizes->first()->name}} còn {{$sizes->first()->pivot->amount}} sản phẩm</span>
								</span>
								@else
								<span class="ProductForm__OptionName">Size: 
									<span class="ProductForm__SelectedValue" value="0" size="Sản phẩm này không có size">Sản phẩm này không có size</span>
								</span>
								@endif
								<svg class="Icon Icon--select-arrow" role="presentation" viewBox="0 0 19 12">
									<polyline fill="none" stroke="currentColor" points="17 2 9.5 10 2 2" fill-rule="evenodd" stroke-width="2" stroke-linecap="square">
									</polyline>
								</svg>
							</button>
						</div>
						<div class="no-js ProductForm__Option">
							<div class="Select Select--primary">
								<svg class="Icon Icon--select-arrow" role="presentation" viewBox="0 0 19 12">
									<polyline fill="none" stroke="currentColor" points="17 2 9.5 10 2 2" fill-rule="evenodd" stroke-width="2" stroke-linecap="square">
									</polyline>
								</svg>
								<select id="product-select" name="size" title="Variant">
									@if(count($sizes) != 0)
									@foreach($sizes as $s)
									<option  value="{{$s->id}}" >{{$s->name}} còn {{$s->pivot->amount}} sản phẩm</option>
									@endforeach
									@else
									<option  value="0" >Sản phẩm này không có size</option>
									@endif
								</select>
							</div>
						</div>
					</div>
					<div class="button-area">
						
					</div>
				</form>
				<script type="application/json" data-product-json>{"product": {"variants":[]}}
				</script>
				<div class="Product__QuickNav hidden-pocket">
					<div class="Product__QuickNavWrapper">
						<a href="#ProductAside" class="Heading Link Link--secondary u-h7">Các thông tin khác <svg class="Icon Icon--select-arrow-right" role="presentation" viewBox="0 0 11 18">
							<path d="M1.5 1.5l8 7.5-8 7.5" stroke-width="2" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="square">
							</path>
						</svg>
					</a>
					<a href="#ProductGallery" class="Heading Link Link--secondary u-h7">Xem sản phẩm <svg class="Icon Icon--select-arrow-right" role="presentation" viewBox="0 0 11 18">
						<path d="M1.5 1.5l8 7.5-8 7.5" stroke-width="2" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="square">
						</path>
					</svg>
				</a>
			</div>
		</div>
	</div>
</div>
<div class="Product__ActionList hidden-pocket">
	<div class="Product__ActionItem hidden-lap-and-up">
		<button class="RoundButton RoundButton--small RoundButton--flat" data-action="open-product-zoom">
			<svg class="Icon Icon--plus" role="presentation" viewBox="0 0 16 16">
				<g stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="square">
					<path d="M8,1 L8,15">
					</path>
					<path d="M1,8 L15,8">
					</path>
				</g>
			</svg>
		</button>
	</div>
</div>
</div>
<div class="Product__Aside">
	<span id="ProductAside" class="Anchor">
	</span>
	<div class="Product__Tabs">
		<div class="Collapsible Collapsible--large">
			<button class="Collapsible__Button Heading u-h6" data-action="toggle-collapsible" aria-expanded="false">Vận chuyển<span class="Collapsible__Plus">
			</span>
		</button>

		<div class="Collapsible__Inner">
			<div class="Collapsible__Content">
				<div class="Rte">
					<?php echo $config->shipping; ?>
				</div>
			</div>
		</div>
	</div>
	<div class="Collapsible Collapsible--large">
		<button class="Collapsible__Button Heading u-h6" data-action="toggle-collapsible" aria-expanded="false">Chính sách<span class="Collapsible__Plus">
		</span>
	</button>

	<div class="Collapsible__Inner">
		<div class="Collapsible__Content">
			<div class="Rte">
				<?php echo $config->policy; ?>
			</div>
		</div>
	</div>
</div>
<div class="Collapsible Collapsible--large">
	<button class="Collapsible__Button Heading u-h6" data-action="toggle-collapsible" aria-expanded="false">
		<span>Reviews <span class="text--light">(1)</span>
	</span>
	<span class="Collapsible__Plus">
	</span>
</button>

<div class="Collapsible__Inner">
	<div class="Collapsible__Content">
		<div id="shopify-product-reviews">
			<style scoped>.spr-container {
				padding: 24px;
				border-color: #ECECEC;}
				.spr-review, .spr-form {
					border-color: #ECECEC;
				}
			</style>

			<div class="spr-container">
				<div class="spr-header">
					<h2 class="spr-header-title">Customer Reviews</h2>
					<div class="spr-summary" itemscope itemprop="aggregateRating" itemtype="http://schema.org/AggregateRating">
						<meta itemprop="itemreviewed" content="Scarlett Baby Doll Mini Dress Black">

						<span class="spr-starrating spr-summary-starrating">
							<meta itemprop="bestRating" content="5">
							<meta itemprop="worstRating" content="1">
							<meta itemprop="reviewCount" content="1">
							<meta itemprop="ratingValue" content="5.0">
							<i class="spr-icon spr-icon-star"></i>
							<i class="spr-icon spr-icon-star"></i>
							<i class="spr-icon spr-icon-star"></i>
							<i class="spr-icon spr-icon-star"></i>
							<i class="spr-icon spr-icon-star"></i>
						</span>
						<span class="spr-summary-caption">
							<span class='spr-summary-actions-togglereviews'>Based on 1 review</span>
						</span>
						<span class="spr-summary-actions">
							<a href='#' class='spr-summary-actions-newreview' onclick='SPR.toggleForm(855841210412);return false'>Write a review</a>
						</span>
					</div>
				</div>

				<div class="spr-content">
					<div class='spr-form' id='form_855841210412' style='display: none'>
					</div>
					<div class='spr-reviews' id='reviews_855841210412' >
					</div>
				</div>

			</div>
		</div>
	</div>
</div>
</div>
</div>

</div>
</div>
<div id="popover-855841210412-product-template-size" class="OptionSelector Popover Popover--withMinWidth" aria-hidden="true">
	<header class="Popover__Header">
		<button type="button" class="Popover__Close Icon-Wrapper--clickable" data-action="close-popover">
			<svg class="Icon Icon--close" role="presentation" viewBox="0 0 16 14">
				<path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd">
				</path>
			</svg>
		</button>
		<span class="Popover__Title Heading u-h4">Size</span>
	</header>

	<div class="Popover__Content">
		<div class="Popover__ValueList" data-scrollable>
			@if(count($sizes) != 0)
			@foreach($sizes as $i)
			<button type="button" class="Popover__Value Heading Link Link--primary u-h6" data-value="{{$i->name}} còn {{$i->pivot->amount}} sản phẩm" data-option-position="{{$i->id}}"  data-size="{{$i->name}}" data-action="select-value">{{$i->name}} còn {{$i->pivot->amount}} sản phẩm</button>
			@endforeach
			@else
			<button type="button" class="Popover__Value Heading Link Link--primary u-h6" data-value="Sản phẩm này không có size" data-option-position="0" data-action="select-value">Sản phẩm này không có size</button>
			@endif
		</div>
		<button type="button" class="Popover__FooterHelp Heading Link Link--primary Text--subdued u-h6" data-action="open-modal" aria-controls="modal-size-chart">Bảng size</button>
	</div>
</div>
<div id="modal-size-chart" class="Modal Modal--dark Modal--fullScreen Modal--pageContent" aria-hidden="true" role="dialog" data-scrollable>
	<header class="Modal__Header">
		<h2 class="Modal__Title Heading u-h1">Bảng size</h2>
	</header>

	<div class="Modal__Content Rte">
		<div class="Container Container--extraNarrow">
			<?php echo $config->size_chart; ?>
			<p> </p>
			<?php echo $config->size_chart_note; ?>
		</div>
	</div>

	<button class="Modal__Close RoundButton RoundButton--large" data-animate-bottom data-action="close-modal">
		<svg class="Icon Icon--close" role="presentation" viewBox="0 0 16 14">
			<path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd">
			</path>
		</svg>
	</button>
</div>

</section>
<style>
	/* Very ugly haha */

	@media screen and (max-width: 640px) {
		#shopify-section-product-template + .shopify-section--bordered {
			border-top: 0;
		}

		#shopify-section-product-template + .shopify-section--bordered > .Section {
			padding-top: 0;
		}
	}
</style>
<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
	<!-- Background of PhotoSwipe -->
	<div class="pswp__bg">
	</div>

	<!-- Slides wrapper with overflow:hidden. -->
	<div class="pswp__scroll-wrap">

		<!-- Container that holds slides. Do not remove as content is dynamically added -->
		<div class="pswp__container">
			<div class="pswp__item"></div>
			<div class="pswp__item"></div>
			<div class="pswp__item"></div>
		</div>
		<!-- Main UI bar -->
		<div class="pswp__ui pswp__ui--hidden">
			<button class="pswp__button pswp__button--prev RoundButton" data-animate-left title="Previous (left arrow)">
				<svg class="Icon Icon--arrow-left" role="presentation" viewBox="0 0 11 21">
					<polyline fill="none" stroke="currentColor" points="10.5 0.5 0.5 10.5 10.5 20.5" stroke-width="1.25">
					</polyline>
				</svg>
			</button>
			<button class="pswp__button pswp__button--close RoundButton RoundButton--large" data-animate-bottom title="Close (Esc)">
				<svg class="Icon Icon--close" role="presentation" viewBox="0 0 16 14">
					<path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd">
					</path>
				</svg>
			</button>
			<button class="pswp__button pswp__button--next RoundButton" data-animate-right title="Next (right arrow)">
				<svg class="Icon Icon--arrow-right" role="presentation" viewBox="0 0 11 21">
					<polyline fill="none" stroke="currentColor" points="0.5 0.5 10.5 10.5 0.5 20.5" stroke-width="1.25">
					</polyline>
				</svg>
			</button>
		</div>
	</div>
</div>
</div>
<div id="shopify-section-related-products" class="shopify-section shopify-section--bordered">
	<section class="Section Section--spacingNormal" data-section-id="related-products" data-section-type="related-products">
		<header class="SectionHeader SectionHeader--center">
			<div class="Container">
				<h3 class="SectionHeader__Heading Heading u-h3">Có thể bạn sẽ thích</h3>
			</div>
		</header>
		<div class="ProductListWrapper">
			<div class="ProductList ProductList--carousel Carousel" data-flickity-config='{
			"prevNextButtons": true,
			"pageDots": false,
			"wrapAround": false,
			"contain": true,
			"cellAlign": "center",
			"watchCSS": true,
			"dragThreshold": 8,
			"groupCells": true,
			"arrowShape": {"x0": 20, "x1": 60, "y1": 40, "x2": 60, "y2": 35, "x3": 25}
		}'>
		@foreach($randProducts as $product)
		<div class="Carousel__Cell">
			<div class="ProductItem ">
				<div class="ProductItem__Wrapper">
					<a href="{{url('san-pham')}}/{{$product->link}}" class="ProductItem__ImageWrapper ProductItem__ImageWrapper--withAlternateImage">
						<div class="AspectRatio AspectRatio--withFallback" style="max-width: 1780px; padding-bottom: 142.134831461%; --aspect-ratio: 0.7035573122529645">
							<img class="ProductItem__Image ProductItem__Image--alternate Image--lazyLoad Image--fadeIn" data-src="{{url($product->GetFirstImage()->link)}}" data-widths="" data-sizes="auto" alt="{{$product->name}}" data-image-id="3001698189356">
	
							<img class="ProductItem__Image Image--lazyLoad Image--fadeIn" data-src="{{url($product->GetSecondImage()->link)}}" data-widths="" data-sizes="auto" alt="{{$product->name}}" data-image-id="3001686425644">
							<span class="Image__Loader">
							</span>

							<noscript>
								<img class="ProductItem__Image ProductItem__Image--alternate" src="{{url($product->GetFirstImage()->link)}}" alt="{{$product->name}}">
								<img class="ProductItem__Image" src="{{url($product->GetSecondImage()->link)}}" alt="{{$product->name}}">
							</noscript>
						</div>
					</a>
					<div class="ProductItem__Info ProductItem__Info--left">
						<h2 class="ProductItem__Title Heading">
							<a href="{{url('san-pham')}}/{{$product->link}}">{{$product->name}}</a>
						</h2>
						@if($product->sale_price != 0)
						<div class="ProductItem__PriceList  Heading">
							<span class="ProductItem__Price Price Text--subdued" data-money-convertible><p style="text-decoration: line-through; display: inline">{{number_format($product->price,0)}} VNĐ</p> ➜ {{number_format($product->sale_price,0)}} VNĐ</span>
						</div>
						@else
						<div class="ProductItem__PriceList  Heading">
							<span class="ProductItem__Price Price Text--subdued" data-money-convertible>{{number_format($product->price,0)}} VNĐ</span>
						</div>
						@endif
					</div>
				</div>
			</div>
		</div>
		@endforeach
	</div>
</div>
</section>
</div>
<div id="shopify-section-recently-viewed-products" class="shopify-section shopify-section--bordered shopify-section--hidden">
	<section class="Section Section--spacingNormal" data-section-id="recently-viewed-products" data-section-type="recently-viewed-products" data-section-settings='{
	"productId": 855841210412
}'>
<header class="SectionHeader SectionHeader--center">

</header>
</section>
</div>
</main>

<script>
	$(function() {
		CheckSize();
	});
	$('.Popover__Value').on('click',function() {
		$('.ProductForm__SelectedValue').attr('value',$(this).attr('data-option-position'));
		$('.ProductForm__SelectedValue').attr('size',$(this).attr('data-size'));
		CheckSize();
	})

	function AddCart(){
		var Product = {
			pro_id: <?php echo $product->id ?>,
			img: $('meta[property=image]').attr('content'),
			name: $('.ProductMeta__Title').html(),
			product_code: '<?php echo $product->product_code ?>',
			@if($product->sale_price != 0)
			price: <?php echo $product->sale_price ?>,
			@else
			price: <?php echo $product->price ?>,
			@endif
			size: ($('.ProductForm__SelectedValue').attr('size')!== null) ? $('.ProductForm__SelectedValue').attr('size') : "Không có size",
			value: 1
		};
		loadingBar50();
		if(localStorage.getItem("Cart") !== null){
			var CurrentCart = JSON.parse(localStorage.getItem("Cart"));
			var flag = 0;
			var index = 0;
			for(let i = 1; i < CurrentCart.length; i++){
				if(CurrentCart[i].product_code == Product.product_code && CurrentCart[i].size == Product.size) {flag = 1; index=i} break;
			}
			if(flag == 0){
				CurrentCart.push(Product);
				localStorage.setItem("Cart",JSON.stringify(CurrentCart));
			}else{
				CurrentCart[index].value++;
				localStorage.setItem("Cart",JSON.stringify(CurrentCart));
			}
		}else{
			var CurrentCart = [];
			// must push twice
			CurrentCart.push(null);
			CurrentCart.push(Product);
			console.log(CurrentCart);
			localStorage.setItem("Cart",JSON.stringify(CurrentCart));
		};
		loadingBar75();
		GetCartItem();
		loadingBar100();
		$('#sidebar-cart').attr('aria-hidden','false');
		$('.PageOverlay').attr('class','PageOverlay is-visible');
		$('button[data-drawer-id=sidebar-cart]').on('click',function() {
			$('#sidebar-cart').attr('aria-hidden','true');
			$('.PageOverlay').attr('class','PageOverlay');
		})
	}
	function CheckSize() {
		loadingBar100();
		let _token = $('input[name="_token"]').val();
		var size_id = parseInt($('.ProductForm__SelectedValue').attr('value'));
		if($('.ProductForm__SelectedValue').html() != "Sản phẩm nay không có size"){
			$.ajax({
				url : "{{url('san-pham/check-size')}}",
				type : "POST",
				data : {
					_token: _token,
					size_id: size_id,
					pro_id: <?php echo $product->id ?>
				},
				success : function (result){
					$('.button-area').html(result);
				},
				error: function(){
					alert('Xảy ra lỗi! Vui lòng tải lại trang và thử lại!');
				}
			});
		}
	}

</script>

@endsection