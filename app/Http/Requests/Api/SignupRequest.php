<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class SignupRequest extends FormRequest
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
        $id = request()->get('id');
        $id_Check = isset($id) ? ','.$id : null;
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email'.$id_Check,
            'password' => 'required|confirmed|min:5',
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'User Name',
            'email' => 'User Email',
            'password' => 'User Password',
        ];
    }

    public function messages()
    {
        return [
            'required' => 'The :attribute is required',
            'string' => 'The :attribute must be a string',
            'unique' => 'The :attribute has already been taken',
            'email' => 'The :attribute must be a valid email address',
            'min' => 'The :attribute must be at least :min characters long',
            'max' => 'The :attribute may not be greater than :max characters long',
        ];
    }
}
