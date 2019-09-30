<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\FacebookRegisterRequest;
use App\User;
use App\Http\Controllers\Controller;
use Socialite;
use Exception; 
use Auth;


class FacebookAuthController extends Controller
{
	public function RedirectToProvider()
	{
		return Socialite::driver('facebook')->redirect();
	}

	public function HandleProviderCallback()
	{
		try {
			$user = Socialite::driver('facebook')->user();
		} catch (\Exception $e) {
			return redirect()->to('taikhoan/dangKy')->withErrors('Xuất hiện lỗi không mong muốn, vui lòng thử lại!');
		}
		if(!$this->IfExist($user->id)){
			User::create([
				'username'  => 'fb-user: '.$user->id,
				'name'      => $user->name,
				'password'  => $user->token,
				'provider_id'	=> $user->id,
				'phone'     => "",
				'address'   => "",
				'level'     => 1,
				'created_at'=> now()
			]);
			return view('Auth/FacebookRegister')->with('fb_user',$user);
		}elseif(
			!$this->CheckInfo($user->id)){
			return view('Auth/FacebookRegister')->with('fb_user',$user);
		}else{
			Auth::login(User::where('provider_id',$user->id)->first(), true);
			return redirect()->to('/');
		}
	}

	public function Create(FacebookRegisterRequest $rq)
	{
		User::where('provider_id',$rq->provider_id)->update(['address'=>$rq->address,'phone'=>$rq->phone]);
		Auth::login(User::where('provider_id',$rq->provider_id)->first(), true);
		 return redirect()->to('/');
	}

	private function IfExist($provider_id)
	{
		if(User::where('provider_id',$provider_id)->get()->count() != 0) return true;
		else return false;
	}

	private function CheckInfo($provider_id)
	{
		if(User::where('provider_id',$provider_id)->first()->address != "" && User::where('provider_id',$provider_id)->first()->phone != "") return true;
		else return false;
	}
}
