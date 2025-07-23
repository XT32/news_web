import { useEffect, useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import UserLayout from '../../Layouts/UserLayout';
import NewsCardDashboard from '../../Components/Card/NewsCardDashboard';

export default function Dashboard({ auth }) {
    const [recentNews, setRecentNews] = useState([]);
    const [savedNews, setSavedNews] = useState([]);
    const [stats, setStats] = useState({
        totalRead: 0,
        totalSaved: 0,
        totalComments: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/api/user/recent-news').then(res => res.json()),
            fetch('/api/user/saved-news').then(res => res.json()),
            fetch('/api/user/stats').then(res => res.json())
        ]).then(([recentData, savedData, statsData]) => {
            setRecentNews(recentData.data || []);
            setSavedNews(savedData.data || []);
            setStats(statsData);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <UserLayout>
                <Head title="Dashboard User" />
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
                </div>
            </UserLayout>
        );
    }

    return (
        <UserLayout>
            <Head title="Dashboard User" />
            
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        <h1 className="text-3xl font-bold">Selamat datang, {auth.user.name}!</h1>
                        <p className="text-blue-100 mt-2">Nikmati membaca berita terkini dan kelola preferensi Anda</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Berita Dibaca</p>
                                    <p className="text-2xl font-semibold text-gray-900">{stats.totalRead}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Berita Disimpan</p>
                                    <p className="text-2xl font-semibold text-gray-900">{stats.totalSaved}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-8 w-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Komentar</p>
                                    <p className="text-2xl font-semibold text-gray-900">{stats.totalComments}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Aksi Cepat</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link
                                href={route('home')}
                                className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="text-center">
                                    <svg className="h-8 w-8 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                    <p className="text-sm font-medium">Baca Berita</p>
                                </div>
                            </Link>

                            <Link
                                href={route('user.saved-news')}
                                className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="text-center">
                                    <svg className="h-8 w-8 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                    <p className="text-sm font-medium">Berita Disimpan</p>
                                </div>
                            </Link>

                            <Link
                                href={route('profile.edit')}
                                className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="text-center">
                                    <svg className="h-8 w-8 text-purple-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <p className="text-sm font-medium">Edit Profil</p>
                                </div>
                            </Link>

                            <Link
                                href={route('user.preferences')}
                                className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="text-center">
                                    <svg className="h-8 w-8 text-orange-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <p className="text-sm font-medium">Pengaturan</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Recent News */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Berita Terbaru</h3>
                            <Link href={route('home')} className="text-blue-600 hover:text-blue-800">
                                Lihat Semua
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentNews.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                    <p>Belum ada berita untuk ditampilkan.</p>
                                </div>
                            ) : (
                                recentNews.slice(0, 3).map((news, index) => (
                                    <NewsCardDashboard key={news.id || index} news={news} />
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Saved News Preview */}
                {savedNews.length > 0 && (
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Berita yang Disimpan</h3>
                                <Link href={route('user.saved-news')} className="text-blue-600 hover:text-blue-800">
                                    Lihat Semua
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {savedNews.slice(0, 2).map((news, index) => (
                                    <NewsCardDashboard key={news.id || index} news={news} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
