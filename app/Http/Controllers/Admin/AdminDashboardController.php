<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\User;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Share;
use App\Models\TrafficAnalytics;
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
        // User statistics and aggregate data for privacy protection
        $userStats = [
            'total_users' => User::whereHas('roles', function ($q) {
                $q->where('name', 'user');
            })->count(),
            
            'users_registered_this_month' => User::whereHas('roles', function ($q) {
                $q->where('name', 'user');
            })->whereMonth('created_at', now()->month)->count(),
            
            'users_registered_today' => User::whereHas('roles', function ($q) {
                $q->where('name', 'user');
            })->whereDate('created_at', today())->count(),
            
            'active_users_last_7_days' => User::whereHas('roles', function ($q) {
                $q->where('name', 'user');
            })->where('updated_at', '>=', now()->subDays(7))->count(),
        ];

        // News engagement statistics
        $newsStats = [
            'total_news_views' => News::sum('views'),
            'total_comments' => Comment::count(),
            'total_likes' => Like::count(),
            'total_news_shared' => Share::count(),
            'average_views_per_article' => round(News::avg('views'), 2),
        ];

        // Traffic statistics by date (last 30 days)
        $trafficData = [];
        for ($i = 29; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $trafficData[] = [
                'date' => $date->format('Y-m-d'),
                'views' => TrafficAnalytics::whereDate('date', $date)->sum('views'),
                'unique_visitors' => TrafficAnalytics::whereDate('date', $date)->sum('unique_visitors'),
            ];
        }

        // Registration trend (last 30 days)
        $registrationTrend = [];
        for ($i = 29; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $registrationTrend[] = [
                'date' => $date->format('Y-m-d'),
                'registrations' => User::whereHas('roles', function ($q) {
                    $q->where('name', 'user');
                })->whereDate('created_at', $date)->count(),
            ];
        }

        // Most popular categories by user engagement
        $popularCategories = Category::withCount(['news', 'news as total_views' => function ($q) {
            $q->selectRaw('sum(views)');
        }])
            ->orderBy('total_views', 'desc')
            ->take(10)
            ->get();

        // Employee performance (separate from user data)
        $employeeStats = User::whereHas('roles', function ($q) {
            $q->where('name', 'employee');
        })
            ->withCount(['news', 'news as published_news_count' => function ($q) {
                $q->where('status', 'published');
            }])
            ->withSum('news', 'views')
            ->orderBy('news_count', 'desc')
            ->take(10)
            ->get(['id', 'name', 'email', 'created_at']);

        return Inertia::render('Admin/Users/Index', [
            'userStats' => $userStats,
            'newsStats' => $newsStats,
            'trafficData' => $trafficData,
            'registrationTrend' => $registrationTrend,
            'popularCategories' => $popularCategories,
            'employeeStats' => $employeeStats,
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
