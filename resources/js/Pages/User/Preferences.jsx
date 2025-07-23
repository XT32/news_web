import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import UserLayout from '../../Layouts/UserLayout';

export default function Preferences({ auth }) {
    const [preferences, setPreferences] = useState({
        email_notifications: true,
        daily_digest: false,
        breaking_news: true,
        preferred_categories: [],
        language: 'id',
        timezone: 'Asia/Jakarta'
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        Promise.all([
            fetch('/api/user/preferences').then(res => res.json()),
            fetch('/api/categories').then(res => res.json())
        ]).then(([prefData, catData]) => {
            if (prefData.success) {
                setPreferences(prefData.data);
            }
            setCategories(catData.data || []);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await fetch('/api/user/preferences', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify(preferences)
            });

            const data = await response.json();
            if (data.success) {
                setMessage('Pengaturan berhasil disimpan!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Gagal menyimpan pengaturan. Silakan coba lagi.');
            }
        } catch (error) {
            console.error('Error saving preferences:', error);
            setMessage('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setSaving(false);
        }
    };

    const handleCategoryToggle = (categoryId) => {
        setPreferences(prev => ({
            ...prev,
            preferred_categories: prev.preferred_categories.includes(categoryId)
                ? prev.preferred_categories.filter(id => id !== categoryId)
                : [...prev.preferred_categories, categoryId]
        }));
    };

    if (loading) {
        return (
            <UserLayout>
                <Head title="Pengaturan" />
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
                </div>
            </UserLayout>
        );
    }

    return (
        <UserLayout>
            <Head title="Pengaturan" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-900">Pengaturan</h1>
                        <p className="text-gray-600 mt-2">Kelola preferensi dan pengaturan akun Anda</p>
                    </div>
                </div>

                {/* Success Message */}
                {message && (
                    <div className={`p-4 rounded-md ${message.includes('berhasil') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        {message}
                    </div>
                )}

                {/* Notification Settings */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Pengaturan Notifikasi</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label htmlFor="email-notifications" className="text-sm font-medium text-gray-700">
                                        Notifikasi Email
                                    </label>
                                    <p className="text-sm text-gray-500">Terima notifikasi melalui email</p>
                                </div>
                                <button
                                    type="button"
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                        preferences.email_notifications ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                    onClick={() => setPreferences(prev => ({ ...prev, email_notifications: !prev.email_notifications }))}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                            preferences.email_notifications ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label htmlFor="daily-digest" className="text-sm font-medium text-gray-700">
                                        Ringkasan Harian
                                    </label>
                                    <p className="text-sm text-gray-500">Terima ringkasan berita harian</p>
                                </div>
                                <button
                                    type="button"
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                        preferences.daily_digest ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                    onClick={() => setPreferences(prev => ({ ...prev, daily_digest: !prev.daily_digest }))}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                            preferences.daily_digest ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label htmlFor="breaking-news" className="text-sm font-medium text-gray-700">
                                        Berita Terkini
                                    </label>
                                    <p className="text-sm text-gray-500">Notifikasi untuk berita urgent</p>
                                </div>
                                <button
                                    type="button"
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                        preferences.breaking_news ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                    onClick={() => setPreferences(prev => ({ ...prev, breaking_news: !prev.breaking_news }))}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                            preferences.breaking_news ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Preferences */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Kategori Favorit</h3>
                        <p className="text-sm text-gray-600 mb-4">Pilih kategori berita yang Anda minati</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {categories.map(category => (
                                <div key={category.id} className="relative">
                                    <button
                                        type="button"
                                        onClick={() => handleCategoryToggle(category.id)}
                                        className={`w-full p-3 text-left border rounded-lg transition-colors ${
                                            preferences.preferred_categories.includes(category.id)
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{category.name}</span>
                                            {preferences.preferred_categories.includes(category.id) && (
                                                <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* General Settings */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Pengaturan Umum</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                                    Bahasa
                                </label>
                                <select
                                    id="language"
                                    value={preferences.language}
                                    onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="id">Bahasa Indonesia</option>
                                    <option value="en">English</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Zona Waktu
                                </label>
                                <select
                                    id="timezone"
                                    value={preferences.timezone}
                                    onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
                                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="Asia/Jakarta">WIB (Jakarta)</option>
                                    <option value="Asia/Makassar">WITA (Makassar)</option>
                                    <option value="Asia/Jayapura">WIT (Jayapura)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={saving}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Menyimpan...
                                    </>
                                ) : (
                                    'Simpan Pengaturan'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
