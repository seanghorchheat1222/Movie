<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Seanghor',
            'email' => 'seanghor43@gmail.com',
            'password' => Hash::make('movies-demo-2026!'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Elever',
            'email' => 'elever43@gmail.com',
            'password' => Hash::make('movies-demo-2026!'),
            'role' => 'user',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Noelever',
            'email' => 'noelever43@gmail.com',
            'password' => Hash::make('movies-demo-2026!'),
            'role' => 'user',
            'email_verified_at' => now(),
        ]);
    }
}
