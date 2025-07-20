import React from 'react';
import '../../../css/input.css'

export default function DropdownKategori({ kategoriList, selectedKategori, onChange }) {
  return (
    <div className="dropdown-kategori">
      <label>Pilih Kategori</label>
      <select
        id="kategori"
        value={selectedKategori}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Pilih Kategori --</option>
        {kategoriList.map((kategori) => (
          <option key={kategori.id} value={kategori.kategori}>
            {kategori.kategori}
          </option>
        ))}
      </select>
    </div>
  );
}
