<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = ['admin', 'karyawan', 'user'];
        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }
    }
}
