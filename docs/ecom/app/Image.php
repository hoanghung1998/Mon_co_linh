<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $table = "ec_img";
    public $timestamps = false;
    protected $fillable = [
        'id','link','product_id','img_order',


    ];
}
