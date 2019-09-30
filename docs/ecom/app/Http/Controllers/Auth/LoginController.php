<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Auth;

use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{

    public function __construct()
    {
        $this->middleware('guest');
    }

    public function Index()
    {
        return view('Auth.Login');
    }
    
    public function Login(LoginRequest $rq)
    {
    	 if (Auth::attempt(['username' => $rq->username, 'password' => $rq->password], true)){
    	 	return redirect()->to('/');
    	 }else{
    	 	return redirect()->back()->withErrors('Sai mật khẩu!');
    	 }
    }
}
?>