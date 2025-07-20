<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\News;

class LocalNewsSeeder extends Seeder
{
    public function run(): void
    {
        $news = [
            [
                'title' => 'Jalan Tol Baru Diresmikan di Jawa',
                'summary' => 'Pemerintah meresmikan jalan tol baru untuk mempercepat konektivitas antar kota di Jawa.',
                'image' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
                'author' => 'Redaksi',
                'status' => 'published',
                'source_type' => 'local',
                'url' => null,
            ],
            [
                'title' => 'Teknologi AI Membantu Pendidikan di Indonesia',
                'summary' => 'Penggunaan AI di sekolah-sekolah mulai diterapkan untuk meningkatkan kualitas pendidikan.',
                'image' => 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
                'author' => 'Redaksi',
                'status' => 'published',
                'source_type' => 'local',
                'url' => null,
            ],
            [
                'title' => 'Timnas U-23 Siap Berlaga di Final Asia',
                'summary' => 'Tim nasional U-23 Indonesia siap menghadapi laga final Piala Asia dengan persiapan matang.',
                'image' => 'https://images.unsplash.com/photo-1505843279827-4b522b6c1d97?auto=format&fit=crop&w=400&q=80',
                'author' => 'Redaksi',
                'status' => 'published',
                'source_type' => 'local',
                'url' => null,
            ],
        ];

        foreach ($news as $item) {
            News::create(array_merge($item, [
                'slug' => Str::slug($item['title']) . '-' . Str::random(5),
            ]));
        }
    }
}
