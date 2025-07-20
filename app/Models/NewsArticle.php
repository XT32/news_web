<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsArticle extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'url',
        'image_url',
        'published_at',
        'source_name',
    ];

    public $timestamps = false;
}
