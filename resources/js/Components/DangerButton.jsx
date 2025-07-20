import React from 'react';

export default function DangerButton({ children, className = '', ...props }) {
    return (
        <button
            {...props}
            className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition ${className}`}
        >
            {children}
        </button>
    );
}
