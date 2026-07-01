<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $fillable = [
        'name',
        'category',
        'image_path',
        'ingredients',
        'instructions',
        'url',
        'shopping_date',
        'memo',
        'cooked_count',
    ];
}
