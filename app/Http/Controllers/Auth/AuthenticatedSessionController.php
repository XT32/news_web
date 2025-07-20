<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * API: Daftar user publik dan aktivitasnya (untuk admin)
     */
    public function publicUsersActivity()
    {
        $totalUsers = \App\Models\User::where('role', 'user')->count();
        $totalLikes = \App\Models\Like::count();
        $totalComments = \App\Models\Comment::count();
        $totalShares = class_exists('App\\Models\\Share') ? \App\Models\Share::count() : 0;

        return response()->json([
            'total_users' => $totalUsers,
            'total_likes' => $totalLikes,
            'total_comments' => $totalComments,
            'total_shares' => $totalShares,
        ]);
    }
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();
        // Semua role redirect ke landing page
        return redirect()->intended('/');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
