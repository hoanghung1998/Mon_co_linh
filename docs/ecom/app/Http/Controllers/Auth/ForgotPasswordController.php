<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Requests\RecoverPasswordRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class ForgotPasswordController extends Controller
{

    public function __construct()
    {
        $this->middleware('guest');
    }

    public function RecoverPassword(RecoverPasswordRequest $rq)
    {
    	$user = User::whereRaw("username ='".$rq->username."' AND phone ='".$rq->phone."' AND provider_id IS NULL");
    	if($user->get()->count() == 0){
    		return redirect()->back()->with("Message","Thông tin tài khoản cần phục hồi không đúng!");
    	}else{
    		$newPw = $this->CreateRandomPassword();
    		$user->update(['password'=>Hash::make($newPw)]);
    		return redirect()->back()->with("Message","Mật khẩu đăng nhập mới của bạn là : <b>".$newPw."</b>");
    	}
    }
    private function CreateRandomPassword()
    {
    	return substr(md5(mt_rand()), 0, 10);
    }
}
?>