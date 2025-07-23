import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';

export default function AdminUsersIndex() {
    const { props } = usePage();
    const { users, auth } = props;

    const getRoleBadgeColor = (roleName) => {
        switch (roleName) {
            case 'admin':
                return 'bg-red-100 text-red-800';
            case 'employee':
                return 'bg-green-100 text-green-800';
            case 'user':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <Head title="Users Management - Admin Panel" />
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
                                    className="border-blue-500 text-blue-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                                >
                                    Users
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
                        <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Manage users and their roles across the platform
                        </p>
                    </div>

                    {/* Users Table */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                User
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Roles
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Articles
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Joined
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users?.data?.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                                                                <span className="text-white font-medium text-sm">
                                                                    {user.name.charAt(0).toUpperCase()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {user.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                ID: {user.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{user.email}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {user.email_verified_at ? (
                                                            <span className="text-green-600">Verified</span>
                                                        ) : (
                                                            <span className="text-red-600">Not Verified</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-wrap gap-1">
                                                        {user.roles?.map((role) => (
                                                            <span
                                                                key={role.id}
                                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(role.name)}`}
                                                            >
                                                                {role.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {user.news_count || 0} articles
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            Edit Roles
                                                        </button>
                                                        {user.id !== auth?.user?.id && (
                                                            <button
                                                                onClick={() => {
                                                                    if (confirm('Are you sure you want to delete this user?')) {
                                                                        // Handle delete
                                                                    }
                                                                }}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {users?.links && (
                                <div className="mt-6 flex justify-center">
                                    <nav className="flex items-center space-x-2">
                                        {users.links.map((link, index) => (
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
