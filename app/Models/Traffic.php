<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Traffic extends Model
{
    use HasFactory;

    protected $table = 'traffic';
    protected $fillable = [
        'news_id',
        'ip_address',
        'visited_at',
    ];

    public $timestamps = false;

    public function news(): BelongsTo
    {
        return $this->belongsTo(News::class, 'news_id');
    }
}
