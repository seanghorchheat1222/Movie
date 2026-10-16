<?php

namespace App\Http\Controllers;

use App\Models\UserWatchlist;
use App\Http\Requests\StoreUserWatchlistRequest;
use Illuminate\Http\Request;

class UserWatchlistController extends Controller
{

    public function index()
    {
 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserWatchlistRequest $request)
    {  
        $userWatchList = new UserWatchlist();

        $userWatchList->user_id = $request->user_id;
        $userWatchList->movie_id = $request->movie_id;

        $userWatchList->save();

        return response()->json([
            'status' => true,
            'data' => $userWatchList,
            'message' => 'userWatchList added successfully!'
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserWatchlist $userWatchlist, Request $request)
    {   
        // dd($request->id);
        $watchList =  $userWatchlist->where('id', $request->id)->first();

        if(!$watchList){
           return response()->json([
            'status' => false,
            'message' => "WatchList not found!"
           ], 404);
        }
 
        $userWatchlist->where('id', $request->id)->delete();

        return response()->noContent();
    }
}
