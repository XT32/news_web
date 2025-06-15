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
        $localNews = News::where('status', 'published')->latest()->take(5)->get();
        $apiNews = Cache::remember('cached_api_news', now()->addMinutes(10), function () {
            $response = Http::get('https://newsapi.org/v2/top-headlines', [
                'country' => 'id',
                'apiKey' => config('services.newsapi.key'),
            ]);

            if ($response->successful()) {
                return collect($response->json()['articles'])->map(function ($article) {
                    return News::firstOrCreate(
                        ['title' => $article['title']],
                        [
                            'author' => $article['author'] ?? 'Unknown',
                            'summary' => substr(strip_tags($article['description'] ?? ''), 0, 100),
                            'content' => $article['content'] ?? '',
                            'thumbnail' => $article['urlToImage'],
                            'url' => $article['url'],
                            'source_type' => 'api',
                            'status' => 'published',
                            'published_at' => $article['publishedAt'],
                        ]
                    );
                });
            }
            Log::error('Failed to fetch news from News API: ' . $response->status());
            return collect();
        });
        $trendingNews = $localNews->merge($apiNews)->take(10);
        
        return view('dashboard', compact('trendingNews'));
    }
}
