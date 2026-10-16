<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MovieActor extends Model
{
    public function actor(){
        return $this->belongsTo(Actor::class, 'actor_id');
    }
}
