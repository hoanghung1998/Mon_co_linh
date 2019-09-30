<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Auth;

use App\Http\Requests\RegisterRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{

    public function __construct()
    {
        $this->middleware('guest');
    }

    public function Index()
    {
        return view('Auth.Register');
    }
    public function Create(RegisterRequest $rq)
    {
        User::create([
            'username'  => $rq->username,
            'name'      => $rq->name,
            'password'  => Hash::make($rq->password),
            'phone'     => $rq->phone,
            'address'   => $rq->address,
            'level'     => 1,
            'created_at'=> now()
        ]);
        return redirect()->to('taikhoan')->with('Message','Đăng ký thành công! <br> Giờ bạn đã có thể sử dụng tài khoản '.$rq->username);
    }
}
?>