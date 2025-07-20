import React from 'react';

export default function SecondaryButton({ className = '', disabled = false, children, ...props }) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={
                `inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled ? 'opacity-25 cursor-not-allowed' : ''} ${className}`
            }
        >
            {children}
        </button>
    );
}
