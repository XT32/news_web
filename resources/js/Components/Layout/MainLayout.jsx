import React from 'react';
import NavbarJurnalis from '@/Components/Layout/NavbarJurnalis';
import RunningText from '@/Components/Layout/RunningText';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <NavbarJurnalis />
            <RunningText />
            <main className="max-w-5xl mx-auto p-4">
                {children}
            </main>
        </div>
    );
}
