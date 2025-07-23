import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';

export default function EmployeeNewsIndex() {
    const { props } = usePage();
    const { news, auth } = props;

    const handleDelete = (newsId) => {
        if (confirm('Are you sure you want to delete this article?')) {
            router.delete(`/employee/news/${newsId}`);
        }
    };

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-800';
            case 'draft':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <Head title="My Articles - Employee Panel" />
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center">
                                <Link href="/" className="text-2xl font-bold text-green-600">
                                    Laravel News - Employee Portal
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">Welcome, {auth?.user?.name}</span>
                                <Link
                                    href="/"
                                    className="text-gray-700 hover:text-green-600"
                                >
                                    View Site
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="text-gray-700 hover:text-green-600"
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
                                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/employee/news"
                                    className="border-green-500 text-green-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                                >
                                    My Articles
                                </Link>
                                <Link
                                    href="/employee/news/create"
                                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                                >
                                    Create Article
                                </Link>
                            </nav>
                        </div>
                    </nav>

                    {/* Page Header */}
                    <div className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Articles</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Manage and edit your news articles
                            </p>
                        </div>
                        <Link
                            href="/employee/news/create"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                            Create New Article
                        </Link>
                    </div>

                    {/* Articles Table */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 sm:p-6">
                            {news?.data && news.data.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Article
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Categories
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Views
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Created
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {news.data.map((article) => (
                                                <tr key={article.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            {article.thumbnail && (
                                                                <div className="flex-shrink-0 h-16 w-16">
                                                                    <img
                                                                        className="h-16 w-16 rounded-lg object-cover"
                                                                        src={article.thumbnail}
                                                                        alt={article.title}
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className={article.thumbnail ? "ml-4" : ""}>
                                                                <div className="text-sm font-medium text-gray-900 line-clamp-2">
                                                                    {article.title}
                                                                </div>
                                                                <div className="text-sm text-gray-500 line-clamp-1">
                                                                    {article.excerpt}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex flex-wrap gap-1">
                                                            {article.categories?.map((category) => (
                                                                <span
                                                                    key={category.id}
                                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                                >
                                                                    {category.name}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(article.status)}`}>
                                                            {article.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {article.views?.toLocaleString() || 0}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {formatDistanceToNow(new Date(article.created_at), { addSuffix: true })}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2">
                                                            <Link
                                                                href={`/news/${article.slug}`}
                                                                className="text-green-600 hover:text-green-900"
                                                            >
                                                                View
                                                            </Link>
                                                            <Link
                                                                href={`/employee/news/${article.id}/edit`}
                                                                className="text-blue-600 hover:text-blue-900"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(article.id)}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="max-w-md mx-auto">
                                        <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                                        <p className="text-gray-500 mb-4">
                                            Get started by creating your first news article.
                                        </p>
                                        <Link
                                            href="/employee/news/create"
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                        >
                                            Create Article
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Pagination */}
                            {news?.links && news.data.length > 0 && (
                                <div className="mt-6 flex justify-center">
                                    <nav className="flex items-center space-x-2">
                                        {news.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`px-3 py-2 rounded-md text-sm ${
                                                    link.active
                                                        ? 'bg-green-600 text-white'
                                                        : 'bg-white text-gray-700 hover:bg-gray-50 border'
                                                } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                                preserveState
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
