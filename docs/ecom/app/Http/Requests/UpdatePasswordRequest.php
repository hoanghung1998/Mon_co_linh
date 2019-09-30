<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePasswordRequest extends FormRequest
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
            'oldPassword'   => 'required|min:6|max:32',
            'newPassword'   => 'required|min:6|max:32',
            'confirmPassword'   => 'same:newPassword'
        ];
    }
    public function messages()
    {
        return [
            'required'          => ':attribute chưa được nhập',
            'max'               => ':attribute thừa ký tự',
            'min'               => ':attribute không đủ ký tự',
            'same'              => 'Nhập lại mật khẩu không khớp'
        ];
    }
    public function attributes()
    {
        return [
            'oldPassword'   => 'Mật khẩu cũ',
            'newPassword'   => 'Mật khẩu mới',
            'confirmPassword'   => 'Xác nhận mật khẩu mới'
        ];
    }
}
