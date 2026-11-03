# 🌶️ HotPepper

Loja virtual de molhos e conservas de pimenta, desenvolvida como projeto acadêmico na **UFV**. O sistema é composto por uma API REST em **Laravel** e uma SPA em **React**, orquestrados com **Docker Compose**.

## ✨ Funcionalidades

- Cadastro, login e logout de usuários (autenticação via **Laravel Sanctum**)
- Catálogo de produtos e combos com página de detalhes
- Carrinho de compras (adicionar, alterar quantidade e remover itens) com carrinho flutuante
- Finalização de pedido (checkout) com controle de estoque
- Dashboard da área logada

## 🛠️ Tecnologias

| Camada    | Stack |
|-----------|-------|
| Backend   | PHP 8.2, Laravel 12, Sanctum, SQLite |
| Frontend  | React 19, Vite, React Router, React-Bootstrap, Axios |
| Infra     | Docker, Docker Compose |

## 📁 Estrutura

```
Hotpepper-main/
├── backend/
│   ├── Dockerfile
│   └── backend/            # Aplicação Laravel
│       ├── app/Http/Controllers/Api/   # Auth, Product, Cart, Order
│       ├── app/Models/                 # User, Product, Cart, CartItem, Order, OrderItem
│       ├── database/                   # migrations, seeders, factories
│       └── routes/api.php
├── frontend/
│   ├── Dockerfile
│   └── src/
│       ├── pages/          # Login, Register, Dashboard, Products, ItemDetail, Cart
│       ├── components/     # Navbar, FloatingCart
│       └── service/api.js  # Cliente Axios
└── docker-compose.yml
```

## 🚀 Como executar

### Com Docker (recomendado)

Pré-requisito: [Docker](https://www.docker.com/) com Docker Compose.

1. Crie o arquivo de ambiente do backend a partir do exemplo e gere a chave da aplicação:

   ```bash
   cp backend/backend/.env.example backend/.env
   ```

   > Ajuste `DB_CONNECTION=sqlite` no `.env`. A `APP_KEY` pode ser gerada depois com
   > `docker compose exec backend sh -c "cd backend && php artisan key:generate"`.

2. Suba os containers:

   ```bash
   docker compose up --build
   ```

3. (Opcional) Popule o banco com produtos e um usuário de teste:

   ```bash
   docker compose exec backend sh -c "cd backend && php artisan db:seed"
   ```

Acesse:

- Frontend: <http://localhost:5173>
- API: <http://localhost:8000/api>

### Sem Docker

**Backend** (requer PHP 8.2+ e Composer):

```bash
cd backend/backend
composer install
cp .env.example .env        # defina DB_CONNECTION=sqlite
php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
php artisan serve
```

**Frontend** (requer Node.js 20+):

```bash
cd frontend
npm install
npm run dev
```

O frontend usa a variável `VITE_API_BASE_URL` (padrão: `http://localhost:8000`).

## 👤 Usuário de teste

Após rodar o seeder:

- **E-mail:** `test@example.com`
- **Senha:** `123456`

## 🔌 Endpoints da API

| Método | Rota                     | Autenticação | Descrição |
|--------|--------------------------|:------------:|-----------|
| POST   | `/api/register`          |              | Cadastra usuário |
| POST   | `/api/login`             |              | Autentica usuário |
| POST   | `/api/logout`            | ✅           | Encerra sessão |
| GET    | `/api/user`              | ✅           | Dados do usuário logado |
| GET    | `/api/products`          |              | Lista produtos |
| GET    | `/api/products/{id}`     |              | Detalhes do produto |
| GET    | `/api/cart`              | ✅           | Exibe o carrinho |
| POST   | `/api/cart/items`        | ✅           | Adiciona item ao carrinho |
| PATCH  | `/api/cart/items/{item}` | ✅           | Atualiza quantidade |
| DELETE | `/api/cart/items/{item}` | ✅           | Remove item |
| POST   | `/api/orders/checkout`   | ✅           | Finaliza o pedido |

## 🧪 Testes

```bash
cd backend/backend
php artisan test
```
