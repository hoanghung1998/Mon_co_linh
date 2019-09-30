<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = "ec_category";
    public $timestamps = false;
    protected $fillable = [
        'id','name','parent_id','link'
    ];

    public function Childs()
    {
        return $this->where('parent_id',$this->id)->get();
    }
    public function Parent()
    {
        $parent = $this->where('id',$this->parent_id)->first();
        if(!$parent){return $this;}
        return $parent;
    }

    public function Products()
    {
        return $this->belongstoMany('App\Product', 'ec_procat_relationship');
    }
}
