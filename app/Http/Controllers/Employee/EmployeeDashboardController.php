<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class EmployeeDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $stats = [
            'totalArticles' => $user->news()->count(),
            'publishedArticles' => $user->news()->where('status', 'published')->count(),
            'draftArticles' => $user->news()->where('status', 'draft')->count(),
            'totalViews' => $user->news()->sum('views'),
        ];

        $myNews = $user->news()
            ->with('categories')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        return Inertia::render('Employee/Dashboard', [
            'stats' => $stats,
            'myNews' => $myNews,
        ]);
    }

    public function news()
    {
        $news = Auth::user()->news()
            ->with('categories')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Employee/News/Index', [
            'news' => $news,
        ]);
    }

    public function createNews()
    {
        $categories = Category::all();

        return Inertia::render('Employee/News/Create', [
            'categories' => $categories,
        ]);
    }

    public function storeNews(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:news,slug',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'thumbnail' => 'nullable|url',
            'status' => 'required|in:draft,published',
            'categories' => 'required|array|min:1',
            'categories.*' => 'exists:categories,id',
        ]);

        $news = Auth::user()->news()->create([
            'title' => $request->title,
            'slug' => $request->slug,
            'excerpt' => $request->excerpt,
            'content' => $request->content,
            'thumbnail' => $request->thumbnail,
            'status' => $request->status,
            'source_type' => 'local',
        ]);

        $news->categories()->attach($request->categories);

        return redirect()->route('employee.news')->with('success', 'Article created successfully!');
    }

    public function editNews($id)
    {
        $news = Auth::user()->news()
            ->with('categories')
            ->findOrFail($id);

        $categories = Category::all();

        return Inertia::render('Employee/News/Edit', [
            'news' => $news,
            'categories' => $categories,
        ]);
    }

    public function updateNews(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:news,slug,' . $id,
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'thumbnail' => 'nullable|url',
            'status' => 'required|in:draft,published',
            'categories' => 'required|array|min:1',
            'categories.*' => 'exists:categories,id',
        ]);

        $news = Auth::user()->news()->findOrFail($id);

        $news->update([
            'title' => $request->title,
            'slug' => $request->slug,
            'excerpt' => $request->excerpt,
            'content' => $request->content,
            'thumbnail' => $request->thumbnail,
            'status' => $request->status,
        ]);

        $news->categories()->sync($request->categories);

        return redirect()->route('employee.news')->with('success', 'Article updated successfully!');
    }

    public function deleteNews($id)
    {
        $news = Auth::user()->news()->findOrFail($id);
        $news->delete();

        return redirect()->route('employee.news')->with('success', 'Article deleted successfully!');
    }
}
