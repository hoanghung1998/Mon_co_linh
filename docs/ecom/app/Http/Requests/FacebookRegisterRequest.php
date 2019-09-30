<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FacebookRegisterRequest extends FormRequest
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
            'phone'             => ['required','regex:/[(]+[+]+[8]+[4]+[)]+\s+([0-9]{3})+\s+([0-9]{3})+\s+([0-9]{3})/','max:17'],
            'address'           => 'required|min:30',
            'provider_id'       => 'exists:ec_user,provider_id'
        ];
    }
    public function messages()
    {
        return [
            'required'          => ':attribute chưa được nhập',
            'max'               => ':attribute thừa ký tự',
            'min'               => ':attribute không đủ ký tự',
            'address.min'       => 'Vui lòng nhập đầy đủ địa chỉ',
            'regex'             => ':attribute không đúng định dạng',
            'exists'            => ':attribute không đúng'
        ];
    }
    public function attributes()
    {
        return [
            'phone'                => 'Số điện thoại',
            'address'              => 'Địa chỉ',
            'provider_id'          => 'Tài khoản mạng xã hội'
        ];
    }
}
