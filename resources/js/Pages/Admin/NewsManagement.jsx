import React, { useEffect, useState } from 'react';
import { fetchLocalNews, uploadNews } from '../../../services/api';

const NewsManagement = () => {
    const [news, setNews] = useState([]);
    const [form, setForm] = useState({ title: '', summary: '', content: '', thumbnail: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadNews = () => {
        setIsLoading(true);
        setError(null);
        fetchLocalNews()
            .then(data => {
                if (Array.isArray(data)) {
                    setNews(data);
                } else {
                    setNews([]);
                }
            })
            .catch(err => setError('Gagal memuat berita. Periksa koneksi atau endpoint API.'))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        loadNews();
    }, []);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!form.title || !form.content) {
            setError('Judul dan Konten tidak boleh kosong.');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            await uploadNews(form);
            setForm({ title: '', summary: '', content: '', thumbnail: '' });
            loadNews();
        } catch (err) {
            setError('Gagal mengupload berita. Pastikan Anda sudah login dan data benar.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Manajemen Berita Lokal</h2>

            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">{error}</div>}

            <div className="bg-white p-8 rounded-xl shadow-md mb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" name="title" value={form.title} onChange={handleChange} placeholder="Judul Berita" required />
                    <input className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" name="summary" value={form.summary} onChange={handleChange} placeholder="Ringkasan Singkat" />
                    <input className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="URL Gambar (Thumbnail)" />
                    <textarea className="w-full p-3 border border-gray-300 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-500" name="content" value={form.content} onChange={handleChange} placeholder="Isi Konten Berita" required />
                    <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 transition duration-300">
                        {isLoading ? 'Mengupload...' : 'Upload Berita'}
                    </button>
                </form>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
                 <h3 className="text-2xl font-bold mb-4 text-gray-700">Daftar Berita</h3>
                <ul className="space-y-4">
                    {isLoading && news.length === 0 ? <p>Memuat berita...</p> : null}
                    {!isLoading && news.length === 0 ? <p className="text-gray-500">Belum ada berita atau gagal memuat data.</p> : null}
                    {news.map(item => (
                        <li key={item.id} className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <span className="text-gray-800 font-medium">{item.title}</span>
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {item.status || 'draft'}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NewsManagement;
