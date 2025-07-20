<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\News;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        $user1 = User::where('email', 'user1@example.com')->first();
        $user2 = User::where('email', 'user2@example.com')->first();
        $karyawan1 = User::where('email', 'karyawan1@example.com')->first();
        $karyawan2 = User::where('email', 'karyawan2@example.com')->first();

        News::create([
            'title' => 'Berita User Satu',
            'slug' => 'berita-user-satu',
            'summary' => 'Ringkasan berita user satu',
            'content' => 'Isi lengkap berita user satu.',
            'thumbnail' => 'https://via.placeholder.com/300x200.png?text=User+1',
            'status' => 'published',
            'user_id' => $user1 ? $user1->id : null,
            'source_type' => 'local',
            'views' => 10,
        ]);
        News::create([
            'title' => 'Berita User Dua',
            'slug' => 'berita-user-dua',
            'summary' => 'Ringkasan berita user dua',
            'content' => 'Isi lengkap berita user dua.',
            'thumbnail' => 'https://via.placeholder.com/300x200.png?text=User+2',
            'status' => 'published',
            'user_id' => $user2 ? $user2->id : null,
            'source_type' => 'local',
            'views' => 8,
        ]);
        News::create([
            'title' => 'Berita Karyawan Satu',
            'slug' => 'berita-karyawan-satu',
            'summary' => 'Ringkasan berita karyawan satu',
            'content' => 'Isi lengkap berita karyawan satu.',
            'thumbnail' => 'https://via.placeholder.com/300x200.png?text=Karyawan+1',
            'status' => 'published',
            'user_id' => $karyawan1 ? $karyawan1->id : null,
            'source_type' => 'local',
            'views' => 15,
        ]);
        News::create([
            'title' => 'Berita Karyawan Dua',
            'slug' => 'berita-karyawan-dua',
            'summary' => 'Ringkasan berita karyawan dua',
            'content' => 'Isi lengkap berita karyawan dua.',
            'thumbnail' => 'https://via.placeholder.com/300x200.png?text=Karyawan+2',
            'status' => 'published',
            'user_id' => $karyawan2 ? $karyawan2->id : null,
            'source_type' => 'local',
            'views' => 12,
        ]);

        $user = User::where('email', 'admin@example.com')->first();
        if ($user) {
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
}
