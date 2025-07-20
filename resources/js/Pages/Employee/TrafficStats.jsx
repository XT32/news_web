import React, { useEffect, useState } from 'react';

export default function EmployeeTrafficStats() {
    const [news, setNews] = useState([]);
    const [filter, setFilter] = useState({ news_id: '', date_from: '', date_to: '' });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        const params = new URLSearchParams(filter).toString();
        const res = await fetch('/employee/traffic-stats' + (params ? `?${params}` : ''));
        const data = await res.json();
        setNews(data);
    };

    const handleChange = e => {
        setFilter(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Statistik Traffic Berita Saya</h2>
            <div className="mb-4 flex gap-2">
                <input name="news_id" value={filter.news_id} onChange={handleChange} placeholder="ID Berita (opsional)" className="border p-2" />
                <input type="date" name="date_from" value={filter.date_from} onChange={handleChange} className="border p-2" />
                <input type="date" name="date_to" value={filter.date_to} onChange={handleChange} className="border p-2" />
                <button onClick={fetchStats} className="bg-blue-600 text-white px-4 py-2 rounded">Filter</button>
            </div>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th>Judul</th>
                        <th>Views</th>
                        <th>Likes</th>
                        <th>Comments</th>
                        <th>Shares</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {news.map(n => (
                        <tr key={n.id}>
                            <td>{n.title}</td>
                            <td>{n.traffic_count}</td>
                            <td>{n.likes_count}</td>
                            <td>{n.comments_count}</td>
                            <td>{n.shares_count}</td>
                            <td>{n.deleted_at ? 'Terhapus' : n.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
