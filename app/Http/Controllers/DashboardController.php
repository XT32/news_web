<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function index()
    {
        // Ambil berita lokal (buatan user/karyawan)
        $localNews = \App\Models\News::where('status', 'published')->where('source_type', 'local')->latest()->take(5)->get();

        // Ambil berita dari News API (disimpan di tabel news_articles)
        $apiNews = Cache::remember('cached_api_news', now()->addMinutes(10), function () {
            $apiKey = config('services.newsapi.key') ?: env('NEWS_API_KEY');
            $response = Http::get('https://newsapi.org/v2/top-headlines', [
                'country' => 'id',
                'apiKey' => $apiKey,
            ]);
            if ($response->successful()) {
                $articles = $response->json('articles');
                foreach ($articles as $article) {
                    \App\Models\NewsArticle::updateOrCreate(
                        ['url' => $article['url']],
                        [
                            'title' => $article['title'],
                            'description' => $article['description'] ?? '',
                            'image_url' => $article['urlToImage'] ?? null,
                            'published_at' => $article['publishedAt'] ?? now(),
                            'source_name' => $article['source']['name'] ?? '',
                        ]
                    );
                }
                return \App\Models\NewsArticle::orderByDesc('published_at')->take(5)->get();
            }
            Log::error('Failed to fetch news from News API: ' . $response->status());
            return collect();
        });
        $trendingNews = $localNews->concat($apiNews)->take(10);
        return view('Dashboard', compact('trendingNews'));
    }
}
