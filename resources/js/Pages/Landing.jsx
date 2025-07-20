import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// Dummy running text (hot news)
const hotNews = [
    'Pemerintah Resmikan Jalan Tol Baru',
    'Teknologi AI Semakin Populer di 2025',
    'Timnas U-23 Lolos ke Final Asia',
];

export default function Landing() {
    const { auth } = usePage().props;
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchNews() {
            setLoading(true);
            setError(null);
            try {
                // Ambil berita dari API utama dan lokal
                const [allRes, localRes] = await Promise.all([
                    fetch('/api/news'),
                    fetch('/api/news/local'),
                ]);
                const allNews = await allRes.json();
                const localNews = await localRes.json();
                // Gabungkan dan urutkan berdasarkan tanggal terbaru
                const combined = [...allNews, ...localNews].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setNews(combined);
            } catch (err) {
                setError('Gagal memuat berita');
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-white">
            {/* Navbar */}
            <nav className="w-full flex items-center justify-between px-8 py-4 bg-white/80 shadow-sm border-b border-blue-200 sticky top-0 z-20 backdrop-blur">
                <div className="text-2xl font-extrabold text-blue-700 drop-shadow">Portal Berita Nusantara</div>
                {auth?.user ? (
                    <div className="flex gap-4 items-center">
                        <span className="font-semibold text-blue-700">{auth.user.name}</span>
                        <Link href="/profile" className="px-4 py-2 bg-gray-100 text-blue-700 rounded-lg text-base font-semibold hover:bg-blue-50 transition">Profile</Link>
                        <Link href="/logout" method="post" as="button" className="px-4 py-2 bg-red-500 text-white rounded-lg text-base font-semibold hover:bg-red-600 transition">Logout</Link>
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <Link href="/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg text-base font-semibold shadow hover:bg-blue-700 transition">Login</Link>
                        <Link href="/register" className="px-6 py-2 bg-gray-200 text-blue-700 rounded-lg text-base font-semibold shadow hover:bg-blue-100 transition">Sign Up</Link>
                    </div>
                )}
            </nav>
            {/* Running Text */}
            <div className="w-full bg-blue-600 text-white py-2 px-4 overflow-x-hidden whitespace-nowrap text-sm font-semibold flex items-center">
                <span className="mr-4">🔥 Berita Terhot:</span>
                <marquee behavior="scroll" direction="left" scrollamount="6" className="flex-1">
                    {hotNews.map((text, i) => (
                        <span key={i} className="mr-8">{text}</span>
                    ))}
                </marquee>
            </div>
            {/* Hero Section */}
            <header className="text-center py-10 mb-8">
                <h1 className="text-5xl font-extrabold text-blue-700 mb-4 drop-shadow">Portal Berita Nusantara</h1>
                <p className="text-xl text-gray-600 mb-6">Baca berita terbaru, trending, dan terverifikasi dari seluruh Indonesia.</p>
            </header>
            {/* News Cards */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
                <section className="w-full max-w-4xl mx-auto mb-10">
                    <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Berita Populer</h2>
                    {loading ? (
                        <div className="text-center text-blue-600 py-10">Memuat berita...</div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-10">{error}</div>
                    ) : news.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">Belum ada berita.</div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-6">
                            {news.map((n, idx) => (
                                <Link
                                    key={n.id || idx}
                                    href={n.url ? n.url : `/news/${n.id}`}
                                    className="bg-white rounded-xl shadow p-0 overflow-hidden flex flex-col hover:scale-105 hover:shadow-lg transition-transform duration-200"
                                >
                                    <img src={n.image || n.thumbnail || 'https://source.unsplash.com/400x250/?news,indonesia'} alt={n.title} className="w-full h-48 object-cover" />
                                    <div className="p-4 flex-1 flex flex-col">
                                        <div className="font-bold text-lg mb-1">{n.title}</div>
                                        <div className="text-gray-600 text-sm mb-2">{n.summary || n.caption || n.description || '-'}</div>
                                        <div className="text-xs text-gray-400 mt-auto">{n.author ? `Oleh ${n.author}` : ''} {n.created_at ? `• ${new Date(n.created_at).toLocaleDateString()}` : ''}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <footer className="text-gray-400 text-xs mt-10 text-center py-6 border-t">&copy; {new Date().getFullYear()} Portal Berita Nusantara</footer>
        </div>
    );
}
