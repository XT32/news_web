<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class News extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'slug', 'summary', 'content', 'status', 'user_id', 'thumbnail', 'views', 'source_type', 'url'];
    public function scopeLocal($query)
    {
        return $query->where('source_type', 'local');
    }
    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
    
    public function scopeApi($query)
    {
        return $query->where('source_type', 'api');
    }
}