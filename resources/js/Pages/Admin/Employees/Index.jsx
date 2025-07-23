import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';

export default function AdminEmployeesIndex() {
    const { props } = usePage();
    const { employees, auth } = props;

    const formatNumber = (num) => {
        return new Intl.NumberFormat().format(num);
    };

    return (
        <>
            <Head title="Employee Management - Admin Panel" />
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
                                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                                >
                                    Monitoring Dashboard
                                </Link>
                                <Link
                                    href="/admin/users"
                                    className="border-blue-500 text-blue-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
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

                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Monitor employee performance and manage content creators
                        </p>
                    </div>

                    {/* Employee Performance Cards */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 sm:p-6">
                            {employees?.data && employees.data.length > 0 ? (
                                <div className="space-y-6">
                                    {employees.data.map((employee) => (
                                        <div key={employee.id} className="bg-gray-50 rounded-lg p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-12 w-12">
                                                        <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                                                            <span className="text-white font-medium text-lg">
                                                                {employee.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <h3 className="text-lg font-medium text-gray-900">
                                                            {employee.name}
                                                        </h3>
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <span>{employee.email}</span>
                                                            <span className="mx-2">•</span>
                                                            <span>
                                                                Joined {formatDistanceToNow(new Date(employee.created_at), { addSuffix: true })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    {employee.roles?.map((role) => (
                                                        <span
                                                            key={role.id}
                                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                                        >
                                                            {role.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Performance Metrics */}
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                <div className="bg-white rounded-lg p-4 border">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-500">Total Articles</p>
                                                            <p className="text-2xl font-bold text-gray-900">
                                                                {formatNumber(employee.news_count || 0)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-white rounded-lg p-4 border">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-500">Published</p>
                                                            <p className="text-2xl font-bold text-green-600">
                                                                {formatNumber(employee.published_news_count || 0)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-white rounded-lg p-4 border">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-500">Total Views</p>
                                                            <p className="text-2xl font-bold text-purple-600">
                                                                {formatNumber(employee.news_sum_views || 0)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-white rounded-lg p-4 border">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-500">Avg. Views</p>
                                                            <p className="text-2xl font-bold text-orange-600">
                                                                {employee.news_count > 0 
                                                                    ? formatNumber(Math.round((employee.news_sum_views || 0) / employee.news_count))
                                                                    : '0'
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Performance Rating */}
                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <span className="text-sm font-medium text-gray-700">Performance Rating:</span>
                                                    <div className="ml-2 flex items-center">
                                                        {(() => {
                                                            const publishRate = employee.news_count > 0 
                                                                ? (employee.published_news_count / employee.news_count) * 100 
                                                                : 0;
                                                            const ratingColor = publishRate >= 80 ? 'text-green-500' : 
                                                                              publishRate >= 60 ? 'text-yellow-500' : 'text-red-500';
                                                            const ratingText = publishRate >= 80 ? 'Excellent' : 
                                                                             publishRate >= 60 ? 'Good' : 'Needs Improvement';
                                                            
                                                            return (
                                                                <>
                                                                    <span className={`text-sm font-medium ${ratingColor}`}>
                                                                        {ratingText}
                                                                    </span>
                                                                    <span className="ml-1 text-xs text-gray-500">
                                                                        ({publishRate.toFixed(1)}% published)
                                                                    </span>
                                                                </>
                                                            );
                                                        })()}
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                                                        View Articles
                                                    </button>
                                                    <button className="text-green-600 hover:text-green-800 text-sm">
                                                        Send Message
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="max-w-md mx-auto">
                                        <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
                                        <p className="text-gray-500">
                                            There are currently no employees registered in the system.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Pagination */}
                            {employees?.links && employees.data.length > 0 && (
                                <div className="mt-6 flex justify-center">
                                    <nav className="flex items-center space-x-2">
                                        {employees.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`px-3 py-2 rounded-md text-sm ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white'
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
