<?php

namespace Tests\Database;

use Database\Seeders\ProductSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductSeederTest extends TestCase
{
    use RefreshDatabase;

    // -------------------------------------------------------------------------
    // Quantidade e idempotência
    // -------------------------------------------------------------------------

    public function test_seeder_insere_tres_produtos(): void
    {
        $this->seed(ProductSeeder::class);

        $this->assertDatabaseCount('products', 3);
    }

    public function test_seeder_e_idempotente_nao_duplica_ao_rodar_duas_vezes(): void
    {
        $this->seed(ProductSeeder::class);
        $this->seed(ProductSeeder::class);

        // updateOrCreate não deve duplicar registros
        $this->assertDatabaseCount('products', 3);
    }

    // -------------------------------------------------------------------------
    // Dados de cada produto
    // -------------------------------------------------------------------------

    public function test_seeder_cria_habanero_com_dados_corretos(): void
    {
        $this->seed(ProductSeeder::class);

        $this->assertDatabaseHas('products', [
            'name'  => 'Habanero',
            'slug'  => 'habanero',
            'price' => 12.50,
            'stock' => 20,
        ]);
    }

    public function test_seeder_cria_jalapeno_com_dados_corretos(): void
    {
        $this->seed(ProductSeeder::class);

        $this->assertDatabaseHas('products', [
            'name'  => 'Jalapeño',
            'slug'  => 'jalapeno',
            'price' => 8.00,
            'stock' => 50,
        ]);
    }

    public function test_seeder_cria_chipotle_com_dados_corretos(): void
    {
        $this->seed(ProductSeeder::class);

        $this->assertDatabaseHas('products', [
            'name'  => 'Chipotle',
            'slug'  => 'chipotle',
            'price' => 10.00,
            'stock' => 35,
        ]);
    }

    // -------------------------------------------------------------------------
    // Integridade dos dados
    // -------------------------------------------------------------------------

    public function test_todos_os_produtos_tem_descricao(): void
    {
        $this->seed(ProductSeeder::class);

        $semDescricao = \DB::table('products')
            ->whereNull('description')
            ->orWhere('description', '')
            ->count();

        $this->assertEquals(0, $semDescricao);
    }

    public function test_todos_os_produtos_tem_preco_positivo(): void
    {
        $this->seed(ProductSeeder::class);

        $invalidos = \DB::table('products')->where('price', '<=', 0)->count();

        $this->assertEquals(0, $invalidos);
    }

    public function test_todos_os_produtos_tem_estoque_positivo(): void
    {
        $this->seed(ProductSeeder::class);

        $semEstoque = \DB::table('products')->where('stock', '<=', 0)->count();

        $this->assertEquals(0, $semEstoque);
    }

    public function test_slugs_sao_unicos(): void
    {
        $this->seed(ProductSeeder::class);

        $slugs = \DB::table('products')->pluck('slug');

        $this->assertEquals($slugs->unique()->count(), $slugs->count());
    }

    public function test_todos_os_produtos_tem_timestamps(): void
    {
        $this->seed(ProductSeeder::class);

        $semTimestamp = \DB::table('products')
            ->whereNull('created_at')
            ->orWhereNull('updated_at')
            ->count();

        $this->assertEquals(0, $semTimestamp);
    }

    // -------------------------------------------------------------------------
    // Restrições da tabela
    // -------------------------------------------------------------------------

    public function test_slug_duplicado_lanca_excecao(): void
    {
        $this->seed(ProductSeeder::class);

        $this->expectException(\Illuminate\Database\QueryException::class);

        \DB::table('products')->insert([
            'name'       => 'Outra Pimenta',
            'slug'       => 'habanero', // slug já existente
            'price'      => 5.00,
            'stock'      => 10,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function test_description_e_image_aceitam_null(): void
    {
        \DB::table('products')->insert([
            'name'        => 'Pimenta Teste',
            'slug'        => 'pimenta-teste',
            'description' => null,
            'price'       => 5.00,
            'stock'       => 5,
            'image'       => null,
            'created_at'  => now(),
            'updated_at'  => now(),
        ]);

        $this->assertDatabaseHas('products', [
            'slug'        => 'pimenta-teste',
            'description' => null,
            'image'       => null,
        ]);
    }
}