<?php

namespace App\Http\Controllers\Admin;

use App\User;
use App\Category;
use App\Http\Requests\InsertCategoryRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class CategoryManagementController extends Controller
{

    public function __construct()
    {
        $this->middleware('admin');
    }

    public function Index()
    {
        return view('Admin.ListCategory', ['categories' => $this->_2LevelCategory() ]);
    }

    public function InsertForm()
    {
        $categories = Category::where('parent_id',null)->get();
        return view('Admin.InsertCategory', ['categories' => $categories]);
    }
//Chưa xong
    public function Get($id)
    {
        $category = Category::where('id', $id)->first();
        $subCategories = ($category->Childs()->count() != 0) ? $category->Childs() : "";
        echo "Phần này sẽ hiển thị danh mục - cùng danh mục con(Nếu có) - sản phẩm có trong danh mục đó";
        return view('Admin.GetCategory',['category' => $category, 'child' => $subCategories]);
    }

    public function Delete($id)
    {
        echo "Phần này sẽ xóa hết danh mục con (Nếu có). Xóa quan hệ trong bảng quan hệ - Delay do chưa có bảng quan hệ";
    }
//End chưa xong
    public function Create(InsertCategoryRequest $rq)
    {
        if($rq->parent_id != ""){
            $parentCategory = Category::whereRaw('parent_id IS NULL AND id = '.$rq->parent_id)->select('parent_id');
            if($parentCategory->get()->count() == 0) return redirect()->back()->withErrors("Danh mục cha không tồn tại!");
            Category::create([
                'link' => $this->ConvertVi2En($rq->name),
                'parent_id' => $rq->parent_id,
                'name'  => $rq->name
            ]);
        }
        else
        {
            Category::create([
                'link' => $this->ConvertVi2En($rq->name),
                'parent_id' => null,
                'name'  => $rq->name
            ]);
        }
        return redirect()->to('quanly/danhmuc')->with("Success",'Thêm danh mục '.$rq->name.' thành công!');
    }

    public static function _2LevelCategory()
    {
        $categories = Category::all();
        $result = [];
        $unset = [];
        foreach ($categories as $key => $cat) {
            $subCat = [];
            foreach ($categories as $k => $c) {
                if($cat->id == $c->parent_id){
                    array_push($subCat, array('id' => $c->id, 'name' => $c->name, 'link' => $c->link));
                    array_push($unset,$k);
                }
            }
            if(count($subCat)!=0){
                array_push($result, array('id' => $cat->id, 'link' => $cat->link, 'name' => $cat->name, 'sub' => $subCat));
            }else{
                array_push($result, array('id' => $cat->id, 'link' => $cat->link, 'name' => $cat->name));
            }
        }
        foreach ($unset as $del) {
            unset($result[$del]);
        }
        return $result;
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