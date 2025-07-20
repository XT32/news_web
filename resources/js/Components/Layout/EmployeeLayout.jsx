import React from 'react';
import NavbarJurnalis from '@/Components/Layout/NavbarJurnalis';

export default function EmployeeLayout({ children }) {
    return (
        <div className="dashboardAdmin">
            <aside>
                <NavbarJurnalis />
            </aside>
            <main>
                {children}
            </main>
        </div>
    );
}
