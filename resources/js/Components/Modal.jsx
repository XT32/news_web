import React from 'react';

export default function Modal({ show, onClose, children }) {
    if (!show) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 relative min-w-[320px] max-w-lg w-full">
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}
