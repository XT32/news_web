import React from 'react';
import '../../../css/button.css'

export default function PaginationDashboard({ currentPage, setCurrentPage, totalPages, startIndex, endIndex, totalItems }) {
  return (
    <div className="table-pagination">
      <span className="results-count">
        Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} results
      </span>
      <div className="pagination-buttons">
        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
}
