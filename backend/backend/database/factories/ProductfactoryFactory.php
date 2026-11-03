<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        $name = $this->faker->unique()->words(2, true);

        return [
            'name'        => ucfirst($name),
            'slug'        => Str::slug($name),
            'description' => $this->faker->sentence(10),
            'price'       => $this->faker->randomFloat(2, 5, 100),
            'stock'       => $this->faker->numberBetween(1, 100),
            'image'       => null,
        ];
    }

    /** Produto sem estoque */
    public function outOfStock(): static
    {
        return $this->state(fn () => ['stock' => 0]);
    }

    /** Pimenta Habanero exata do seeder */
    public function habanero(): static
    {
        return $this->state(fn () => [
            'name'        => 'Habanero',
            'slug'        => 'habanero',
            'description' => 'Pimenta super picante.',
            'price'       => 12.50,
            'stock'       => 20,
        ]);
    }

    /** Pimenta Jalapeño exata do seeder */
    public function jalapeno(): static
    {
        return $this->state(fn () => [
            'name'        => 'Jalapeño',
            'slug'        => 'jalapeno',
            'description' => 'Picância média.',
            'price'       => 8.00,
            'stock'       => 50,
        ]);
    }

    /** Pimenta Chipotle exata do seeder */
    public function chipotle(): static
    {
        return $this->state(fn () => [
            'name'        => 'Chipotle',
            'slug'        => 'chipotle',
            'description' => 'Defumada e marcante.',
            'price'       => 10.00,
            'stock'       => 35,
        ]);
    }
}