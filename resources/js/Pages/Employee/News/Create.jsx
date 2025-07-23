import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function EmployeeNewsCreate() {
    const { props } = usePage();
    const { categories, auth, errors } = props;
    
    const [data, setData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        thumbnail: '',
        status: 'draft',
        categories: []
    });

    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post('/employee/news', data, {
            onFinish: () => setProcessing(false),
            onError: () => setProcessing(false)
        });
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setData({
            ...data,
            title: title,
            slug: generateSlug(title)
        });
    };

    const handleCategoryChange = (categoryId) => {
        const newCategories = data.categories.includes(categoryId)
            ? data.categories.filter(id => id !== categoryId)
            : [...data.categories, categoryId];
        
        setData({ ...data, categories: newCategories });
    };

    return (
        <>
            <Head title="Create Article - Employee Panel" />
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
                                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                                >
                                    My Articles
                                </Link>
                                <Link
                                    href="/employee/news/create"
                                    className="border-green-500 text-green-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                                >
                                    Create Article
                                </Link>
                            </nav>
                        </div>
                    </nav>

                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Create New Article</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Write and publish a new news article
                        </p>
                    </div>

                    {/* Form */}
                    <div className="bg-white shadow rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={data.title}
                                    onChange={handleTitleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                                {errors?.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>

                            {/* Slug */}
                            <div>
                                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                                    Slug *
                                </label>
                                <input
                                    type="text"
                                    id="slug"
                                    value={data.slug}
                                    onChange={(e) => setData({ ...data, slug: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                                {errors?.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                                    Excerpt
                                </label>
                                <textarea
                                    id="excerpt"
                                    value={data.excerpt}
                                    onChange={(e) => setData({ ...data, excerpt: e.target.value })}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Brief summary of the article..."
                                />
                                {errors?.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>}
                            </div>

                            {/* Content */}
                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                    Content *
                                </label>
                                <textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData({ ...data, content: e.target.value })}
                                    rows="12"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Write your article content here..."
                                    required
                                />
                                {errors?.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                            </div>

                            {/* Thumbnail */}
                            <div>
                                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
                                    Thumbnail URL
                                </label>
                                <input
                                    type="url"
                                    id="thumbnail"
                                    value={data.thumbnail}
                                    onChange={(e) => setData({ ...data, thumbnail: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="https://example.com/image.jpg"
                                />
                                {errors?.thumbnail && <p className="mt-1 text-sm text-red-600">{errors.thumbnail}</p>}
                            </div>

                            {/* Categories */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Categories
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {categories?.map((category) => (
                                        <label key={category.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={data.categories.includes(category.id)}
                                                onChange={() => handleCategoryChange(category.id)}
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors?.categories && <p className="mt-1 text-sm text-red-600">{errors.categories}</p>}
                            </div>

                            {/* Status */}
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData({ ...data, status: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                                {errors?.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex justify-end space-x-3 pt-6 border-t">
                                <Link
                                    href="/employee/news"
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                                >
                                    {processing ? 'Creating...' : 'Create Article'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
