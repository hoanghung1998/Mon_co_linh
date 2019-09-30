<?php

namespace App\Http\Controllers\Admin;

use App\Size;
use DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\InsertSizeRequest;

class SizeManagementController extends Controller
{

    public function __construct()
    {
        $this->middleware('admin');
    }

    public function Index()
    {
        return view('Admin.ListSize',[ 'sizes' => Size::all() ]);
    }

    public function InsertForm()
    {
        return view('Admin.InsertSize');
    }

    public function Get($id)
    {
        
    }

    public function Delete($id)
    {
        DB::table('ec_prosize_relationship')->where('size_id',$id)->delete();
        Size::where('id',$id)->delete();
        return redirect()->back()->with('Success',"Xóa thành công!");
    }

    public function Create(InsertSizeRequest $rq)
    {
       Size::create(['name' => $rq->name]);
       return redirect()->back()->with('Success',"Thêm size ".$rq->name." thành công!");
    }
}
?>