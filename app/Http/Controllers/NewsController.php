<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;
use App\Models\NewsArticle;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class NewsController extends Controller
{
    // Berita lokal
    public function getLocalNews()
    {
        return response()->json(
            News::where('source_type', 'local')->where('status', 'published')->latest()->get()
        );
    }

    // Berita dari API (cache)
    public function getApiNews()
    {
        return response()->json(
            NewsArticle::orderByDesc('published_at')->get()
        );
    }

    // Upload berita lokal (hanya admin/jurnalis)
    public function uploadNews(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'required|string',
            'content' => 'required|string',
            'thumbnail' => 'nullable|url',
        ]);
        $news = News::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . uniqid(),
            'summary' => $request->summary,
            'content' => $request->content,
            'thumbnail' => $request->thumbnail,
            'status' => 'published',
            'user_id' => $request->user()->id,
            'source_type' => 'local',
        ]);
        return response()->json($news, 201);
    }

    // Trending news (berdasarkan views, hanya lokal)
    public function getTrendingNews()
    {
        return response()->json(
            News::where('source_type', 'local')->where('status', 'published')->orderByDesc('views')->take(10)->get(['id', 'title', 'slug'])
        );
    }

    // Sinkronisasi berita dari API ke tabel news_articles (cache)
    public function syncApiNews()
    {
        $apiKey = env('NEWS_API_KEY');
        $response = Http::get("https://newsapi.org/v2/top-headlines?country=id&apiKey={$apiKey}");
        $articles = $response->json('articles');
        if ($articles) {
            foreach ($articles as $article) {
                NewsArticle::updateOrCreate(
                    ['url' => $article['url']],
                    [
                        'title' => $article['title'],
                        'description' => $article['description'],
                        'url' => $article['url'],
                        'image_url' => $article['urlToImage'],
                        'published_at' => $article['publishedAt'],
                        'source_name' => $article['source']['name'],
                    ]
                );
            }
            return response()->json(['status' => 'synced']);
        }
        return response()->json(['status' => 'failed', 'message' => 'No articles found'], 400);
    }
}