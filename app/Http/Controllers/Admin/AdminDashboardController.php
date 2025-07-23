<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // Statistics for monitoring
        $stats = [
            'totalNews' => News::withTrashed()->count(),
            'publishedNews' => News::where('status', 'published')->count(),
            'draftNews' => News::where('status', 'draft')->count(),
            'deletedNews' => News::onlyTrashed()->count(),
            'totalEmployees' => User::whereHas('roles', function ($q) {
                $q->where('name', 'employee');
            })->count(),
            'totalUsers' => User::whereHas('roles', function ($q) {
                $q->where('name', 'user');
            })->count(),
            'totalCategories' => Category::count(),
            'totalViews' => News::sum('views'),
        ];

        // User registration trend (last 7 days)
        $userRegistrationTrend = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $count = User::whereDate('created_at', $date)->count();
            $userRegistrationTrend[] = [
                'date' => $date,
                'count' => $count
            ];
        }

        // Employee performance
        $employeePerformance = User::whereHas('roles', function ($q) {
            $q->where('name', 'employee');
        })
            ->withCount(['news', 'news as published_news_count' => function ($q) {
                $q->where('status', 'published');
            }])
            ->withSum('news', 'views')
            ->orderBy('news_count', 'desc')
            ->take(10)
            ->get();

        // Recent activity
        $recentNews = News::with(['user', 'categories'])
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        // Top performing articles
        $topNews = News::with(['user', 'categories'])
            ->where('status', 'published')
            ->orderBy('views', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'userRegistrationTrend' => $userRegistrationTrend,
            'employeePerformance' => $employeePerformance,
            'recentNews' => $recentNews,
            'topNews' => $topNews,
        ]);
    }

    public function news()
    {
        $news = News::with(['user', 'categories'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/News/Index', [
            'news' => $news,
        ]);
    }

    public function users()
    {
        // Only show employees, not regular users (for privacy)
        $employees = User::whereHas('roles', function ($q) {
            $q->where('name', 'employee');
        })
            ->with(['roles'])
            ->withCount(['news', 'news as published_news_count' => function ($q) {
                $q->where('status', 'published');
            }])
            ->withSum('news', 'views')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/Employees/Index', [
            'employees' => $employees,
        ]);
    }

    public function categories()
    {
        $categories = Category::withCount('news')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }
}
