import React, { useEffect, useState } from "react";
import '../../../css/layout.css';

export default function RunningText() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetch('/api/news/trending')
      .then(res => res.json())
      .then(setTrending)
      .catch(() => setTrending([]));
  }, []);

  return (
    <div className="running-text">
      <span>Trending: </span>
      {trending.length === 0 ? (
        <span>Tidak ada berita trending.</span>
      ) : (
        trending.map((item, idx) => (
          <span key={item.id}>{item.title}{idx < trending.length - 1 ? ' • ' : ''}</span>
        ))
      )}
    </div>
  );
}
