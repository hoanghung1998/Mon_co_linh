<?php

namespace App\Http\Controllers\Admin;

use App\User;
use Auth;

use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class IndexController extends Controller
{

    public function __construct()
    {
        $this->middleware('admin');
    }

    public function Index()
    {
        return view('Admin.Index');
    }
}
?>