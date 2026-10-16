<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MovieGeneral extends Model
{
    public function general(){
        return $this->belongsTo(General::class, 'general_id');
    }
}
