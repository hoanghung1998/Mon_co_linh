<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username'          => 'required|max:100|min:6|unique:ec_user,username',
            'name'              => 'required|max:150|regex:/^[\pL\s\-]+$/u',
            'password'          => 'required|max:32|min:6',
            'password-confirm'  => 'required|same:password',
            'phone'             => ['required','regex:/[(]+[+]+[8]+[4]+[)]+\s+([0-9]{3})+\s+([0-9]{3})+\s+([0-9]{3})/','max:17'],
            'address'           => 'required|min:30'
        ];
    }
    public function messages()
    {
        return [
            'required'          => ':attribute chưa được nhập',
            'max'               => ':attribute thừa ký tự',
            'unique'            => ':attribute đã tồn tại',
            'same'              => 'Nhập lại mật khẩu không đúng',
            'min'               => ':attribute không đủ ký tự',
            'address.min'       => 'Vui lòng nhập đầy đủ địa chỉ',
            'regex'             => ':attribute không đúng định dạng'
        ];
    }
    public function attributes()
    {
        return [
            'username'          => 'Tên đăng nhập',
            'name'                 => 'Tên người dùng',
            'password'             => 'Mật khẩu',
            'password-confirm'     => 'Nhập lại mật khẩu',
            'phone'                => 'Số điện thoại',
            'address'              => 'Địa chỉ'
        ];
    }
}
