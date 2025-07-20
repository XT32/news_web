import React from 'react';

export default function TextInput({ id, className = '', type = 'text', name, value, onChange, required, isFocused, autoComplete }) {
    return (
        <input
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            autoFocus={isFocused}
            autoComplete={autoComplete}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' + className
            }
        />
    );
}
