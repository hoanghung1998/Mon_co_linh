$(function() {
	$('input[name=phone]').mask('(+84) 000 000 000',{
		placeholder: "(+84)"
	})
	$('.label-phone').css({'opacity':'1','background':'rgba(255, 255, 255, 1)'});
})

function UpdateCartItemQuantity(selector = ".QuantitySelector__CurrentQuantity") {	
	let product_code = $(selector).attr('data-line-id');
	let size = $(selector).attr('size');
	let value = $(selector).val();
	loadingBar25();
	var CurrentCart = JSON.parse(localStorage.getItem("Cart"));
	loadingBar50();
	for (var i = 1; i < CurrentCart.length; i++) {
		if(product_code == CurrentCart[i].product_code && size == CurrentCart[i].size){
			CurrentCart[i].value = value;
		}
	}
	loadingBar100();
	localStorage.setItem("Cart",JSON.stringify(CurrentCart));
	DeleteCartItem();
}
function DeleteCartItem() {
	var CurrentCart = JSON.parse(localStorage.getItem("Cart"));
	var newCart = [];
	loadingBar25();
	newCart.push(CurrentCart[0]);
	for (var i = 1; i < CurrentCart.length; i++) {
		if(CurrentCart[i].value != 0){
			newCart.push(CurrentCart[i])
		}
	}
	loadingBar100();
	localStorage.setItem("Cart",JSON.stringify(newCart));
	GetCartItem();
}

