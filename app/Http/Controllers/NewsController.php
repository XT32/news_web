<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;
use App\Models\NewsArticle;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class NewsController extends Controller
{
    // ======================== EMPLOYEE ========================
    // Berita terpopuler untuk dashboard admin
    public function getPopularNews()
    {
        $news = News::with(['user:id,name'])->withCount(['likes', 'comments', 'shares', 'traffic'])
            ->where('source_type', 'local')
            ->where('status', 'published')
            ->orderByDesc('traffic_count')
            ->take(10)
            ->get()
            ->map(function($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'traffic_count' => $item->traffic_count,
                    'likes_count' => $item->likes_count,
                    'comments_count' => $item->comments_count,
                    'shares_count' => $item->shares_count,
                    'employee_name' => $item->user ? $item->user->name : '-',
                ];
            });
        return response()->json($news);
    }

    // Performa karyawan: statistik berita per user
    public function getEmployeePerformance()
    {
        $users = \App\Models\User::where('role', 'employee')->get();
        $result = $users->map(function($user) {
            $news = $user->news()->withCount(['likes', 'comments', 'shares', 'traffic'])->get();
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'news_count' => $news->count(),
                'total_views' => $news->sum('traffic_count'),
                'total_likes' => $news->sum('likes_count'),
                'total_comments' => $news->sum('comments_count'),
                'total_shares' => $news->sum('shares_count'),
            ];
        });
        return response()->json($result);
    }
    // Berita milik karyawan beserta statistik interaktif
    public function getEmployeeNews(Request $request)
    {
        $user = $request->user();
        $query = News::withCount(['likes', 'comments', 'shares', 'traffic'])
            ->where('user_id', $user->id)
            ->orderByDesc('created_at');
        if ($request->query('trashed')) {
            $query->withTrashed();
        }
        $news = $query->get();
        return response()->json($news);
    }

    // Gabungkan berita lokal & API
    public function getAllNews()
    {
        $local = News::where('source_type', 'local')->where('status', 'published')->latest()->get(['id','title','summary','url','created_at']);
        $api = NewsArticle::orderByDesc('published_at')->get(['id','title as title','description as summary','url','published_at as created_at']);
        // Gabungkan dan urutkan berdasarkan tanggal terbaru
        $all = $local->concat($api)->sortByDesc(function($item) {
            return $item->created_at;
        })->values();
        return response()->json($all);
    }

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

    public function uploadNews(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'required|string',
            'content' => 'required|string',
            'thumbnail' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Cek duplikasi hanya di berita lokal (bukan API)
        $exists = News::where('title', $request->title)
            ->where('source_type', 'local')
            ->exists();
        if ($exists) {
            return response()->json(['message' => 'Judul berita sudah digunakan di berita lokal.'], 422);
        }

        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $filename = uniqid('thumb_') . '.' . $file->getClientOriginalExtension();
            $thumbnailPath = $file->storeAs('public/uploads', $filename);
            $thumbnailPath = str_replace('public/', 'storage/', $thumbnailPath);
        }

        $news = News::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . uniqid(),
            'summary' => $request->summary,
            'content' => $request->content,
            'thumbnail' => $thumbnailPath,
            'status' => 'published',
            'user_id' => $request->user()->id,
            'source_type' => 'local',
        ]);
        return response()->json($news, 201);
    }

    public function getTrendingNews()
    {
        return response()->json(
            News::where('source_type', 'local')->where('status', 'published')->orderByDesc('views')->take(10)->get(['id', 'title', 'slug'])
        );
    }

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

    /**
     * Update berita milik karyawan (hanya pemilik).
     */
    public function updateNews(Request $request, $id)
    {
        $news = News::where('user_id', $request->user()->id)->findOrFail($id);
        $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'required|string',
            'content' => 'required|string',
            'thumbnail' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $filename = uniqid('thumb_') . '.' . $file->getClientOriginalExtension();
            $thumbnailPath = $file->storeAs('public/uploads', $filename);
            $thumbnailPath = str_replace('public/', 'storage/', $thumbnailPath);
            $news->thumbnail = $thumbnailPath;
        }
        $news->title = $request->title;
        $news->slug = \Illuminate\Support\Str::slug($request->title) . '-' . uniqid();
        $news->summary = $request->summary;
        $news->content = $request->content;
        $news->save();
        return response()->json($news);
    }

    /**
     * Soft delete berita milik karyawan (hanya pemilik).
     */
    public function deleteNews(Request $request, $id)
    {
        $news = News::where('user_id', $request->user()->id)->findOrFail($id);
        $news->delete();
        return response()->json(['status' => 'deleted']);
    }

    /**
     * Restore berita yang dihapus (hanya pemilik).
     */
    public function restoreNews(Request $request, $id)
    {
        $news = News::onlyTrashed()->where('user_id', $request->user()->id)->findOrFail($id);
        $news->restore();
        return response()->json(['status' => 'restored']);
    }

    /**
     * Statistik traffic berita untuk admin (bisa filter kategori, tanggal).
     */
    public function adminTrafficStats(Request $request)
    {
        $query = News::with(['user:id,name', 'categories:id,name'])
            ->withCount(['likes', 'comments', 'shares', 'traffic'])
            ->withTrashed();
        if ($request->has('category_id')) {
            $query->whereHas('categories', function($q) use ($request) {
                $q->where('categories.id', $request->category_id);
            });
        }
        if ($request->has('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->has('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }
        $news = $query->orderByDesc('created_at')->get();
        return response()->json($news);
    }

    /**
     * Statistik performa karyawan (admin): total berita, views, likes, comments, shares per karyawan.
     */
    public function adminEmployeePerformance(Request $request)
    {
        $users = \App\Models\User::whereHas('roles', function($q){ $q->where('name', 'karyawan'); })
            ->with(['news' => function($q){ $q->withCount(['likes', 'comments', 'shares', 'traffic']); }])
            ->get();
        $result = $users->map(function($user) {
            $news = $user->news;
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'news_count' => $news->count(),
                'total_views' => $news->sum('traffic_count'),
                'total_likes' => $news->sum('likes_count'),
                'total_comments' => $news->sum('comments_count'),
                'total_shares' => $news->sum('shares_count'),
            ];
        });
        return response()->json($result);
    }

    /**
     * Statistik traffic detail untuk karyawan (berita miliknya, filter tanggal/berita).
     */
    public function employeeTrafficStats(Request $request)
    {
        $user = $request->user();
        $query = News::withCount(['likes', 'comments', 'shares', 'traffic'])
            ->where('user_id', $user->id);
        if ($request->has('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->has('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }
        if ($request->has('news_id')) {
            $query->where('id', $request->news_id);
        }
        $news = $query->orderByDesc('created_at')->get();
        return response()->json($news);
    }
}