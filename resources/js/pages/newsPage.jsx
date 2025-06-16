import React, { useEffect, useState } from 'react';
import { fetchLocalNews, fetchApiNews } from '../../services/api';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [local, api] = await Promise.all([fetchLocalNews(), fetchApiNews()]);
        const all = [
          ...local.map(n => ({ ...n, source: 'local' })),
          ...api.map(n => ({ ...n, source: 'api' })),
        ].sort((a, b) => new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at));
        setNews(all);
      } catch (err) {
        setError('Gagal memuat berita. Periksa koneksi atau server API.');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <div>
      {loading && <div>Memuat berita...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && news.length === 0 && <div>Tidak ada berita.</div>}
      {!loading && !error && news.length > 0 && (
        <div>
          {news.map(item => (
            <div key={item.id || item.url}>
              <b>[{item.source === 'local' ? 'Lokal' : (item.source_name || 'API')}]</b> {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsPage;