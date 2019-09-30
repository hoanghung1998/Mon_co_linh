<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InsertProductRequest extends FormRequest
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
            'define_img_1'              => 'required',
            'define_img_2'              => 'required',
            'categories.*'              => 'required|exists:ec_category,id',
            'categories'                => 'required',
            'name'                      => 'required|max:150',
            'product_code'              => 'required|max:30|unique:ec_product,product_code',
            'price'                     => 'required',
            'content'                   => 'required',
            'description'               => 'required',
            'img'                       => 'required',
            'img.*'                     => 'image|mimes:jpeg,png,jpg,svg|max:4096'
        ];
    }
    public function messages()
    {
        return [
            'required'          => ':attribute chưa được nhập',
            'exists'            => ':attribute không tồn tại',
            'max'               => ':attribute thừa ký tự',
            'unique'            => ':attribute đã tồn tại',
            'image'             => 'Ảnh sai định dạng',
            'mimes'             => 'Ảnh sai định dạng'
        ];
    }
    public function attributes()
    {
        return [
            'define_img_1'              => 'Ảnh đại diện 1',
            'define_img_2'              => 'Ảnh đại diện 2',
            'categories.*'              => 'Danh mục',
            'categories'                => 'Các danh mục',
            'amounts'                   => 'Số lượng',
            'sizes'                     => 'Các kích cỡ',
            'description'               => 'Mô tả sản phẩm',
            'name'                      => 'Tên sản phẩm',
            'product_code'              => 'Mã sản phẩm',
            'price'                     => 'Giá sản phẩm',
            'content'                   => 'Nội dung sản phẩm',
            'img'                       => 'Hình ảnh sản phẩm',
            'img.*'                     => 'Hình ảnh'
        ];
    }
}
