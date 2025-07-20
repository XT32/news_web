import React from 'react';

export default function NewsCardDashboard({ news }) {
  // Cek apakah berita dari API atau lokal
  const isApi = !news.id || news.source_name || news.published_at;
  return (
    <div className="border rounded shadow-sm p-4 bg-gray-50 hover:bg-gray-100 transition">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-bold text-lg mb-1">{news.title}</div>
          <div className="text-gray-600 text-sm mb-2">{news.summary || news.description}</div>
          <div className="text-xs text-gray-400">
            {isApi ? (
              <>
                Sumber: <span className="font-semibold">API News</span>{news.source_name ? ` (${news.source_name})` : ''} &middot; {news.published_at ? new Date(news.published_at).toLocaleString() : ''}
              </>
            ) : (
              <>
                Sumber: <span className="font-semibold">Lokal</span> &middot; {news.created_at ? new Date(news.created_at).toLocaleString() : ''}
              </>
            )}
          </div>
        </div>
        <div className="mt-2 md:mt-0 md:ml-4 flex-shrink-0">
          {news.url && (
            <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium">Baca Selengkapnya</a>
          )}
        </div>
      </div>
    </div>
  );
}
