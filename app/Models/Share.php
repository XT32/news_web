<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Share extends Model
{
    use HasFactory;

    protected $table = 'shares';
    protected $fillable = [
        'user_id',
        'news_id',
        'platform',
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
