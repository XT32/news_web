import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import ApplicationLogo from '../Components/ApplicationLogo';
import Dropdown from '../Components/Dropdown';
import NavLink from '../Components/NavLink';
import ResponsiveNavLink from '../Components/ResponsiveNavLink';

export default function UserLayout({ children }) {
    const { auth } = usePage().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('user.dashboard')} active={route().current('user.dashboard')}>
                                    Dashboard
                                </NavLink>
                                <NavLink href={route('home')} active={route().current('home')}>
                                    Beranda
                                </NavLink>
                                <NavLink href={route('user.saved-news')} active={route().current('user.saved-news')}>
                                    Berita Disimpan
                                </NavLink>
                                <NavLink href={route('user.notifications')} active={route().current('user.notifications')}>
                                    Notifikasi
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {auth.user.name}
                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            Profil
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('user.password.change')}>
                                            Ganti Password
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('user.preferences')}>
                                            Pengaturan
                                        </Dropdown.Link>
                                        <Dropdown.Link onClick={handleLogout} as="button">
                                            Logout
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('user.dashboard')} active={route().current('user.dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('home')} active={route().current('home')}>
                            Beranda
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('user.saved-news')} active={route().current('user.saved-news')}>
                            Berita Disimpan
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('user.notifications')} active={route().current('user.notifications')}>
                            Notifikasi
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{auth.user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('user.password.change')}>
                                Ganti Password
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('user.preferences')}>
                                Pengaturan
                            </ResponsiveNavLink>
                            <ResponsiveNavLink onClick={handleLogout} as="button">
                                Logout
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
