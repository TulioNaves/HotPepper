<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Database\Seeders\ProductSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductApiTest extends TestCase
{
    use RefreshDatabase;

    // -------------------------------------------------------------------------
    // GET /api/products  — listagem
    // -------------------------------------------------------------------------

    public function test_listagem_retorna_200_e_estrutura_correta(): void
    {
        $this->seed(ProductSeeder::class);

        $this->getJson('/api/products')
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'name', 'slug', 'description', 'price', 'stock'],
                ],
            ]);
    }

    public function test_listagem_retorna_as_tres_pimentas_do_seeder(): void
    {
        $this->seed(ProductSeeder::class);

        $response = $this->getJson('/api/products');

        $response->assertStatus(200);
        $this->assertCount(3, $response->json('data'));
    }

    public function test_listagem_contem_habanero(): void
    {
        $this->seed(ProductSeeder::class);

        $this->getJson('/api/products')
            ->assertStatus(200)
            ->assertJsonFragment(['slug' => 'habanero']);
    }

    public function test_listagem_vazia_retorna_array_vazio(): void
    {
        $this->getJson('/api/products')
            ->assertStatus(200)
            ->assertJson(['data' => []]);
    }

    // -------------------------------------------------------------------------
    // GET /api/products/{slug}  — detalhe
    // -------------------------------------------------------------------------

    public function test_detalhe_retorna_habanero_pelo_slug(): void
    {
        $this->seed(ProductSeeder::class);

        $this->getJson('/api/products/habanero')
            ->assertStatus(200)
            ->assertJsonFragment([
                'slug'  => 'habanero',
                'name'  => 'Habanero',
                'price' => 12.50,
                'stock' => 20,
            ]);
    }

    public function test_detalhe_retorna_jalapeno_pelo_slug(): void
    {
        $this->seed(ProductSeeder::class);

        $this->getJson('/api/products/jalapeno')
            ->assertStatus(200)
            ->assertJsonFragment(['slug' => 'jalapeno', 'name' => 'Jalapeño']);
    }

    public function test_detalhe_retorna_404_para_slug_inexistente(): void
    {
        $this->getJson('/api/products/pimenta-fantasma')
            ->assertStatus(404);
    }

    // -------------------------------------------------------------------------
    // POST /api/products  — criação
    // -------------------------------------------------------------------------

    public function test_criacao_requer_autenticacao(): void
    {
        $this->postJson('/api/products', [])
            ->assertStatus(401);
    }

    public function test_criacao_com_dados_validos_retorna_201(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/products', [
                'name'        => 'Ghost Pepper',
                'description' => 'A mais picante de todas.',
                'price'       => 25.00,
                'stock'       => 10,
            ])
            ->assertStatus(201)
            ->assertJsonFragment(['name' => 'Ghost Pepper']);

        $this->assertDatabaseHas('products', ['name' => 'Ghost Pepper']);
    }

    public function test_criacao_gera_slug_automaticamente(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/products', [
                'name'  => 'Pimenta Dedo de Moça',
                'price' => 6.50,
                'stock' => 40,
            ])
            ->assertStatus(201);

        $this->assertDatabaseHas('products', ['slug' => 'pimenta-dedo-de-moca']);
    }

    public function test_criacao_falha_sem_name(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/products', ['price' => 10.00, 'stock' => 1])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    }

    public function test_criacao_falha_sem_price(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/products', ['name' => 'Pimenta', 'stock' => 1])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['price']);
    }

    public function test_criacao_falha_com_price_negativo(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/products', [
                'name'  => 'Pimenta',
                'price' => -1.00,
                'stock' => 1,
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['price']);
    }

    public function test_criacao_falha_com_slug_duplicado(): void
    {
        $this->seed(ProductSeeder::class);
        $user = User::factory()->create();

        // 'habanero' já existe no seeder
        $this->actingAs($user, 'sanctum')
            ->postJson('/api/products', [
                'name'  => 'Habanero',
                'price' => 12.50,
                'stock' => 5,
            ])
            ->assertStatus(422);
    }

    // -------------------------------------------------------------------------
    // PUT /api/products/{id}  — atualização
    // -------------------------------------------------------------------------

    public function test_atualizacao_requer_autenticacao(): void
    {
        $product = Product::factory()->create();

        $this->putJson("/api/products/{$product->id}", ['name' => 'X'])
            ->assertStatus(401);
    }

    public function test_atualizacao_altera_preco_do_habanero(): void
    {
        $this->seed(ProductSeeder::class);
        $user     = User::factory()->create();
        $habanero = Product::where('slug', 'habanero')->first();

        $this->actingAs($user, 'sanctum')
            ->putJson("/api/products/{$habanero->id}", [
                'name'  => 'Habanero',
                'price' => 15.00,
                'stock' => 20,
            ])
            ->assertStatus(200)
            ->assertJsonFragment(['price' => 15.00]);

        $this->assertDatabaseHas('products', ['slug' => 'habanero', 'price' => 15.00]);
    }

    public function test_atualizacao_retorna_404_para_produto_inexistente(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user, 'sanctum')
            ->putJson('/api/products/9999', ['name' => 'X', 'price' => 1, 'stock' => 1])
            ->assertStatus(404);
    }

    // -------------------------------------------------------------------------
    // DELETE /api/products/{id}  — remoção
    // -------------------------------------------------------------------------

    public function test_exclusao_requer_autenticacao(): void
    {
        $product = Product::factory()->create();

        $this->deleteJson("/api/products/{$product->id}")
            ->assertStatus(401);
    }

    public function test_exclusao_remove_chipotle(): void
    {
        $this->seed(ProductSeeder::class);
        $user     = User::factory()->create();
        $chipotle = Product::where('slug', 'chipotle')->first();

        $this->actingAs($user, 'sanctum')
            ->deleteJson("/api/products/{$chipotle->id}")
            ->assertStatus(200);

        $this->assertDatabaseMissing('products', ['slug' => 'chipotle']);
    }

    public function test_exclusao_retorna_404_para_produto_inexistente(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user, 'sanctum')
            ->deleteJson('/api/products/9999')
            ->assertStatus(404);
    }
}