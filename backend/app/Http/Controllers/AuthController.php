<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{   

    public function login(Request $request){
        $credentails = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $credentails['email'])->first();

        if(!$user || !Hash::check($credentails['password'], $user->password)){
            return response()->json([
                'message' => "Invalid email or password",
            ], 401);
        };

        $token = $user->createToken(
            'movies-browser', 
            ['*'], 
            now()->addHours(8),
            )->plainTextToken;

        return response()->json(['token' => $token]);
    }

    public function currentUser(Request $request){
        return response()->json(
            $request->user()->only(['id', 'name', 'email', 'role'])
        );
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->noContent();
    }
}
