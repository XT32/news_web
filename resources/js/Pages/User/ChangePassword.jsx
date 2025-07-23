import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import UserLayout from '../../Layouts/UserLayout';
import TextInput from '../../Components/Input/TextInput';
import PrimaryButton from '../../Components/Input/PrimaryButton';

export default function ChangePassword({ auth }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [message, setMessage] = useState('');

    const submit = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setMessage('Password berhasil diubah!');
                setTimeout(() => setMessage(''), 3000);
            },
            onError: () => {
                setMessage('');
            }
        });
    };

    return (
        <UserLayout>
            <Head title="Ganti Password" />
            
            <div className="max-w-2xl mx-auto">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-900">Ganti Password</h1>
                            <p className="text-gray-600 mt-2">Pastikan akun Anda menggunakan password yang kuat dan aman</p>
                        </div>

                        {message && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                                <p className="text-green-800">{message}</p>
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password Saat Ini
                                </label>
                                <TextInput
                                    id="current_password"
                                    type="password"
                                    value={data.current_password}
                                    onChange={(e) => setData('current_password', e.target.value)}
                                    className="w-full"
                                    autoComplete="current-password"
                                />
                                {errors.current_password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.current_password}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password Baru
                                </label>
                                <TextInput
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full"
                                    autoComplete="new-password"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                )}
                                <p className="mt-1 text-sm text-gray-500">
                                    Password minimal 8 karakter dan mengandung huruf besar, huruf kecil, dan angka
                                </p>
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                                    Konfirmasi Password Baru
                                </label>
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full"
                                    autoComplete="new-password"
                                />
                                {errors.password_confirmation && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
                                )}
                            </div>

                            <div className="pt-4">
                                <PrimaryButton disabled={processing}>
                                    {processing ? 'Menyimpan...' : 'Ubah Password'}
                                </PrimaryButton>
                            </div>
                        </form>

                        {/* Security Tips */}
                        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
                            <h3 className="text-sm font-medium text-blue-900 mb-2">Tips Keamanan Password:</h3>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol</li>
                                <li>• Minimal 8 karakter atau lebih</li>
                                <li>• Jangan gunakan informasi pribadi seperti nama atau tanggal lahir</li>
                                <li>• Gunakan password yang unik untuk setiap akun</li>
                                <li>• Pertimbangkan menggunakan password manager</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
