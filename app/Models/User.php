<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'preferences',
    ];
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function hasRole($role)
    {
        if (is_string($role)) {
            return $this->roles->contains('name', $role);
        }
        return $this->roles->contains('id', $role->id);
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'preferences' => 'json',
    ];
    
    public function news(): HasMany
    {
        return $this->hasMany(News::class, 'user_id');
    }
    
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'user_id');
    }
    
    public function likes(): HasMany
    {
        return $this->hasMany(Like::class, 'user_id');
    }
    
    public function savedNews()
    {
        return $this->belongsToMany(News::class, 'saved_news', 'user_id', 'news_id')
                    ->withTimestamps();
    }
    
    public function readNews()
    {
        return $this->belongsToMany(News::class, 'read_news', 'user_id', 'news_id')
                    ->withTimestamps();
    }
    
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
