<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrafficAnalytics extends Model
{
    protected $fillable = [
        'date',
        'views',
        'unique_visitors',
    ];

    protected $casts = [
        'date' => 'date',
    ];
}
