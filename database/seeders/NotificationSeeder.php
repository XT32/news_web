<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Notification;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $users = User::whereHas('roles', function ($q) {
            $q->where('name', 'user');
        })->get();

        $notifications = [
            [
                'type' => 'news',
                'title' => 'Berita Terbaru Tersedia',
                'message' => 'Ada artikel baru tentang teknologi yang mungkin menarik untuk Anda.',
                'data' => ['news_id' => 1, 'category' => 'Teknologi']
            ],
            [
                'type' => 'system',
                'title' => 'Selamat Datang!',
                'message' => 'Terima kasih telah bergabung dengan portal berita kami.',
                'data' => null
            ],
            [
                'type' => 'news',
                'title' => 'Trending Hari Ini',
                'message' => 'Artikel tentang ekonomi sedang trending hari ini.',
                'data' => ['news_id' => 2, 'category' => 'Ekonomi']
            ],
            [
                'type' => 'system',
                'title' => 'Update Fitur',
                'message' => 'Kami telah menambahkan fitur baru untuk pengalaman membaca yang lebih baik.',
                'data' => null
            ],
            [
                'type' => 'news',
                'title' => 'Berita Olahraga',
                'message' => 'Hasil pertandingan terbaru telah tersedia.',
                'data' => ['news_id' => 3, 'category' => 'Olahraga']
            ]
        ];

        foreach ($users as $user) {
            foreach ($notifications as $index => $notification) {
                Notification::create([
                    'user_id' => $user->id,
                    'type' => $notification['type'],
                    'title' => $notification['title'],
                    'message' => $notification['message'],
                    'data' => $notification['data'],
                    'read_at' => $index < 2 ? now()->subDays(rand(1, 7)) : null, // Mark some as read
                    'created_at' => now()->subDays(rand(0, 30)),
                    'updated_at' => now()->subDays(rand(0, 30)),
                ]);
            }
        }
    }
}
