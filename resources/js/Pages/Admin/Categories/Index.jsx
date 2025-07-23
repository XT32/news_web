import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';

export default function AdminCategoriesIndex() {
    const { props } = usePage();
    const { categories, auth } = props;
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [createData, setCreateData] = useState({ name: '', description: '' });

    const handleCreate = (e) => {
        e.preventDefault();
        router.post('/admin/categories', createData, {
            onSuccess: () => {
                setShowCreateForm(false);
                setCreateData({ name: '', description: '' });
            }
        });
    };

    const handleDelete = (categoryId) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(`/admin/categories/${categoryId}`);
        }
    };

    return (
        <>
            <Head title="Categories Management - Admin Panel" />
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center">
                                <Link href="/" className="text-2xl font-bold text-blue-600">
                                    Laravel News - Admin Panel
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
                                    href="/admin/dashboard"
                                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/admin/news"
                                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                                >
                                    News Management
                                </Link>
                                <Link
                                    href="/admin/users"
                                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                                >
                                    Users
                                </Link>
                                <Link
                                    href="/admin/categories"
                                    className="border-blue-500 text-blue-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                                >
                                    Categories
                                </Link>
                            </nav>
                        </div>
                    </nav>

                    {/* Page Header */}
                    <div className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Categories Management</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Manage news categories and organize content
                            </p>
                        </div>
                        <button
                            onClick={() => setShowCreateForm(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                            Create Category
                        </button>
                    </div>

                    {/* Create Form Modal */}
                    {showCreateForm && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                                <div className="mt-3">
                                    <h3 className="text-lg font-medium text-gray-900 text-center">
                                        Create New Category
                                    </h3>
                                    <form onSubmit={handleCreate} className="mt-6">
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Category Name
                                            </label>
                                            <input
                                                type="text"
                                                value={createData.name}
                                                onChange={(e) => setCreateData({...createData, name: e.target.value})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Description
                                            </label>
                                            <textarea
                                                value={createData.description}
                                                onChange={(e) => setCreateData({...createData, description: e.target.value})}
                                                rows="3"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-3">
                                            <button
                                                type="button"
                                                onClick={() => setShowCreateForm(false)}
                                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            >
                                                Create
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Categories Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories?.map((category) => (
                            <div key={category.id} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {category.name}
                                    </h3>
                                    <div className="flex space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="text-red-600 hover:text-red-800 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                
                                {category.description && (
                                    <p className="text-gray-600 text-sm mb-4">
                                        {category.description}
                                    </p>
                                )}

                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                            {category.news_count || 0} articles
                                        </span>
                                        <span>
                                            Created {formatDistanceToNow(new Date(category.created_at), { addSuffix: true })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {(!categories || categories.length === 0) && (
                        <div className="text-center py-12">
                            <div className="max-w-md mx-auto">
                                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c1.1 0 2 .9 2 2v1M9 21h6c1.1 0 2-.9 2-2V9a2 2 0 00-2-2M7 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h2m3-6l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                                <p className="text-gray-500 mb-4">
                                    Get started by creating your first news category.
                                </p>
                                <button
                                    onClick={() => setShowCreateForm(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                >
                                    Create Category
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
