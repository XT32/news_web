import React from 'react';

export default function PrimaryButton({ children, className = '', disabled = false, ...props }) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={
                `inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled ? 'opacity-25 cursor-not-allowed' : ''} ${className}`
            }
        >
            {children}
        </button>
    );
}
