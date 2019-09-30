<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Product extends Model
{
    protected $table = "ec_product";
    public $timestamps = false;
    protected $fillable = [
        'id','name','product_code','link','view','price','sale_price','content','description','keyword','created_at'

    ];

    public function Images()
    {
    	return $this->hasMany('App\Image');
    }
    public function Categories()
    {
    	return $this->belongstoMany('App\Category', 'ec_procat_relationship');
    }

    public function Sizes()
    {
    	return $this->belongstoMany('App\Size', 'ec_prosize_relationship');
    }

    public function AddSizes($sizesToInsert)
    {
        foreach ($sizesToInsert as $s) {
            DB::table('ec_prosize_relationship')->insert(['product_id' => $this->id, 'size_id' => $s['size'], 'amount' => $s['amount']]);
        }
    }

    public function AddCategories($categories)
    {
        foreach ($categories as $cat) {
            DB::table('ec_procat_relationship')->insert(['product_id' => $this->id, 'category_id' => $cat]);
        }
    }

    public function GetFirstImage()
    {
        return $this->hasMany('App\Image')->where('img_order',1)->first();
    }

    public function GetSecondImage()
    {
        return $this->hasMany('App\Image')->where('img_order',2)->first();
    }
}
