<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Usuário de teste (evita duplicar em seeding repetido)
        User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                // senha padrão para testes: 123456
                'password' => \Illuminate\Support\Facades\Hash::make('123456'),
            ]
        );

        $this->call(ProductSeeder::class);
    }

}
