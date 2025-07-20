<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class News extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'news';

    protected $fillable = [
        'title',
        'summary',
        'content',
        'thumbnail',
        'status',
        'source_type',
        'user_id',
        'views',
        'likes_count',
        'comments_count',
        'shares_count',
    ];
}
