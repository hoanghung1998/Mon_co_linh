<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('Shop.Index');
});
Route::get('/test', function () {

    // $config = DB::table('ec_config')->first()->config;
    // $c = json_decode($config,true);
    // $c['product']["size_chart_note"] = "Note size chart";
    // DB::table("ec_config")->where('config',$config)->update(['config'=>json_encode($c)]);
});

Route::group(['prefix'	=> 'san-pham'],function()
{
	Route::get('/{link?}','Shop\ProductController@Get');

    Route::post('check-size','Shop\SizeController@CheckSize');
});

Route::group(['prefix'	=> 'quanly'],function(){
	Route::get('/','Admin\IndexController@Index');

    Route::group(['prefix' => 'caidat'],function()
    {
       Route::get('/','Admin\SettingController@Index');

       Route::get('/common',function(){return redirect('quanly/caidat');});
       Route::post('/common','Admin\SettingController@Common'); 

       Route::get('/product',function(){return redirect('quanly/caidat');});
       Route::post('/product','Admin\SettingController@Product'); 
    });

    Route::group(['prefix' => 'size'],function()
    {
        Route::get('/','Admin\SizeManagementController@Index');
        Route::get('them', 'Admin\SizeManagementController@InsertForm');
        Route::post('them', 'Admin\SizeManagementController@Create');
        Route::get('xoa/',function(){return redirect()->to('quanly/size');});
        Route::get('xoa/{id?}','Admin\SizeManagementController@Delete');
    });
    
    Route::group(['prefix' => 'sanpham'],function()
    {
        Route::get('/','Admin\ProductManagementController@Index');

        Route::get('them','Admin\ProductManagementController@InsertForm');
        Route::post('them','Admin\ProductManagementController@Create');
    });

    Route::group(['prefix' => 'danhmuc'],function()
    {
        Route::get('/','Admin\CategoryManagementController@Index');

        Route::get('chitiet/',function(){return redirect()->to('quanly/danhmuc');});
        Route::get('chitiet/{id?}','Admin\CategoryManagementController@Get');

        Route::get('them','Admin\CategoryManagementController@InsertForm');
        Route::post('them','Admin\CategoryManagementController@Create');

        Route::get('xoa',function(){return redirect()->to('quanly/danhmuc');});
        Route::get('xoa/{id?}','Admin\CategoryManagementController@Delete');
    });

    Route::group(['prefix' => 'nguoidung'],function()
    {
        Route::get('/','Admin\UserManagementController@Index');

        Route::get('capdo',function(){return redirect()->back();});
        Route::post('capdo','Admin\UserManagementController@ChangeLevel');

        Route::get('chitiet', function(){return redirect()->back();});
        Route::get('chitiet/{id?}', 'Admin\UserManagementController@GetUserInformation');

        Route::get('xoa', function(){return redirect()->back();});
        Route::get('xoa/{id?}', 'Admin\UserManagementController@DeleteUser');
    }); 
});

Route::group(['prefix'  =>'/taikhoan'],function(){
    Route::get('/','Auth\LoginController@Index');
    Route::post('/','Auth\LoginController@Login');

    Route::get('thongtin','Auth\UserController@Index');
    Route::post('thongtin','Auth\UserController@Update');

    Route::get('doimatkhau','Auth\UserController@UpdatePasswordForm');
    Route::post('doimatkhau','Auth\UserController@UpdatePassword');

    Route::get('quenmatkhau',function(){return redirect()->to('taikhoan');});
    Route::post('quenmatkhau','Auth\ForgotPasswordController@RecoverPassword');

    Route::get('dangky','Auth\RegisterController@Index');
    Route::post('dangky','Auth\RegisterController@Create')->name('Register');
    Route::post('dangky/facebook','Auth\FacebookAuthController@Create')->name('Facebook.Register');
    Route::get('dangky/facebook','Auth\FacebookAuthController@RedirectToProvider')->name('Facebook.Get');
    Route::get('dangky/facebook/callback', 'Auth\FacebookAuthController@HandleProviderCallback');

    Route::get('/logout',function(){ Auth::logout(); return redirect()->to('/');});
});