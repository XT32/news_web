
import NewsCardDashboard from '../../Components/Card/NewsCardDashboard.jsx';

export default function EmployeeDashboard() {
    const [stats, setStats] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [allNews, setAllNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);

    useEffect(() => {
        fetch('/api/user')
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(() => setUser(null));
        fetch('/employee/news/list')
            .then(res => res.json())
            .then(data => {
                // Hitung statistik berita
                const total = data.length;
                const views = data.reduce((a, n) => a + (n.traffic_count ?? n.views ?? 0), 0);
                const likes = data.reduce((a, n) => a + (n.likes_count ?? 0), 0);
                const comments = data.reduce((a, n) => a + (n.comments_count ?? 0), 0);
                const shares = data.reduce((a, n) => a + (n.shares_count ?? 0), 0);
                setStats({ total, views, likes, comments, shares });
                setLoading(false);
            })
            .catch(() => { setStats(null); setLoading(false); setError('Gagal memuat statistik'); });
        // Fetch all news (API + local)
        fetch('/api/news')
            .then(res => res.json())
            .then(data => { setAllNews(data); setLoadingNews(false); })
            .catch(() => setLoadingNews(false));
    }, []);

    const handleLogout = async () => {
        await fetch('/logout', { method: 'POST' });
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow mb-8">
                <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <span className="font-bold text-xl text-blue-700">Portal Berita Karyawan</span>
                        <a href="/employee/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</a>
                        <a href="/employee/news" className="text-gray-700 hover:text-blue-600 font-medium">Kelola Berita</a>
                        <a href="/profile/edit" className="text-gray-700 hover:text-blue-600 font-medium">Profil</a>
                    </div>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
                </div>
            </nav>

            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Dashboard Karyawan</h2>
                {user && (
                    <div className="mb-6">
                        <div className="font-semibold">Halo, {user.name}</div>
                        <div className="text-gray-500 text-sm">Email: {user.email}</div>
                    </div>
                )}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Statistik Berita Anda</h3>
                    {loading ? <div>Memuat statistik...</div> : error ? <div className="text-red-600">{error}</div> : stats && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-blue-50 p-4 rounded text-center">
                                <div className="text-2xl font-bold">{stats.total}</div>
                                <div className="text-gray-600">Total Berita</div>
                            </div>
                            <div className="bg-green-50 p-4 rounded text-center">
                                <div className="text-2xl font-bold">{stats.views}</div>
                                <div className="text-gray-600">Total Views</div>
                            </div>
                            <div className="bg-pink-50 p-4 rounded text-center">
                                <div className="text-2xl font-bold">{stats.likes}</div>
                                <div className="text-gray-600">Total Likes</div>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded text-center">
                                <div className="text-2xl font-bold">{stats.comments}</div>
                                <div className="text-gray-600">Total Comments</div>
                            </div>
                            <div className="bg-purple-50 p-4 rounded text-center col-span-2 md:col-span-1">
                                <div className="text-2xl font-bold">{stats.shares}</div>
                                <div className="text-gray-600">Total Shares</div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap gap-4 mt-8">
                    <a href="/employee/news" className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 font-semibold">Kelola Berita</a>
                    <a href="/employee/traffic-stats-page" className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700 font-semibold">Statistik Trafik</a>
                    <a href="/profile/edit" className="bg-gray-200 text-gray-800 px-6 py-3 rounded shadow hover:bg-gray-300 font-semibold">Edit Profil</a>
                </div>

                {/* Daftar semua berita (API + lokal) */}
                <div className="mt-10">
                  <h3 className="text-lg font-bold mb-4">Semua Berita (API & Lokal)</h3>
                  {loadingNews ? (
                    <div>Memuat berita...</div>
                  ) : (
                    <div className="space-y-4">
                      {allNews.length === 0 ? (
                        <div className="text-gray-500">Belum ada berita.</div>
                      ) : (
                        allNews.map((n, i) => <NewsCardDashboard key={n.id || i} news={n} />)
                      )}
                    </div>
                  )}
                </div>
            </div>
        </div>
    );
}
