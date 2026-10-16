<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Http\Requests\StoreMovieRequest;
use App\Http\Requests\UpdateMovieRequest;
use App\Models\MovieActor;
use App\Models\MovieGeneral;
use App\Models\MovieVideo;
use Illuminate\Http\Request;
use Illuminate\Session\Store;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MovieController extends Controller
{

    public function index(Request $request)
    {

        $query = Movie::with(['Category', 'movieActors.actor', 'movieGenerals.general', 'movieVideos'])->latest();

        if ($request->search) {
            $data = $query->where('title', 'LIKE', '%' . $request->search . '%');
        }

        if ($request->category_id) {
            $data = $query->where('category_id', $request->category_id);
        }

        if ($request->general_id) {
            $data = $query->whereHas('movieGenerals.general', function ($q) use ($request) {
                $q->where('id', $request->general_id);
            });
        }


        $data = $query->paginate($request->per_page ?? 5);

        return response()->json([
            'status' => true,
            'data' => $data
        ], 200);
    }

    public function store(StoreMovieRequest $request)
    {
        return DB::transaction(function () use ($request) {

            $movie = new Movie();

            $movie->category_id = $request->category_id;
            $movie->title = $request->title;
            $movie->release_date = $request->release_date;
            $movie->runtime = $request->runtime;
            $movie->description = $request->description;
            $movie->banner = $request->file('banner')?->store('banners', 'public');
            $movie->poster = $request->file('poster')?->store('posters', 'public');

            $movie->save();

            foreach ($request->actors as $actor) {
                $movieActor = new MovieActor();

                $movieActor->movie_id = $movie->id;
                $movieActor->actor_id = $actor['actor_id'];

                $movieActor->save();
            }

            foreach ($request->generals as $general) {
                $movieGeneral = new MovieGeneral();

                $movieGeneral->movie_id = $movie->id;
                $movieGeneral->general_id = $general['general_id'];

                $movieGeneral->save();
            }


            if ($request->videos) {
                foreach ($request->videos as $video) {
                    $movieVideo = new MovieVideo();

                    $movieVideo->movie_id = $movie->id;
                    $movieVideo->video = $video['video']?->store('videos', 'public');

                    $movieVideo->save();
                }
            }

            $data = $movie->with(['Category', 'movieActors.actor', 'movieGenerals.general', 'movieVideos'])->first();

            return response()->json([
                'status' => true,
                'data' => $data,
                'message' => "Movies added successfully!"
            ], 201);
        });
    }

    public function show(Request $request)
    {
        $data = Movie::with(['Category', 'movieActors.actor', 'movieGenerals.general', 'movieVideos'])->findOrFail($request->id);

        return response()->json([
            'status' => true,
            'data' => $data,
        ], 200);

    }



    public function update(UpdateMovieRequest $request, Movie $movie)
    {
        //
    }


    public function destroy(Movie $movie)
    {
        if ($movie->banner) {
            Storage::disk('public')->delete($movie->banner);
        }

        if ($movie->poster) {
            Storage::disk('public')->delete($movie->poster);
        }

        foreach ($movie->movieVideos as $video) {
            if ($video->video) {
                Storage::disk('public')->delete($video->video);
            }
        }

        $movie->delete();

        return response()->noContent();

    }
}
