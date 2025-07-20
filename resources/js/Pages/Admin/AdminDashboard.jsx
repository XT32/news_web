import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ users: 0, employees: 0, news: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/admin/stats')
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(() => { setError('Gagal memuat statistik'); setLoading(false); });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow mb-8">
                <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <span className="font-bold text-xl text-blue-700">Admin Portal Berita</span>
                        <Link href="/admin" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</Link>
                        <Link href="/admin/users" className="text-gray-700 hover:text-blue-600 font-medium">User</Link>
                        <Link href="/admin/employees" className="text-gray-700 hover:text-blue-600 font-medium">Karyawan</Link>
                        <Link href="/admin/news" className="text-gray-700 hover:text-blue-600 font-medium">Berita</Link>
                    </div>
                    <form method="POST" action="/logout">
                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
                    </form>
                </div>
            </nav>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Dashboard Admin</h2>
                {loading ? <div>Memuat statistik...</div> : error ? <div className="text-red-600">{error}</div> : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-blue-50 p-4 rounded text-center">
                            <div className="text-2xl font-bold">{stats.users}</div>
                            <div className="text-gray-600">Total User</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded text-center">
                            <div className="text-2xl font-bold">{stats.employees}</div>
                            <div className="text-gray-600">Total Karyawan</div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded text-center">
                            <div className="text-2xl font-bold">{stats.news}</div>
                            <div className="text-gray-600">Total Berita</div>
                        </div>
                    </div>
                )}
                <div className="flex flex-wrap gap-4 mt-8">
                    <Link href="/admin/news-performance" className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 font-semibold">Performa Berita</Link>
                    <Link href="/admin/employee-performance" className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700 font-semibold">Performa Karyawan</Link>
                    <Link href="/admin/news" className="bg-gray-200 text-gray-800 px-6 py-3 rounded shadow hover:bg-gray-300 font-semibold">Audit Berita</Link>
                </div>
            </div>
        </div>
    );
}
