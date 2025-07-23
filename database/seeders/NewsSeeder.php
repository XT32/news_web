<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\News;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create categories first
        $categories = [
            ['name' => 'Teknologi', 'slug' => 'teknologi'],
            ['name' => 'Bisnis', 'slug' => 'bisnis'],
            ['name' => 'Olahraga', 'slug' => 'olahraga'],
            ['name' => 'Politik', 'slug' => 'politik'],
            ['name' => 'Kesehatan', 'slug' => 'kesehatan'],
            ['name' => 'Pendidikan', 'slug' => 'pendidikan'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate($category);
        }

        // Create roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $employeeRole = Role::firstOrCreate(['name' => 'employee']);
        $userRole = Role::firstOrCreate(['name' => 'user']);

        // Create admin user
        $admin = User::firstOrCreate([
            'email' => 'admin@news.com'
        ], [
            'name' => 'Admin News',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $admin->roles()->syncWithoutDetaching([$adminRole->id]);

        // Create employee user
        $employee = User::firstOrCreate([
            'email' => 'employee@news.com'
        ], [
            'name' => 'Employee News',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $employee->roles()->syncWithoutDetaching([$employeeRole->id]);

        // Create regular user
        $user = User::firstOrCreate([
            'email' => 'user@news.com'
        ], [
            'name' => 'Regular User',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $user->roles()->syncWithoutDetaching([$userRole->id]);

        // Sample news data
        $newsData = [
            [
                'title' => 'Perkembangan Terbaru Teknologi AI di Indonesia',
                'summary' => 'Artificial Intelligence semakin berkembang pesat di Indonesia dengan berbagai inovasi terbaru.',
                'content' => 'Teknologi Artificial Intelligence (AI) di Indonesia mengalami perkembangan yang sangat pesat dalam beberapa tahun terakhir. Berbagai startup teknologi lokal mulai mengembangkan solusi AI untuk berbagai sektor, mulai dari fintech, e-commerce, hingga healthcare.

Pemerintah Indonesia juga memberikan dukungan penuh terhadap pengembangan teknologi AI melalui berbagai program dan inisiatif. Hal ini dibuktikan dengan diluncurkannya roadmap nasional untuk pengembangan AI yang bertujuan untuk menjadikan Indonesia sebagai salah satu pemain utama dalam ekosistem AI global.

Beberapa perusahaan besar seperti Gojek, Tokopedia, dan Traveloka telah mengimplementasikan teknologi AI dalam layanan mereka untuk meningkatkan pengalaman pengguna dan efisiensi operasional.',
                'thumbnail' => 'https://via.placeholder.com/800x400/0066cc/ffffff?text=AI+Technology',
                'status' => 'published',
                'categories' => ['Teknologi'],
                'user_id' => null, // Will be set below
            ],
            [
                'title' => 'Ekonomi Digital Indonesia Tumbuh 20% di Tahun 2024',
                'summary' => 'Pertumbuhan ekonomi digital Indonesia mencapai angka yang mengesankan di tahun 2024.',
                'content' => 'Ekonomi digital Indonesia mengalami pertumbuhan yang sangat signifikan di tahun 2024, dengan tingkat pertumbuhan mencapai 20% dibandingkan tahun sebelumnya. Pertumbuhan ini didorong oleh meningkatnya adopsi teknologi digital di berbagai sektor.

E-commerce menjadi salah satu sektor yang mengalami pertumbuhan paling pesat, dengan nilai transaksi yang meningkat drastis. Platform-platform e-commerce lokal seperti Tokopedia, Shopee, dan Bukalapak melaporkan peningkatan signifikan dalam jumlah pengguna dan volume transaksi.

Sektor fintech juga tidak kalah impresif, dengan layanan pembayaran digital dan pinjaman online yang semakin diterima oleh masyarakat Indonesia.',
                'thumbnail' => 'https://via.placeholder.com/800x400/009900/ffffff?text=Digital+Economy',
                'status' => 'published',
                'categories' => ['Bisnis', 'Teknologi'],
                'user_id' => null, // Will be set below
            ],
            [
                'title' => 'Timnas Indonesia Lolos ke Final Piala AFF 2024',
                'summary' => 'Tim nasional sepak bola Indonesia berhasil melaju ke final Piala AFF 2024 setelah mengalahkan Thailand.',
                'content' => 'Tim nasional sepak bola Indonesia berhasil menorehkan prestasi gemilang dengan lolos ke final Piala AFF 2024. Pencapaian ini diraih setelah Garuda Muda berhasil mengalahkan Thailand dengan skor 2-1 dalam pertandingan semifinal yang berlangsung di Stadion Gelora Bung Karno.

Gol kemenangan Indonesia dicetak oleh Egy Maulana Vikri pada menit ke-87 setelah sebelumnya kedua tim bermain imbang 1-1. Performa apik yang ditunjukkan oleh skuad asuhan Shin Tae-yong ini memberikan harapan besar bagi Indonesia untuk meraih gelar juara setelah sekian lama.

Di final nanti, Indonesia akan berhadapan dengan Vietnam yang juga tampil impresif sepanjang turnamen.',
                'thumbnail' => 'https://via.placeholder.com/800x400/cc0000/ffffff?text=Football+News',
                'status' => 'published',
                'categories' => ['Olahraga'],
                'user_id' => null, // Will be set below
            ],
            [
                'title' => 'Kebijakan Baru Pemerintah untuk Mendorong Investasi',
                'summary' => 'Pemerintah mengeluarkan serangkaian kebijakan baru untuk menarik lebih banyak investasi asing.',
                'content' => 'Pemerintah Indonesia telah mengeluarkan serangkaian kebijakan baru yang bertujuan untuk mendorong investasi, baik dari dalam negeri maupun luar negeri. Kebijakan ini meliputi penyederhanaan prosedur perizinan, insentif pajak, dan pembukaan sektor-sektor baru untuk investasi asing.

Menteri Investasi menyatakan bahwa target investasi untuk tahun ini adalah mencapai Rp 1.400 triliun, dengan kontribusi investasi asing sebesar 30%. Berbagai sektor prioritas seperti infrastruktur, manufaktur, dan teknologi digital menjadi fokus utama dalam menarik investasi.

Upaya ini diharapkan dapat menciptakan lapangan kerja baru dan meningkatkan daya saing ekonomi Indonesia di kancah regional maupun global.',
                'thumbnail' => 'https://via.placeholder.com/800x400/ff6600/ffffff?text=Investment+Policy',
                'status' => 'published',
                'categories' => ['Politik', 'Bisnis'],
                'user_id' => null, // Will be set below
            ],
        ];

        // Create news with categories
        $newsIndex = 0;
        $userArray = [$employee, $admin, $employee, $admin];

        foreach ($newsData as $newsItem) {
            $categoryNames = $newsItem['categories'];
            unset($newsItem['categories']);

            $newsItem['slug'] = Str::slug($newsItem['title']);
            $newsItem['views'] = rand(100, 5000);
            $newsItem['user_id'] = $userArray[$newsIndex]->id;
            $newsItem['source_type'] = 'local';

            $news = News::create($newsItem);

            // Attach categories
            $categoryIds = Category::whereIn('name', $categoryNames)->pluck('id');
            $news->categories()->attach($categoryIds);

            $newsIndex++;
        }

        $this->command->info('News data seeded successfully!');
    }
}
