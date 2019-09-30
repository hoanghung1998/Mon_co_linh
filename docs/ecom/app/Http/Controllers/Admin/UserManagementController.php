<?php

namespace App\Http\Controllers\Admin;

use App\User;
use Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class UserManagementController extends Controller
{

    public function __construct()
    {
        $this->middleware('admin');
    }

    public function Index()
    {
    	if(Auth::user()->level < 3){
        	return redirect()->to('quanly');
        }
        $users = User::paginate(15);
        return view('Admin.UserManage', ['users' => $users]);
    }

    public function ChangeLevel(Request $rq)
    {
    	if($rq->id == "" && $rq->level == "") { echo "<script>showNotification('Dữ liệu sai!','danger')</script>"; return; }

    	if($rq->id == 0 || Auth::user()->level < 3){ echo "<script>showNotification('Bạn không có quyền sửa tài khoản này!','danger')</script>"; return; }
    	if($rq->level > 3 || $rq->level < 1){ echo "<script>showNotification('Quyền không đúng!','danger')</script>"; return; }
    	$user = User::where('id',$rq->id);
    	$user->update(['level' => $rq->level ]);
    	if ($rq->level == 1) $level = "Khách";
    	if ($rq->level == 2) $level = "Nhân viên";
    	if ($rq->level == 3) $level = "Admin";
    	echo "<script>showNotification('Sửa thành công tài khoản ".$user->first()->username." thành tài khoản ".$level."','success')</script>"; return; 
    }

    public function GetUserInformation($id)
    {
        if(Auth::user()->level < 3){
            return redirect()->to('quanly');
        }
        $user = User::where('id',$id);
        if($user->count() == 0) return redirect()->to('quanly/nguoidung')->withErrors('Tài khoản này không tồn tại');
        print_r($user->first());
    }

    public function DeleteUser($id)
    {
        if(Auth::user()->level < 3){
            return redirect()->to('quanly');
        }
        $user = User::where('id',$id);
        $userInf = $user->first();
        if($user->count() == 0) return redirect()->to('quanly/nguoidung')->withErrors('Tài khoản này không tồn tại');
        if($userInf->level > 2){
            return redirect()->back()->withErrors('Không thể xóa tài khoản Admin');
        }else{
            $user->delete();
            return redirect()->back()->with("Success","Xóa thành công tài khoản ".$userInf->username);
        }
    }
}
?>