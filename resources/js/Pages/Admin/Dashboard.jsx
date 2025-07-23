import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';

export default function AdminDashboard() {
    const { props } = usePage();
    const { auth, stats, userRegistrationTrend, employeePerformance, recentNews, topNews } = props;

    const formatNumber = (num) => {
        return new Intl.NumberFormat().format(num);
    };

    return (
        <>
            <Head title="Admin Dashboard - Laravel News" />
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center">
                                <Link href="/" className="text-2xl font-bold text-blue-600">
                                    Laravel News - Admin Monitoring
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">Admin: {auth?.user?.name}</span>
                                <Link
                                    href="/"
                                    className="text-gray-700 hover:text-blue-600"
                                >
                                    View Site
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="text-gray-700 hover:text-blue-600"
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {/* Navigation */}
                    <nav className="mb-8">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8">
                                <Link
                                    href="/admin/dashboard"
                                    className="border-blue-500 text-blue-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                                >
                                    Monitoring Dashboard
                                </Link>
                                <Link
                                    href="/admin/users"
                                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                                >
                                    Employee Management
                                </Link>
                                <Link
                                    href="/admin/categories"
                                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                                >
                                    Categories
                                </Link>
                            </nav>
                        </div>
                    </nav>

                    {/* Stats Cards */}
                                        {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Website Monitoring Dashboard</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Monitor website performance, user activity, and employee productivity
                        </p>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Total Articles
                                            </dt>
                                            <dd className="text-3xl font-bold text-gray-900">
                                                {formatNumber(stats?.totalNews || 0)}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Total Views
                                            </dt>
                                            <dd className="text-3xl font-bold text-gray-900">
                                                {formatNumber(stats?.totalViews || 0)}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Registered Users
                                            </dt>
                                            <dd className="text-3xl font-bold text-gray-900">
                                                {formatNumber(stats?.totalUsers || 0)}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Active Employees
                                            </dt>
                                            <dd className="text-3xl font-bold text-gray-900">
                                                {formatNumber(stats?.totalEmployees || 0)}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent News */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                    Recent News
                                </h3>
                                <div className="space-y-4">
                                    {recentNews?.map((news) => (
                                        <div key={news.id} className="flex items-start space-x-3 pb-4 border-b border-gray-200 last:border-b-0">
                                            <img
                                                src={news.thumbnail || '/placeholder.jpg'}
                                                alt={news.title}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {news.title}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    By {news.user?.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {news.views} views • {news.status}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <Link
                                        href="/admin/news"
                                        className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                                    >
                                        View all news →
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Top Performing News */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                    Top Performing News
                                </h3>
                                <div className="space-y-4">
                                    {topNews?.map((news, index) => (
                                        <div key={news.id} className="flex items-start space-x-3 pb-4 border-b border-gray-200 last:border-b-0">
                                            <div className="flex-shrink-0">
                                                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                                                    {index + 1}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {news.title}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    By {news.user?.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {news.views} views
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
