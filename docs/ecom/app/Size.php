<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    protected $table = "ec_size";
    public $timestamps = false;
    protected $fillable = [
        'id','name'
    ];
}