function GetCartItem() {
	if(localStorage.getItem("Cart") !== null){
		var CurrentCart = JSON.parse(localStorage.getItem("Cart"));
		if(CurrentCart.length>1){
			var Append = "";
			var CountItem = 0;
			var Money = 0;
			for(let i = 1; i<CurrentCart.length;i++){
				CountItem+=parseInt(CurrentCart[i].value);
				Money+=parseInt(CurrentCart[i].value*CurrentCart[i].price);
				let img = '<div class="CartItemWrapper">'+'<div class="CartItem">'+'<div class="CartItem__ImageWrapper AspectRatio">'+'<img class="CartItem__Image" src="'+CurrentCart[i].img+'">'+'</div>';
				let name = '<div class="CartItem__Info">'+'<h2 class="CartItem__Title Heading">'+'<a href="#!">'+CurrentCart[i].name+'</a>'+'</h2>';
				let size = '<div class="CartItem__Meta Heading Text--subdued">'+'<p class="CartItem__Variant">Size : '+CurrentCart[i].size+'</p>'+'<div class="CartItem__PriceList">'+'<span class="CartItem__Price Price">Giá : '+MoneyFormat(CurrentCart[i].price)+' VNĐ</span>'+'</div>'+'</div>';
				let minus = '<div class="CartItem__Actions Heading Text--subdued" style="text-align: center">'+
				'<div class="CartItem__QuantitySelector">'+'<div class="QuantitySelector">'+
				'<a class="QuantitySelector__Button Quantity__minus Link Link--primary" size="'+CurrentCart[i].size+'" id="minus-'+CurrentCart[i].product_code+'" title="Đưa số lượng về '+(CurrentCart[i].value-1)+'" href="" data-quantity="'+(CurrentCart[i].value-1)+'" data-line-id="'+CurrentCart[i].product_code+'" data-action="update-item-quantity"><svg class="Icon Icon--minus" role="presentation" viewBox="0 0 16 2">'+'<path d="M1,1 L15,1" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="square"></path>'+'</svg>'+'</a>';
				let input = '<input type="text" size="'+CurrentCart[i].size+'" data-line-id="'+CurrentCart[i].product_code+'" class="QuantitySelector__CurrentQuantity" pattern="[0-9]*" value="'+CurrentCart[i].value+'">';
				let add = '<a class="QuantitySelector__Button Quantity__add Link Link--primary" size="'+CurrentCart[i].size+'" id="add-'+CurrentCart[i].product_code+'" title="Đưa số lượng lên '+(parseInt(CurrentCart[i].value)+1)+'" href="" data-quantity="'+(parseInt(CurrentCart[i].value)+1)+'" data-line-id="'+CurrentCart[i].product_code+'" data-action="update-item-quantity">'+'<svg class="Icon Icon--plus" role="presentation" viewBox="0 0 16 16">'+'<g stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="square">'+'<path d="M8,1 L8,15"></path>'+'<path d="M1,8 L15,8"></path>'+'</g>'+'</svg>'+'</a>'+'</div>'+'</div>'+'<a href="#!" class="CartItem__Remove Link Link--underline Link--underlineShort" size="'+CurrentCart[i].size+'" data-quantity="0" data-line-id="'+CurrentCart[i].product_code+'" data-action="remove-item">Xóa sản phẩm</a>'+'</div>'+'</div>'+'</div>'+'</div>';

				Append += img+name+size+minus+input+add;
			}
			$('.Cart__ItemList').html(Append);
			var Footer = ' <button type="button" class="Cart__NoteButton" data-action="toggle-cart-note">Thêm ghi chú</button>'+
			'<button type="submit" name="checkout" class="Cart__Checkout Button Button--primary Button--full">'+
			'<span>Thanh toán</span>'+
			'<span class="Button__SeparatorDot"></span>'+
			'<span data-money-convertible="">' +MoneyFormat(Money)+ ' VNĐ</span>'+
			'</button>'+
			'<div class="Cart__OffscreenNoteContainer" aria-hidden="true">'+
			'<span class="Cart__NoteButton">Thêm ghi chú</span>'+
			'<div class="Form__Item">'+
			'<textarea class="Cart__Note Form__Textarea" name="note" id="cart-note" rows="3" placeholder="Chúng tôi có thể giúp gì cho bạn?" data-scrollable=""></textarea>'+
			'</div>'+

			'<button type="button" class="Button Button--primary Button--full" data-action="toggle-cart-note">Lưu</button>'+
			'</div>';
			$('.Cart__Footer').html(Footer);
			$('.Header__CartCount').html(CountItem);
			$('.QuantitySelector__CurrentQuantity').on('change',function() {
				UpdateCartItemQuantity();
			});
			$('.CartItem__Remove').on('click',function() {
				UpdateQuantityBtnHandle($(this).attr('data-line-id'), 0, $(this).attr('size'));
			})
			$('.QuantitySelector__Button').on('click',function(e) {
				e.preventDefault();
				UpdateQuantityBtnHandle($(this).attr('data-line-id'), $(this).attr('data-quantity'), $(this).attr('size'));
			})
		}else{
			$('.Header__CartCount').html(0);
			$('.Cart__ItemList').html("");
			$('.Cart__Footer').html("");
			$('.Cart__Empty').html('Giỏ hàng của bạn đang trống!');
		}
	}
}
function UpdateQuantityBtnHandle(product_code, quantity, size) {

	let minusSelector = $('#minus-'+product_code);
	let addSelector = $('#add-'+product_code);
	let CurrentCart = JSON.parse(localStorage.getItem('Cart'));
	for (var i = CurrentCart.length - 1; i >= 1; i--) {
		if(product_code == CurrentCart[i].product_code && size == CurrentCart[i].size){
			CurrentCart[i].value = quantity;
		}
	}
	localStorage.setItem('Cart',JSON.stringify(CurrentCart));

	$(".QuantitySelector__CurrentQuantity").val(quantity);
	minusSelector.attr('data-quantity',quantity - 1);
	addSelector.attr('data-quantity',quantity + 1);
	minusSelector.attr('title','Đưa số lượng về '+(quantity-1));
	addSelector.attr('title','Đưa số lượng lên '+(quantity+1));
	DeleteCartItem();
}

function loadingBar25() {
	$('.LoadingBar').css({'width':'25%','opacity': 1 });
}
function loadingBar50() {
	$('.LoadingBar').css({'width':'50%','opacity': 1 });
}
function loadingBar75() {
	$('.LoadingBar').css({'width':'75%','opacity': 1 });
}
function loadingBar100() {
	$('.LoadingBar').css({'width':'100%','opacity': 1 });
	setTimeout(function(){ $('.LoadingBar').css({'width':'100%','opacity': 0 }); }, 400);
	setTimeout(function(){ $('.LoadingBar').css({'width':'0%','opacity': 0 }); }, 400);
}
function MoneyFormat(Money) {
	let str = Money.toString().split('').reverse();
	let rs = [];
	let count = 0;
	for(let i = 0; i < str.length; i++){
		if(count == 3){
			rs.push(',');
			count = 0;
			i--;
		}else{
			rs.push(str[i]);
			count++;
		}
	}
	rs = rs.reverse().join("");
	return rs;
}
