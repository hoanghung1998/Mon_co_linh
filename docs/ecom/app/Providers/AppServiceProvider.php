<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use DB;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        view()->composer('Admin.Setting',function ($view)
        {
            $config = json_decode(DB::table('ec_config')->first()->config);
            $view->with('config',$config);
        });
        view()->composer('Widget',function($view)
        {
            $config = json_decode(DB::table('ec_config')->first()->config);
            $view->with('config',$config->common);
        });
        View()->composer('Shop.Product',function($view)
        {
            $config = json_decode(DB::table('ec_config')->first()->config);
            $view->with('config',$config->product);
        });
    }
}
