import React from 'react';
import NavbarAdmin from '@/Components/Layout/NavbarAdmin';

export default function AdminLayout({ children }) {
    return (
        <div className="dashboardAdmin">
            <aside>
                <NavbarAdmin />
            </aside>
            <main>
                {children}
            </main>
        </div>
    );
}
