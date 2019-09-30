<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RecoverPasswordRequest extends FormRequest
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
            'username'          => 'required|max:100|min:6|exists:ec_user,username',
            'phone'             => ['required','regex:/[(]+[+]+[8]+[4]+[)]+\s+([0-9]{3})+\s+([0-9]{3})+\s+([0-9]{3})/','max:17','exists:ec_user,phone'],
        ];
    }
    public function messages()
    {
        return [
            'required'          => ':attribute chưa được nhập',
            'max'               => ':attribute thừa ký tự',
            'exists'            => ':attribute không tồn tại',
            'min'               => ':attribute không đủ ký tự',
            'regex'             => ':attribute không đúng định dạng'
        ];
    }
    public function attributes()
    {
        return [
            'username'          => 'Tên đăng nhập',
            'phone'                => 'Số điện thoại',
        ];
    }
}
