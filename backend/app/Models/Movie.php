<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    /** @use HasFactory<\Database\Factories\MovieFactory> */
    use HasFactory;

    protected $fillable = [
        'category_id',
        'banner',
        'poster',
        'title',
        'release_date',
        'runtime',
        'description'
    ];

    public function Category(){
        return $this->belongsTo(Category::class);
    }

    public function movieActors(){
        return $this->hasMany(MovieActor::class, 'movie_id');
    }

     public function movieGenerals(){
        return $this->hasMany(MovieGeneral::class, 'movie_id');
    }

     public function movieVideos(){
        return $this->hasMany(MovieVideo::class, 'movie_id');
    }

}
