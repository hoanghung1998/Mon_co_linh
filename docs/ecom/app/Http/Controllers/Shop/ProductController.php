<?php

namespace App\Http\Controllers\Shop;

use App\Category;
use App\Size;
use App\Product;
use App\Image;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;


class ProductController extends Controller
{

    public function __construct()
    {

    }

    public function Index()
    {

    }

    public function Get($link)
    {
        $product = Product::where('link',$link)->first();
        if($product){
            $randProducts = Product::whereRaw("1 ORDER BY RAND() LIMIT 4")->get();
            $product->update(['view' => $product->view+1]);
            $imgs = $product->Images()->orderBy('img_order','asc')->get();
            $categories = $product->Categories()->get();
            $sizes = $product->Sizes()->withPivot('amount')->get();
            $type = "";
            foreach ($categories as $key => $c) {
                if($key != $categories->count()-1){
                    $type .= $c->name.','; 
                }else{
                    $type .= $c->name;
                }
            }
            return view('Shop.Product',['product'=>$product,'imgs'=>$imgs,'categories'=>$categories, 'type' => $type,'sizes'=>$sizes, 'randProducts'=>$randProducts]);
        }
        return redirect('/san-pham');
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
}
?>