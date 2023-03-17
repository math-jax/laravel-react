<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Requests\Api\SignupRequest;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $inputArr = $request->only(['name', 'email', 'password']);
        $inputArr['password'] = bcrypt($inputArr['password']);
        $user = User::create($inputArr);
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'status' => 200,
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function login(LoginRequest $request)
    {
        $inputArr = $request->only(['email', 'password']);

        if(!Auth::attempt($inputArr)){
            return response()->json([
                'message' => 'Email or password is incorrect',
            ], 422);
        }
        $user = User::find(Auth::id());
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'status' => 200,
            'user' => $user,
            'token' => $token,
        ]);

    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response(
            '',
            204
        );
    }
}
