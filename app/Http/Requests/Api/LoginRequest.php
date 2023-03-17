<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
            'email' => 'required|email',
            'password' => 'required',
        ];
    }

    public function attributes()
    {
        return [
            'email' => 'User Email',
            'password' => 'User Password',
        ];
    }

    public function messages()
    {
        return [
            'required' => 'The :attribute is required',
            'email' => 'The :attribute must be a valid email address',
        ];
    }

}
