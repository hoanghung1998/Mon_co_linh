<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InsertSizeRequest extends FormRequest
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
            'name'              => 'required|max:10|unique:ec_size,name'
        ];
    }
    public function messages()
    {
        return [
            'required'          => ':attribute chưa được nhập',
            'max'               => ':attribute thừa ký tự',
            'unique'            => ':attribute đã tồn tại',
        ];
    }
    public function attributes()
    {
        return [
            'name'              => 'Size',
        ];
    }
}
