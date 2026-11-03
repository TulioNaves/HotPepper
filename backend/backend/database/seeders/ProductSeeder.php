<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $products = [
            [
                'name' => 'Habanero',
                'slug' => 'habanero',
                'description' => 'Pimenta super picante.',
                'price' => 12.50,
                'stock' => 20,
                'image' => null,
            ],
            [
                'name' => 'Jalapeño',
                'slug' => 'jalapeno',
                'description' => 'Picância média.',
                'price' => 8.00,
                'stock' => 50,
                'image' => null,
            ],
            [
                'name' => 'Chipotle',
                'slug' => 'chipotle',
                'description' => 'Defumada e marcante.',
                'price' => 10.00,
                'stock' => 35,
                'image' => null,
            ],
        ];

        foreach ($products as $p) {
            Product::updateOrCreate(
                ['slug' => $p['slug']],
                $p
            );
        }
    }
}

