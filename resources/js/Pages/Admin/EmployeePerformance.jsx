import React, { useEffect, useState } from 'react';

export default function EmployeePerformance() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/admin/employee-performance')
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Performa Karyawan</h2>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Jumlah Berita</th>
                        <th>Total Views</th>
                        <th>Likes</th>
                        <th>Comments</th>
                        <th>Shares</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(emp => (
                        <tr key={emp.id}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.news_count}</td>
                            <td>{emp.total_views}</td>
                            <td>{emp.total_likes}</td>
                            <td>{emp.total_comments}</td>
                            <td>{emp.total_shares}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
