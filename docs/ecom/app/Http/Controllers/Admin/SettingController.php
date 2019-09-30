<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
class SettingController extends Controller
{

	public function __construct()
	{
		$this->middleware('admin');
	}

	public function Index()
	{
		return view('Admin.Setting');
	}
	public function Common(Request $rq)
	{
		$row = DB::table("ec_config")->first()->config;
		$configArr = json_decode($row);

		$commonConfig = $configArr->common;
		$commonConfig->facebook->facebook_name = $rq->facebook_name;
		$commonConfig->facebook->facebook_link = $rq->facebook_link;
		$commonConfig->banner = $rq->banner;
		$commonConfig->meta_description = $rq->meta_description;
		$commonConfig->meta_keyword = $rq->meta_keyword;
		$commonConfig->shop_intro = $rq->shop_intro;

		DB::table("ec_config")->where('config',$row)->update(['config'=>json_encode($configArr)]);
		return;
	}

	public function Product(Request $rq)
	{
		$row = DB::table("ec_config")->first()->config;
		$configArr = json_decode($row);

		$productConfig = $configArr->product;
		$productConfig->shipping = $rq->shipping;
		$productConfig->policy = $rq->policy;
		$productConfig->size_chart = $rq->size_chart;

		DB::table("ec_config")->where('config',$row)->update(['config'=>json_encode($configArr)]);
		return;
	}
}
?>