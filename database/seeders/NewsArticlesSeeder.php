<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NewsArticle;

class NewsArticlesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        NewsArticle::create([
            'title' => 'Berita API Pertama',
            'description' => 'Deskripsi berita API pertama',
            'url' => 'https://newsapi.org/article/1',
            'image_url' => 'https://via.placeholder.com/300x200.png?text=API+1',
            'published_at' => now(),
            'source_name' => 'CNN Indonesia',
        ]);

        NewsArticle::create([
            'title' => 'Berita API Kedua',
            'description' => 'Deskripsi berita API kedua',
            'url' => 'https://newsapi.org/article/2',
            'image_url' => 'https://via.placeholder.com/300x200.png?text=API+2',
            'published_at' => now(),
            'source_name' => 'Kompas',
        ]);
    }
}
