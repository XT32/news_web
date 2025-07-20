import React, { useState } from 'react';
import '../../../css/input.css';

const SortTimeCustom = ({ onApply }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleApply = () => {
    if (!startDate || !endDate) {
      alert('please fill in both dates');
      return;
    }

    if (onApply) {
      onApply({ startDate, endDate });
    }
  };

  return (
    <div className="sortTimeCustom">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <span></span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={handleApply}>Apply Time</button>
    </div>
  );
};

export default SortTimeCustom;
