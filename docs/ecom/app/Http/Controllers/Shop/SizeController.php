<?php

namespace App\Http\Controllers\Shop;

use App\Size;
use DB;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class SizeController extends Controller
{

    public function __construct()
    {

    }

    public function Index()
    {

    }

    public function CheckSize(Request $rq)
    {
        $pro_id = !empty($rq->pro_id) ? $rq->pro_id : 0;
        $amount = DB::table('ec_prosize_relationship')->whereRaw("size_id = ".$rq->size_id." AND product_id = ".$pro_id."")->first();
        $amount = $amount ? $amount->amount : 0;
        if($amount != 0 || $rq->size_id == 0){
            echo '<div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                                <button type="submit" class="ProductForm__AddToCart Button Button--secondary Button--full" data-action="add-to-cart">
                                    <span>Thêm vào giỏ hàng</span>
                                </button>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt2-sm">
                                <button type="submit" class="ProductForm__AddToCart Button Button--secondary Button--full" data-action="add-to-wishlist">
                                    <span>Lưu</span>
                                </button>
                            </div>

                        </div>
                        <div data-shopify="payment-button" class="shopify-payment-button">
                            <button type="submit" class="shopify-payment-button__button shopify-payment-button__button--unbranded" data-action="add-to-cart">
                                <span>Mua ngay</span>
                            </button>
                        </div>
                       <script> $(".ProductForm__AddToCart").on("click",function(e) {
        e.preventDefault();
        AddCart();
    });</script>';
        }else{
            echo '<div class="row">
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                <button type="submit" class="ProductForm__AddToCart Button Button--secondary Button--full" data-action="add-to-cart" disabled="true">
                                    <span>Hết hàng</span>
                                </button>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <button type="submit" class="ProductForm__AddToCart Button Button--secondary Button--full" data-action="add-to-wishlist">
                                    <span>Lưu</span>
                                </button>
                            </div>

                        </div>';
        }
    }
}
?>