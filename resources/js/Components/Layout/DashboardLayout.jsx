import React from 'react';
import NavbarJurnalis from '@/Components/Layout/NavbarJurnalis';
import NavbarAdmin from '@/Components/Layout/NavbarAdmin';

export default function DashboardLayout({ role, children }) {
    let navbar = null;
    if (role === 'admin') {
        navbar = <NavbarAdmin />;
    } else if (role === 'karyawan') {
        navbar = <NavbarJurnalis />;
    } else {
        navbar = <NavbarJurnalis />;
    }
    return (
        <div className="min-h-screen bg-gray-50">
            {navbar}
            <main className="max-w-5xl mx-auto p-4">
                {children}
            </main>
        </div>
    );
}
