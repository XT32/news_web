<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            'admin' => \App\Models\Role::where('name', 'admin')->first(),
            'karyawan' => \App\Models\Role::where('name', 'karyawan')->first(),
            'user' => \App\Models\Role::where('name', 'user')->first(),
        ];

        $users = [
            [
                'name' => 'User Satu',
                'email' => 'user1@example.com',
                'password' => Hash::make('password'),
                'role_name' => 'user',
            ],
            [
                'name' => 'User Dua',
                'email' => 'user2@example.com',
                'password' => Hash::make('password'),
                'role_name' => 'user',
            ],
            [
                'name' => 'Karyawan Satu',
                'email' => 'karyawan1@example.com',
                'password' => Hash::make('password'),
                'role_name' => 'karyawan',
            ],
            [
                'name' => 'Karyawan Dua',
                'email' => 'karyawan2@example.com',
                'password' => Hash::make('password'),
                'role_name' => 'karyawan',
            ],
            [
                'name' => 'Admin Dummy',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
                'role_name' => 'admin',
            ],
        ];

        $usedEmails = [];
        foreach ($users as $userData) {
            if (in_array($userData['email'], $usedEmails)) continue;
            $usedEmails[] = $userData['email'];
            $roleName = $userData['role_name'];
            unset($userData['role_name']);
            $user = User::create($userData);
            $user->roles()->attach($roles[$roleName]);
        }
    }
}
