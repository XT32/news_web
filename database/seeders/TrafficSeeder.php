<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TrafficAnalytics;
use Carbon\Carbon;

class TrafficSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Generate traffic data for the last 30 days
        for ($i = 29; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            
            TrafficAnalytics::create([
                'date' => $date->format('Y-m-d'),
                'views' => rand(100, 1000),
                'unique_visitors' => rand(50, 500),
                'created_at' => $date,
                'updated_at' => $date,
            ]);
        }
    }
}
