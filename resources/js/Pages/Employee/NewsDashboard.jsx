
import React, { useEffect, useState } from 'react';

export default function NewsDashboard() {
    const [news, setNews] = useState([]);
    const [form, setForm] = useState({ title: '', summary: '', content: '', thumbnail: null });
    const [editingId, setEditingId] = useState(null);
    const [showDeleted, setShowDeleted] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchNews();
    }, [showDeleted]);

    const fetchNews = async () => {
        const res = await fetch('/employee/news/list' + (showDeleted ? '?trashed=1' : ''));
        const data = await res.json();
        setNews(data);
    };

    const handleChange = e => {
        const { name, value, files } = e.target;
        setForm(f => ({ ...f, [name]: files ? files[0] : value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(form).forEach(([k, v]) => v && formData.append(k, v));
        let url = '/employee/news';
        let method = editingId ? 'PUT' : 'POST';
        if (editingId) url += `/${editingId}`;
        const res = await fetch(url, { method, body: formData });
        if (res.ok) {
            setMessage(editingId ? 'Berita diupdate!' : 'Berita ditambahkan!');
            setForm({ title: '', summary: '', content: '', thumbnail: null });
            setEditingId(null);
            fetchNews();
        } else {
            setMessage('Gagal menyimpan berita');
        }
    };

    const handleEdit = n => {
        setForm({ title: n.title, summary: n.summary, content: n.content, thumbnail: null });
        setEditingId(n.id);
    };

    const handleDelete = async id => {
        if (!window.confirm('Hapus berita ini?')) return;
        const res = await fetch(`/employee/news/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setMessage('Berita dihapus (soft delete)');
            fetchNews();
        }
    };

    const handleRestore = async id => {
        const res = await fetch(`/employee/news/${id}/restore`, { method: 'POST' });
        if (res.ok) {
            setMessage('Berita dipulihkan!');
            fetchNews();
        }
    };

    // Navigation bar for karyawan
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

            <div className="max-w-5xl mx-auto p-4 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Kelola Berita Anda</h2>
                {message && <div className="mb-2 text-green-600">{message}</div>}
                <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                    <input name="title" value={form.title} onChange={handleChange} placeholder="Judul" className="w-full border p-2 rounded" required />
                    <textarea name="summary" value={form.summary} onChange={handleChange} placeholder="Ringkasan" className="w-full border p-2 rounded" required />
                    <textarea name="content" value={form.content} onChange={handleChange} placeholder="Konten" className="w-full border p-2 rounded" required />
                    <input type="file" name="thumbnail" onChange={handleChange} accept="image/*" className="w-full" />
                    <div className="flex items-center space-x-2">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Tambah'} Berita</button>
                        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', summary: '', content: '', thumbnail: null }); }} className="text-gray-600 border px-3 py-2 rounded">Batal Edit</button>}
                    </div>
                </form>
                <div className="mb-4">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={showDeleted} onChange={e => setShowDeleted(e.target.checked)} />
                        <span>Tampilkan berita terhapus</span>
                    </label>
                </div>
                <h3 className="text-lg font-semibold mb-2">Statistik Performa Berita</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border mb-8 text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2">Judul</th>
                                <th className="p-2">Ringkasan</th>
                                <th className="p-2">Views</th>
                                <th className="p-2">Likes</th>
                                <th className="p-2">Comments</th>
                                <th className="p-2">Shares</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {news.length === 0 && (
                                <tr><td colSpan="8" className="text-center py-4 text-gray-500">Belum ada berita</td></tr>
                            )}
                            {news.map(n => (
                                <tr key={n.id} className={n.deleted_at ? 'bg-red-100' : ''}>
                                    <td className="p-2 font-medium">{n.title}</td>
                                    <td className="p-2">{n.summary}</td>
                                    <td className="p-2">{n.traffic_count ?? n.views ?? 0}</td>
                                    <td className="p-2">{n.likes_count ?? 0}</td>
                                    <td className="p-2">{n.comments_count ?? 0}</td>
                                    <td className="p-2">{n.shares_count ?? 0}</td>
                                    <td className="p-2">{n.deleted_at ? 'Terhapus' : 'Aktif'}</td>
                                    <td className="p-2">
                                        {!n.deleted_at && <>
                                            <button onClick={() => handleEdit(n)} className="text-blue-600 hover:underline mr-2">Edit</button>
                                            <button onClick={() => handleDelete(n.id)} className="text-red-600 hover:underline">Hapus</button>
                                        </>}
                                        {n.deleted_at && <button onClick={() => handleRestore(n.id)} className="text-green-600 hover:underline">Restore</button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
