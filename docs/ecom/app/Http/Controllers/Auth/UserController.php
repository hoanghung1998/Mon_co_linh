<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Auth;
use App\Http\Requests\UpdateUserInformationRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

	public function __construct()
	{
		$this->middleware('customer');
	}

	public function Index()
	{
		return view('Auth.UserInformation');
	}

	public function Update(UpdateUserInformationRequest $rq)
	{
		$user = Auth::user();

		if($rq->address == $user->address && $rq->name == $user->name && $rq->phone == $user->phone){return redirect()->back()->withErrors('Bạn không thay đổi thông tin nào!');}
		User::where('id',Auth::user()->id)->update(['name'=>$rq->name,'phone'=>$rq->phone,'address'=>$rq->address]);
		return redirect()->back()->with('Message','Thay đổi thông tin tài khoản thành công!');
	}

	public function UpdatePasswordForm()
	{
		return view('Auth.UpdatePasswordForm');
	}

	public function UpdatePassword(UpdatePasswordRequest $rq)
	{
		if(Auth::user()->provider_id) return redirect()->to('taikhoan/thongtin');
		if (!Hash::check($rq->oldPassword, Auth::user()->password)) {
			return redirect()->back()->withErrors('Mật khẩu cũ không đúng!');
		}
		User::where('id',Auth::user()->id)->update(['password'=>Hash::make($rq->newPassword)]);
		return redirect()->to('taikhoan/thongtin')->with('Message','Thay đổi mật khẩu thành công!');
	}
}
?>