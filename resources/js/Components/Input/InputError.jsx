import React from 'react';

export default function InputError({ message, className = '' }) {
    if (!message) return null;
    return (
        <p className={`text-red-600 text-xs mt-1 ${className}`}>{message}</p>
    );
}
