import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import NewsCardDashboard from '../../Components/Card/NewsCardDashboard.jsx';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allNews, setAllNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);

    useEffect(() => {
        fetch('/api/user')
            .then(res => res.json())
            .then(data => { setUser(data); setLoading(false); })
            .catch(() => setLoading(false));
        fetch('/api/notifications')
            .then(res => res.json())
            .then(data => setNotifications(data));
        fetch('/api/news')
            .then(res => res.json())
            .then(data => { setAllNews(data); setLoadingNews(false); })
            .catch(() => setLoadingNews(false));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow mb-8">
                <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <span className="font-bold text-xl text-blue-700">Portal Berita</span>
                        <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</Link>
                        <Link href="/profile" className="text-gray-700 hover:text-blue-600 font-medium">Profil</Link>
                        <Link href="/notifications" className="text-gray-700 hover:text-blue-600 font-medium">Notifikasi</Link>
                    </div>
                    <form method="POST" action="/logout">
                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
                    </form>
                </div>
            </nav>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Dashboard Pengguna</h2>
                {loading ? <div>Memuat data...</div> : user && (
                    <div className="mb-6">
                        <div className="font-semibold">Halo, {user.name}</div>
                        <div className="text-gray-500 text-sm">Email: {user.email}</div>
                    </div>
                )}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Notifikasi</h3>
                    {notifications.length === 0 ? (
                        <div className="text-gray-500">Tidak ada notifikasi.</div>
                    ) : (
                        <ul className="list-disc list-inside text-gray-700">
                            {notifications.map((n, i) => <li key={i}>{n.message || n}</li>)}
                        </ul>
                    )}
                </div>
                <div className="flex flex-wrap gap-4 mt-8 mb-8">
                    <Link href="/profile" className="bg-gray-200 text-gray-800 px-6 py-3 rounded shadow hover:bg-gray-300 font-semibold">Edit Profil</Link>
                    <Link href="/password/change" className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 font-semibold">Ganti Password</Link>
                </div>
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
