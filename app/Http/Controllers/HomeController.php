<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $news = News::with(['user', 'categories'])
            ->where('status', 'published')
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        $categories = Category::withCount('news')->get();

        $featuredNews = News::with(['user', 'categories'])
            ->where('status', 'published')
            ->orderBy('views', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('Home', [
            'news' => $news,
            'categories' => $categories,
            'featuredNews' => $featuredNews,
            'auth' => [
                'user' => Auth::user() ? Auth::user()->load('roles') : null,
            ],
        ]);
    }

    public function show($slug)
    {
        $news = News::with(['user', 'categories', 'comments.user'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        // Increment views
        $news->increment('views');

        $relatedNews = News::with(['user', 'categories'])
            ->where('status', 'published')
            ->where('id', '!=', $news->id)
            ->whereHas('categories', function ($query) use ($news) {
                $query->whereIn('categories.id', $news->categories->pluck('id'));
            })
            ->take(4)
            ->get();

        return Inertia::render('NewsDetail', [
            'news' => $news,
            'relatedNews' => $relatedNews,
        ]);
    }

    public function category($slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();

        $news = News::with(['user', 'categories'])
            ->where('status', 'published')
            ->whereHas('categories', function ($query) use ($category) {
                $query->where('categories.id', $category->id);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return Inertia::render('CategoryNews', [
            'category' => $category,
            'news' => $news,
        ]);
    }
}
