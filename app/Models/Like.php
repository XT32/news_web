<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Like extends Model
{
    use HasFactory;

    /**
     * @var string
     */
    protected $table = 'likes';


    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'news_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function news(): BelongsTo
    {
        return $this->belongsTo(News::class, 'news_id');
    }
}
