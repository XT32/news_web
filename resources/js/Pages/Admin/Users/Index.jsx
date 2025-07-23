import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function AdminUsersIndex() {
    const { props } = usePage();
    const { userStats, newsStats, trafficData, registrationTrend, popularCategories, employeeStats, auth } = props;

    // Chart configurations
    const trafficChartData = {
        labels: trafficData?.map(item => item.date) || [],
        datasets: [
            {
                label: 'Total Views',
                data: trafficData?.map(item => item.views) || [],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
            },
            {
                label: 'Unique Visitors',
                data: trafficData?.map(item => item.unique_visitors) || [],
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
            }
        ],
    };

    const registrationChartData = {
        labels: registrationTrend?.map(item => item.date) || [],
        datasets: [
            {
                label: 'New Registrations',
                data: registrationTrend?.map(item => item.registrations) || [],
                backgroundColor: 'rgba(139, 92, 246, 0.6)',
                borderColor: 'rgb(139, 92, 246)',
                borderWidth: 1,
            }
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <>
            <Head title="User Analytics & Statistics - Admin Panel" />
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center">
                                <Link href="/admin/dashboard" className="text-2xl font-bold text-blue-600">
                                    Admin Panel - User Analytics
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">Welcome, {auth?.user?.name}</span>
                                <Link
                                    href="/admin/dashboard"
                                    className="text-gray-700 hover:text-blue-600"
                                >
                                    Dashboard
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

                {/* Navigation */}
                <nav className="bg-blue-600 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex space-x-8">
                            <Link
                                href="/admin/dashboard"
                                className="text-blue-100 hover:text-white px-3 py-4 text-sm font-medium"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/admin/users"
                                className="text-white border-b-2 border-white px-3 py-4 text-sm font-medium"
                            >
                                User Analytics
                            </Link>
                            <Link
                                href="/admin/categories"
                                className="text-blue-100 hover:text-white px-3 py-4 text-sm font-medium"
                            >
                                Categories
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {/* User Statistics Cards */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">User Statistics Summary</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">U</span>
                                            </div>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                                                <dd className="text-lg font-medium text-gray-900">{userStats?.total_users || 0}</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">M</span>
                                            </div>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">This Month</dt>
                                                <dd className="text-lg font-medium text-gray-900">{userStats?.users_registered_this_month || 0}</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">T</span>
                                            </div>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">Today</dt>
                                                <dd className="text-lg font-medium text-gray-900">{userStats?.users_registered_today || 0}</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">A</span>
                                            </div>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">Active (7 days)</dt>
                                                <dd className="text-lg font-medium text-gray-900">{userStats?.active_users_last_7_days || 0}</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* News Engagement Statistics */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">News Engagement Summary</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">{(newsStats?.total_news_views || 0).toLocaleString()}</div>
                                        <div className="text-sm text-gray-500">Total Views</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">{(newsStats?.total_comments || 0).toLocaleString()}</div>
                                        <div className="text-sm text-gray-500">Total Comments</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-red-600">{(newsStats?.total_likes || 0).toLocaleString()}</div>
                                        <div className="text-sm text-gray-500">Total Likes</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600">{(newsStats?.total_news_shared || 0).toLocaleString()}</div>
                                        <div className="text-sm text-gray-500">Total Shares</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-orange-600">{(newsStats?.average_views_per_article || 0).toLocaleString()}</div>
                                        <div className="text-sm text-gray-500">Avg Views/Article</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Traffic Chart */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Traffic Trends (Last 30 Days)</h3>
                            </div>
                            <div className="p-6">
                                <Line data={trafficChartData} options={chartOptions} />
                            </div>
                        </div>

                        {/* Registration Chart */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">User Registrations (Last 30 Days)</h3>
                            </div>
                            <div className="p-6">
                                <Bar data={registrationChartData} options={chartOptions} />
                            </div>
                        </div>
                    </div>

                    {/* Popular Categories */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Categories by Engagement</h2>
                        <div className="bg-white shadow overflow-hidden sm:rounded-md">
                            <ul className="divide-y divide-gray-200">
                                {popularCategories?.map((category, index) => (
                                    <li key={category.id} className="px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-600 font-bold">{index + 1}</span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                                    <div className="text-sm text-gray-500">{category.news_count} articles</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-medium text-gray-900">{(category.total_views || 0).toLocaleString()} views</div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Employee Performance (Non-sensitive) */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Employee Performance Summary</h2>
                        <div className="bg-white shadow overflow-hidden sm:rounded-md">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <p className="text-sm text-gray-600">Top performing employees by article count and engagement</p>
                            </div>
                            <ul className="divide-y divide-gray-200">
                                {employeeStats?.map((employee, index) => (
                                    <li key={employee.id} className="px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                    <span className="text-green-600 font-bold">{index + 1}</span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                                    <div className="text-sm text-gray-500">{employee.email}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {employee.published_news_count}/{employee.news_count} published
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {(employee.news_sum_views || 0).toLocaleString()} total views
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800">Privacy Protection Notice</h3>
                                <div className="mt-2 text-sm text-yellow-700">
                                    <p>Individual user data is protected and not displayed. Only aggregate statistics and anonymous metrics are shown for privacy compliance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
