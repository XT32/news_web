import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function EmployeeDashboard() {
    const { props } = usePage();
    const { stats, recentNews, auth } = props;

    return (
        <>
            <Head title="Employee Dashboard - Laravel News" />
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center">
                                <Link href="/" className="text-2xl font-bold text-green-600">
                                    Laravel News - Employee Panel
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">Welcome, {auth?.user?.name}</span>
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
                                    href="/employee/dashboard"
                                    className="border-green-500 text-green-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/employee/news"
                                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                                >
                                    My News
                                </Link>
                                <Link
                                    href="/employee/news/create"
                                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                                >
                                    Create News
                                </Link>
                            </nav>
                        </div>
                    </nav>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">N</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                My News
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900">
                                                {stats?.myNews || 0}
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
                                            <span className="text-white text-sm font-medium">P</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Published
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900">
                                                {stats?.publishedNews || 0}
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
                                        <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">D</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Drafts
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900">
                                                {stats?.draftNews || 0}
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
                                            <span className="text-white text-sm font-medium">V</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Total Views
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900">
                                                {stats?.totalViews || 0}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent News */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    My Recent News
                                </h3>
                                <Link
                                    href="/employee/news/create"
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
                                >
                                    Create New Article
                                </Link>
                            </div>
                            
                            {recentNews?.length > 0 ? (
                                <div className="space-y-4">
                                    {recentNews.map((news) => (
                                        <div key={news.id} className="flex items-start space-x-3 pb-4 border-b border-gray-200 last:border-b-0">
                                            <img
                                                src={news.thumbnail || '/placeholder.jpg'}
                                                alt={news.title}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {news.title}
                                                    </p>
                                                    <div className="flex space-x-2 ml-4">
                                                        <Link
                                                            href={`/employee/news/${news.id}/edit`}
                                                            className="text-blue-600 hover:text-blue-500 text-sm"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Link
                                                            href={`/news/${news.slug}`}
                                                            className="text-green-600 hover:text-green-500 text-sm"
                                                        >
                                                            View
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    {news.categories?.map((category) => (
                                                        <span
                                                            key={category.id}
                                                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                                                        >
                                                            {category.name}
                                                        </span>
                                                    ))}
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {news.views} views • Status: 
                                                    <span className={`ml-1 ${news.status === 'published' ? 'text-green-600' : 'text-yellow-600'}`}>
                                                        {news.status}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">You haven't created any news articles yet.</p>
                                    <Link
                                        href="/employee/news/create"
                                        className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
                                    >
                                        Create Your First Article
                                    </Link>
                                </div>
                            )}
                            
                            {recentNews?.length > 0 && (
                                <div className="mt-4">
                                    <Link
                                        href="/employee/news"
                                        className="text-green-600 hover:text-green-500 text-sm font-medium"
                                    >
                                        View all my news →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
