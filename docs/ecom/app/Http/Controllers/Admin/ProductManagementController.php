<?php

namespace App\Http\Controllers\Admin;

use App\Category;
use App\Size;
use App\Product;
use App\Image;

use App\Http\Requests\InsertProductRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class ProductManagementController extends Controller
{

    public function __construct()
    {
        $this->middleware('admin');
    }

    public function Index()
    {
        return view('Admin.ListProduct',[ 'products' => Product::all() ]);
    }

    public function InsertForm()
    {
        return view('Admin.InsertProduct',['categories'=>$this->_2LevelCategory(), 'sizes' => Size::all()]);
    }

    //Chưa xong
    public function Get($id)
    {

    }

    public function Delete($id)
    {
 
    }

    //End chưa xong

    public function Create(InsertProductRequest $rq)
    {
        $price = $this->GetMoneyToInsert($rq->price);
        $sale_price = $this->GetMoneyToInsert($rq->sale_price);
        if($sale_price >= $price){return redirect()->back()->withErrors('Giá khuyến mãi không thể lớn hơn giá sản phẩm!');}

        $link = $this->ConvertVi2En(str_replace(' ', '', $rq->product_code))."-".$this->ConvertVi2En($rq->name);

        if($rq->sizes != ""){
            $sizes = explode(',', $rq->sizes);
            foreach ($sizes as $s) {
                if(is_null(Size::where('id',$s)->first()) ){ return redirect()->back()->withErrors("Size không hợp lệ!");}
            }
            $amounts = explode(',', $rq->amounts);
        }else{
            $sizes = [];
            $amounts = [];
        }
        $NewProduct = Product::create([
            'name'          => $rq->name,
            'product_code'  => $rq->product_code,
            'link'          => $link,
            'price'         => $price,
            'sale_price'    => $sale_price,
            'content'       => $rq->content,
            'keyword'       => $rq->keyword,
            'description'   => $rq->description
        ]);
        
        $sizeToInsert = [];
        if(!empty($sizes)){
            foreach ($sizes as $i => $s) {
                $amount = (empty($amounts[$i]) || $amounts[$i] < 0) ? 0 : $amounts[$i];
                array_push($sizeToInsert, array('size' => $s, 'amount' => $amount));
            }
            $NewProduct->AddSizes($sizeToInsert);
        }
        
        $NewProduct->AddCategories($rq->categories);
        
        $f = 0;
        foreach ($rq->img as $img) {
            if($img->getClientOriginalName() == $rq->define_img_1) $f++;
            if($img->getClientOriginalName() == $rq->define_img_2) $f++;
        }
        if($f != 2) return redirect()->back()->withErrors('Ảnh đại diện không có trong danh sách ảnh!');

        $f = 3;
        foreach($rq->img as $img){
            //uploads
            $imgName = time().'-'.$img->getClientOriginalName();
            $img->move(public_path('uploads/'.$link), $imgName);
            $imgLink = 'uploads/'.$link.'/'.$imgName;
            //end upload
            if($img->getClientOriginalName() == $rq->define_img_1){
                Image::create([
                    'link'  => $imgLink,
                    'product_id'    => $NewProduct->id,
                    'img_order'     => 1
                ]);
            }
            elseif($img->getClientOriginalName() == $rq->define_img_2){
                Image::create([
                    'link'  => $imgLink,
                    'product_id'    => $NewProduct->id,
                    'img_order'     => 2
                ]);
            }else{
                Image::create([
                    'link'  => $imgLink,
                    'product_id'    => $NewProduct->id,
                    'img_order'     => $f
                ]);
                $f++;
            }
        }

        return redirect()->to('quanly/sanpham/them')->with('Success','Thêm thành công sản phẩm '.$rq->name);
    }

    private function _2LevelCategory()
    {
        $categories = Category::all();
        $result = [];
        $unset = [];
        foreach ($categories as $key => $cat) {
            $subCat = [];
            foreach ($categories as $k => $c) {
                if($cat->id == $c->parent_id){
                    array_push($subCat, array('id' => $c->id, 'name' => $c->name));
                    array_push($unset,$k);
                }
            }
            if(count($subCat)!=0){
                array_push($result, array('id' => $cat->id, 'name' => $cat->name, 'sub' => $subCat));
            }else{
                array_push($result, array('id' => $cat->id, 'name' => $cat->name));
            }
        }
        foreach ($unset as $del) {
            unset($result[$del]);
        }
        return $result;
    }

    private function GetMoneyToInsert($string)
    {
        $string = explode(' ', $string);
        if(isset($string[1])){ return (int)str_replace(',', '', $string[1]);}
        return 0;
    }

    private function ConvertVi2En($str) 
    {
        $str = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/", 'a', $str);
        $str = preg_replace("/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/", 'e', $str);
        $str = preg_replace("/(ì|í|ị|ỉ|ĩ)/", 'i', $str);
        $str = preg_replace("/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/", 'o', $str);
        $str = preg_replace("/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/", 'u', $str);
        $str = preg_replace("/(ỳ|ý|ỵ|ỷ|ỹ)/", 'y', $str);
        $str = preg_replace("/(đ)/", 'd', $str);
        $str = preg_replace("/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/", 'A', $str);
        $str = preg_replace("/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/", 'E', $str);
        $str = preg_replace("/(Ì|Í|Ị|Ỉ|Ĩ)/", 'I', $str);
        $str = preg_replace("/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/", 'O', $str);
        $str = preg_replace("/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/", 'U', $str);
        $str = preg_replace("/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/", 'Y', $str);
        $str = preg_replace("/(Đ)/", 'D', $str);
        $str = str_replace(" ", "-", str_replace("&*#39;","",$str));
        $str = str_replace("   ", "-", str_replace("&*#39;","",$str));
        $str = str_replace("  ", "-", str_replace("&*#39;","",$str));
        $str = str_replace('------', '-', $str);
        $str = str_replace('-----', '-', $str);
        $str = str_replace('----', '-', $str);
        $str = str_replace('---', '-', $str);
        $str = str_replace('--', '-', $str);
        $str = trim($str,'-');
        return strtolower($str);
    }
}
?>