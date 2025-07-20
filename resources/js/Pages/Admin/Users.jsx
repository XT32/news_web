import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/admin/public-users-activity', {
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'same-origin',
        })
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Gagal memuat data user');
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-8">
            <Head title="Manajemen User" />
            <h1 className="text-2xl font-bold mb-4">Manajemen User</h1>
            {loading && <div>Memuat data...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && (
                <table className="min-w-full bg-white rounded shadow">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Nama</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-center">Like</th>
                            <th className="px-4 py-2 text-center">Comment</th>
                            <th className="px-4 py-2 text-center">Share</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b">
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2 text-center">{user.likes}</td>
                                <td className="px-4 py-2 text-center">{user.comments}</td>
                                <td className="px-4 py-2 text-center">{user.shares}</td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr><td colSpan={5} className="text-center py-4">Belum ada user publik.</td></tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
