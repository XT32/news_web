<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\News;
use App\Models\Category;

class UserController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();
        
        return Inertia::render('User/Dashboard', [
            'auth' => ['user' => $user],
        ]);
    }

    public function savedNews()
    {
        $user = Auth::user();
        
        return Inertia::render('User/SavedNews', [
            'auth' => ['user' => $user],
        ]);
    }

    public function notifications()
    {
        $user = Auth::user();
        
        return Inertia::render('User/Notifications', [
            'auth' => ['user' => $user],
        ]);
    }

    public function preferences()
    {
        $user = Auth::user();
        
        return Inertia::render('User/Preferences', [
            'auth' => ['user' => $user],
        ]);
    }

    public function changePassword()
    {
        $user = Auth::user();
        
        return Inertia::render('User/ChangePassword', [
            'auth' => ['user' => $user],
        ]);
    }

    // API Methods
    public function getRecentNews()
    {
        $news = News::with(['category'])
            ->where('is_published', true)
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $news
        ]);
    }

    public function getUserSavedNews()
    {
        $user = Auth::user();
        
        // Assuming we have a saved_news table or relationship
        $savedNews = $user->savedNews()->with(['category'])->get();

        return response()->json([
            'success' => true,
            'data' => $savedNews
        ]);
    }

    public function getUserStats()
    {
        $user = Auth::user();
        
        $stats = [
            'totalRead' => $user->readNews()->count(),
            'totalSaved' => $user->savedNews()->count(),
            'totalComments' => $user->comments()->count(),
        ];

        return response()->json($stats);
    }

    public function getUserNotifications()
    {
        $user = Auth::user();
        
        $notifications = $user->notifications()
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $notifications
        ]);
    }

    public function getUserPreferences()
    {
        $user = Auth::user();
        
        // Default preferences if none exist
        $preferences = [
            'email_notifications' => true,
            'daily_digest' => false,
            'breaking_news' => true,
            'preferred_categories' => [],
            'language' => 'id',
            'timezone' => 'Asia/Jakarta'
        ];

        // If user has preferences, merge with defaults
        if ($user->preferences) {
            $preferences = array_merge($preferences, json_decode($user->preferences, true));
        }

        return response()->json([
            'success' => true,
            'data' => $preferences
        ]);
    }

    public function updateUserPreferences(Request $request)
    {
        $user = Auth::user();
        
        $validatedData = $request->validate([
            'email_notifications' => 'boolean',
            'daily_digest' => 'boolean',
            'breaking_news' => 'boolean',
            'preferred_categories' => 'array',
            'preferred_categories.*' => 'integer|exists:categories,id',
            'language' => 'string|in:id,en',
            'timezone' => 'string',
        ]);

        $user->update([
            'preferences' => json_encode($validatedData)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Preferences updated successfully'
        ]);
    }

    public function saveNews(Request $request)
    {
        $user = Auth::user();
        $newsId = $request->input('news_id');
        
        // Check if already saved
        $exists = $user->savedNews()->where('news_id', $newsId)->exists();
        
        if (!$exists) {
            $user->savedNews()->attach($newsId);
        }

        return response()->json([
            'success' => true,
            'message' => 'News saved successfully'
        ]);
    }

    public function unsaveNews($newsId)
    {
        $user = Auth::user();
        
        $user->savedNews()->detach($newsId);

        return response()->json([
            'success' => true,
            'message' => 'News removed from saved list'
        ]);
    }

    public function markNotificationAsRead($notificationId)
    {
        $user = Auth::user();
        
        $notification = $user->notifications()->find($notificationId);
        
        if ($notification) {
            $notification->markAsRead();
        }

        return response()->json([
            'success' => true,
            'message' => 'Notification marked as read'
        ]);
    }

    public function markAllNotificationsAsRead()
    {
        $user = Auth::user();
        
        $user->unreadNotifications->markAsRead();

        return response()->json([
            'success' => true,
            'message' => 'All notifications marked as read'
        ]);
    }

    public function deleteNotification($notificationId)
    {
        $user = Auth::user();
        
        $notification = $user->notifications()->find($notificationId);
        
        if ($notification) {
            $notification->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Notification deleted'
        ]);
    }
}
