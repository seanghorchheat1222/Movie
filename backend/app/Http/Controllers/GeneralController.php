<?php

namespace App\Http\Controllers;

use App\Models\General;
use App\Http\Requests\StoreGeneralRequest;
use App\Http\Requests\UpdateGeneralRequest;
use Illuminate\Http\Request;


class GeneralController extends Controller
{
    public function index(Request $request)
    {
        $query = General::query()->latest();

        if ($request->search) {
            $query = General::where('name', 'like', '%' . $request->search . '%');
        }

        $data = $query->paginate($request->per_page ?? 5);

        return response()->json([
            'status' => true,
            'data' => $data,
        ], 200);
    }

    public function store(StoreGeneralRequest $request)
    {
        $general = new General();

        $general->name = $request->name;
        $general->description = $request->description;

        $general->save();

        return response()->json([
            'status' => true,
            'data' => $general,
            'message' => "General added successfully!"
        ], 201);
    }

    public function show(General $general)
    {
        return response()->json([
            'status' => true,
            'data' => $general,
        ], 200);

    }

    public function update(UpdateGeneralRequest $request, General $general)
    {
        $general->name = $request->name;
        $general->description = $request->description;

        $general->save();

        return response()->json([
            'status' => true,
            'data' => $general,
            'message' => "General updated successfully!"
        ], 201);
    }


    public function destroy(General $general)
    {
        $general->delete();
        return response()->noContent();
    }
}
