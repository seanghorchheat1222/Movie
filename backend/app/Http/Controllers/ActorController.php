<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use App\Http\Requests\StoreActorRequest;
use App\Http\Requests\UpdateActorRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\String\TruncateMode;

class ActorController extends Controller
{
    public function index(Request $request)
    {
        $query = Actor::query()->latest();

        if ($request->search) {
            $query = Actor::where('name', 'like', '%' . $request->search . '%');
        }

        $data = $query->paginate($request->per_page ?? 5);

        return response()->json([
            'status' => true,
            'data' => $data,
        ], 200);
    }

    public function store(StoreActorRequest $request)
    {
        $actor = new Actor();

        $actor->name = $request->name;
        $actor->age = $request->age;
        $actor->description = $request->description;
        $actor->image = $request->file('image')?->store('actors', 'public');

        $actor->save();

        return response()->json([
            'status' => true,
            'data' => $actor,
            'message' => 'Actor added successfully!'
        ], 201);
    }

    public function show(Actor $actor)
    {
        return response()->json([
            'status' => true,
            'data' => $actor,
        ], 200);

    }


    public function update(UpdateActorRequest $request, Actor $actor)
    {
        $actor->name = $request->name;
        $actor->age = $request->age;
        $actor->description = $request->description;
        $actor->updated_at = now();

        if ($request->file('image')) {
            if ($actor->image) {
                Storage::disk('public')->delete($actor->image);
            }
            $actor->image = $request->file('image')?->store('actors', 'public');
        }

        $actor->save();

        return response()->json([
            'status' => true,
            'data' => $actor,
            'message' => 'Actor updated successfully!'
        ], 200);
    }

    public function destroy(Actor $actor)
    {
        $actor->delete();
        if ($actor->image) {
            Storage::disK('public')->delete($actor->image);
        }

        return response()->noContent();
    }
}
