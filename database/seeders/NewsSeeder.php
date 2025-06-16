<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\News;
use App\Models\User;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'admin@example.com')->first();

        News::create([
            'title' => 'Berita Lokal Pertama',
            'slug' => 'berita-lokal-pertama-001',
            'summary' => 'Ringkasan berita lokal pertama',
            'content' => 'Isi lengkap berita lokal pertama.',
            'thumbnail' => 'https://via.placeholder.com/300x200.png?text=Lokal+1',
            'status' => 'published',
            'user_id' => $user->id,
            'source_type' => 'local',
            'views' => 15,
        ]);

        News::create([
            'title' => 'Berita Lokal Kedua',
            'slug' => 'berita-lokal-kedua-002',
            'summary' => 'Ringkasan berita lokal kedua',
            'content' => 'Isi lengkap berita lokal kedua.',
            'thumbnail' => 'https://via.placeholder.com/300x200.png?text=Lokal+2',
            'status' => 'published',
            'user_id' => $user->id,
            'source_type' => 'local',
            'views' => 30,
        ]);
    }
}
