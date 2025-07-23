import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';

export default function Home() {
    const { props } = usePage();
    const { news, categories, featuredNews, auth } = props;

    return (
        <>
            <Head title="Laravel News Web" />
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center">
                                <Link href="/" className="text-2xl font-bold text-blue-600">
                                    Laravel News
                                </Link>
                            </div>
                            <nav className="hidden md:flex space-x-8">
                                <Link href="/" className="text-gray-700 hover:text-blue-600">
                                    Home
                                </Link>
                                {categories?.data?.slice(0, 5).map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/category/${category.slug}`}
                                        className="text-gray-700 hover:text-blue-600"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </nav>
                            <div className="flex items-center space-x-4">
                                {auth?.user ? (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-gray-700">Hello, {auth.user.name}</span>
                                        {auth.user.roles?.some(role => role.name === 'admin') && (
                                            <Link
                                                href="/admin/dashboard"
                                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                            >
                                                Admin Panel
                                            </Link>
                                        )}
                                        {auth.user.roles?.some(role => role.name === 'employee') && (
                                            <Link
                                                href="/employee/dashboard"
                                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                            >
                                                Employee Panel
                                            </Link>
                                        )}
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="text-gray-700 hover:text-blue-600"
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-4">
                                        <Link
                                            href="/login"
                                            className="text-gray-700 hover:text-blue-600"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section with Featured News */}
                {featuredNews?.length > 0 && (
                    <section className="bg-white py-8">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Featured News</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">
                                    <div className="relative">
                                        <img
                                            src={featuredNews[0]?.thumbnail || '/placeholder.jpg'}
                                            alt={featuredNews[0]?.title}
                                            className="w-full h-96 object-cover rounded-lg"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-lg">
                                            <div className="flex items-center space-x-2 mb-2">
                                                {featuredNews[0]?.categories?.map((category) => (
                                                    <span
                                                        key={category.id}
                                                        className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
                                                    >
                                                        {category.name}
                                                    </span>
                                                ))}
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                <Link href={`/news/${featuredNews[0]?.slug}`}>
                                                    {featuredNews[0]?.title}
                                                </Link>
                                            </h3>
                                            <p className="text-gray-200 text-sm mb-2">
                                                {featuredNews[0]?.summary}
                                            </p>
                                            <div className="flex items-center text-gray-300 text-sm">
                                                <span>{featuredNews[0]?.user?.name}</span>
                                                <span className="mx-2">•</span>
                                                <span>{featuredNews[0]?.views} views</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {featuredNews?.slice(1, 5).map((item) => (
                                        <div key={item.id} className="border-b pb-4">
                                            <div className="flex items-center space-x-2 mb-2">
                                                {item.categories?.map((category) => (
                                                    <span
                                                        key={category.id}
                                                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                                                    >
                                                        {category.name}
                                                    </span>
                                                ))}
                                            </div>
                                            <h4 className="font-semibold text-gray-900 hover:text-blue-600">
                                                <Link href={`/news/${item.slug}`}>
                                                    {item.title}
                                                </Link>
                                            </h4>
                                            <div className="flex items-center text-gray-500 text-sm mt-1">
                                                <span>{item.user?.name}</span>
                                                <span className="mx-2">•</span>
                                                <span>{item.views} views</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Latest News Section */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest News</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {news?.data?.map((item) => (
                                <article key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img
                                        src={item.thumbnail || '/placeholder.jpg'}
                                        alt={item.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <div className="flex items-center space-x-2 mb-3">
                                            {item.categories?.map((category) => (
                                                <span
                                                    key={category.id}
                                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                                                >
                                                    {category.name}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600">
                                            <Link href={`/news/${item.slug}`}>
                                                {item.title}
                                            </Link>
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            {item.summary}
                                        </p>
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <span>{item.user?.name}</span>
                                                <span className="mx-2">•</span>
                                                <span>{item.views} views</span>
                                            </div>
                                            <time>
                                                {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                                            </time>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        {news?.links && (
                            <div className="mt-12 flex justify-center">
                                <nav className="flex items-center space-x-2">
                                    {news.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-3 py-2 rounded-md text-sm ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                            } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                            preserveState
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <p>&copy; 2024 Laravel News Web. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
