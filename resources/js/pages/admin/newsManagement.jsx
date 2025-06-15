import React, { useEffect, useState } from 'react';
import { fetchLocalNews, uploadNews } from '../../services/api';

const NewsManagement = () => {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState({ title: '', summary: '', content: '', thumbnail: '' });

  useEffect(() => { fetchLocalNews().then(setNews); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await uploadNews(form);
    fetchLocalNews().then(setNews);
    setForm({ title: '', summary: '', content: '', thumbnail: '' });
  };

  return (
    <div>
      <h2>Manajemen Berita Lokal</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Judul" required />
        <input name="summary" value={form.summary} onChange={handleChange} placeholder="Ringkasan" required />
        <input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="URL Gambar" />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Konten" required />
        <button type="submit">Upload</button>
      </form>
      <ul>
        {news.map(item => (
          <li key={item.id}>{item.title} - {item.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default NewsManagement;