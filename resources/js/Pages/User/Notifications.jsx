import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import UserLayout from '../../Layouts/UserLayout';

export default function Notifications({ auth }) {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetch('/api/user/notifications')
            .then(res => res.json())
            .then(data => {
                setNotifications(data.data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
                setLoading(false);
            });
    }, []);

    const markAsRead = async (notificationId) => {
        try {
            const response = await fetch(`/api/user/notifications/${notificationId}/read`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            });

            if (response.ok) {
                setNotifications(notifications.map(notif => 
                    notif.id === notificationId ? { ...notif, read_at: new Date().toISOString() } : notif
                ));
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            const response = await fetch('/api/user/notifications/mark-all-read', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            });

            if (response.ok) {
                setNotifications(notifications.map(notif => ({ 
                    ...notif, 
                    read_at: notif.read_at || new Date().toISOString() 
                })));
            }
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            const response = await fetch(`/api/user/notifications/${notificationId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            });

            if (response.ok) {
                setNotifications(notifications.filter(notif => notif.id !== notificationId));
            }
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const filteredNotifications = notifications.filter(notif => {
        if (filter === 'unread') return !notif.read_at;
        if (filter === 'read') return notif.read_at;
        return true;
    });

    const unreadCount = notifications.filter(notif => !notif.read_at).length;

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'news':
                return (
                    <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                );
            case 'system':
                return (
                    <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                );
            default:
                return (
                    <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
        }
    };

    return (
        <UserLayout>
            <Head title="Notifikasi" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Notifikasi</h1>
                                <p className="text-gray-600 mt-2">
                                    {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : 'Semua notifikasi sudah dibaca'}
                                </p>
                            </div>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Tandai Semua Dibaca
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Filter */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 text-sm font-medium rounded-md ${
                                    filter === 'all'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Semua ({notifications.length})
                            </button>
                            <button
                                onClick={() => setFilter('unread')}
                                className={`px-4 py-2 text-sm font-medium rounded-md ${
                                    filter === 'unread'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Belum Dibaca ({unreadCount})
                            </button>
                            <button
                                onClick={() => setFilter('read')}
                                className={`px-4 py-2 text-sm font-medium rounded-md ${
                                    filter === 'read'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Sudah Dibaca ({notifications.length - unreadCount})
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="divide-y divide-gray-200">
                        {loading ? (
                            <div className="flex justify-center items-center h-32">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            </div>
                        ) : filteredNotifications.length === 0 ? (
                            <div className="text-center py-12">
                                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM11.613 15.984l-3.64-3.64a3 3 0 114.243-4.243l3.64 3.64m-4.243 4.243a3 3 0 01-4.243-4.243m4.243 4.243L11.613 15.984zM9.172 9.172L7.05 7.05a1.414 1.414 0 00-2 2l2.122 2.122m0 0L9.172 9.172z" />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada notifikasi</h3>
                                <p className="text-gray-500">
                                    {filter === 'unread' ? 'Semua notifikasi sudah dibaca' : 'Anda belum memiliki notifikasi'}
                                </p>
                            </div>
                        ) : (
                            filteredNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-6 ${!notification.read_at ? 'bg-blue-50' : ''}`}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            {getNotificationIcon(notification.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <p className={`text-sm font-medium ${!notification.read_at ? 'text-gray-900' : 'text-gray-600'}`}>
                                                    {notification.title || 'Notifikasi'}
                                                </p>
                                                <div className="flex items-center space-x-2">
                                                    {!notification.read_at && (
                                                        <button
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="text-xs text-blue-600 hover:text-blue-800"
                                                        >
                                                            Tandai dibaca
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteNotification(notification.id)}
                                                        className="text-xs text-red-600 hover:text-red-800"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                            <p className={`mt-1 text-sm ${!notification.read_at ? 'text-gray-700' : 'text-gray-500'}`}>
                                                {notification.message || notification.data?.message || 'Tidak ada pesan'}
                                            </p>
                                            <p className="mt-2 text-xs text-gray-400">
                                                {new Date(notification.created_at).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                        {!notification.read_at && (
                                            <div className="flex-shrink-0">
                                                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
