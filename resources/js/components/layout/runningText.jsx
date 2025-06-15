import React, { useEffect, useState } from "react";
import { fetchTrendingNews } from "../../../services/api";
import '../../../css/layout.css'

export default function RunningText() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetchTrendingNews().then(setTrending);
  }, []);

  return (
    <div className="running-text">
      <span>Trending: </span>
      {trending.map((item, idx) => (
        <span key={item.id}>{item.title}{idx < trending.length - 1 ? ' • ' : ''}</span>
      ))}
    </div>
  );
}
