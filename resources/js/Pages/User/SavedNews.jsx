import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import UserLayout from '../../Layouts/UserLayout';
import NewsCardDashboard from '../../Components/Card/NewsCardDashboard';

export default function SavedNews({ auth }) {
    const [savedNews, setSavedNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/api/user/saved-news')
            .then(res => res.json())
            .then(data => {
                setSavedNews(data.data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching saved news:', error);
                setLoading(false);
            });
    }, []);

    const handleUnsave = async (newsId) => {
        try {
            const response = await fetch(`/api/user/unsave-news/${newsId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            });

            if (response.ok) {
                setSavedNews(savedNews.filter(news => news.id !== newsId));
            }
        } catch (error) {
            console.error('Error unsaving news:', error);
        }
    };

    const filteredNews = savedNews.filter(news => {
        const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            news.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (filter === 'all') return matchesSearch;
        if (filter === 'recent') {
            const newsDate = new Date(news.created_at);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return matchesSearch && newsDate >= weekAgo;
        }
        if (filter === 'category' && news.category) {
            return matchesSearch && news.category.slug === filter;
        }
        return matchesSearch;
    });

    return (
        <UserLayout>
            <Head title="Berita Disimpan" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Berita Disimpan</h1>
                                <p className="text-gray-600 mt-2">Kelola koleksi berita yang telah Anda simpan</p>
                            </div>
                            <div className="text-sm text-gray-500">
                                Total: {savedNews.length} berita
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label htmlFor="search" className="sr-only">Cari berita</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="search"
                                        type="text"
                                        placeholder="Cari berita yang disimpan..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <select
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="all">Semua Berita</option>
                                    <option value="recent">7 Hari Terakhir</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        {loading ? (
                            <div className="flex justify-center items-center h-32">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            </div>
                        ) : savedNews.length === 0 ? (
                            <div className="text-center py-12">
                                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada berita disimpan</h3>
                                <p className="text-gray-500 mb-4">Mulai simpan berita favorit Anda untuk dibaca nanti</p>
                                <Link
                                    href={route('home')}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Jelajahi Berita
                                </Link>
                            </div>
                        ) : filteredNews.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">Tidak ada berita yang sesuai dengan pencarian Anda.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredNews.map((news, index) => (
                                    <div key={news.id || index} className="relative">
                                        <NewsCardDashboard news={news} />
                                        <button
                                            onClick={() => handleUnsave(news.id)}
                                            className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                                            title="Hapus dari simpanan"
                                        >
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 3a1 1 0 112 0v3a1 1 0 11-2 0V8zm4 0a1 1 0 112 0v3a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
