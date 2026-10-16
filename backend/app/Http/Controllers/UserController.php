<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::latest()->select(['id', 'name', 'email', 'role']);

        if ($request->search) {
            $data = $query->where('name', 'LIKE', '%' . $request->search . '%');
        }

        $data = $query->paginate($request->per_page ?? 5);

        return response()->json([
            'status' => true,
            'data' => $data
        ], 200);
    }

    public function getUserWatchList(Request $request)
    {
        $data = User::with(['watchLists.movie'])->where('id', $request->id)->get()->first();

        return response()->json([
            'status' => true,
            'data' => $data
        ], 200);
    }

    public function createAccount(Request $request)
    {
        $checked = User::where('email', $request->email)->first();
        
        if($checked){
            return response()->json([
                'status' => false,
                'message' => 'Email already exit!'
            ], 409);
        }

        $user = new User();

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role = 'user';
        $user->email_verified_at = Carbon::now();

        $user->save();

        return response()->json([
            'status' => true,
            'data' => $user,
            'message' => 'Successfull!'
        ], 200);

    }
}
