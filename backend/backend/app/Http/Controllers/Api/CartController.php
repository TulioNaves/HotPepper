<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function show(Request $request)
    {
        $cart = Cart::with(['items.product'])
            ->where('user_id', $request->user()->id)
            ->first();

        return response()->json([
            'cart' => $cart,
        ]);
    }

    public function addItem(Request $request)
    {
        $data = $request->validate([
            'product_id' => ['required', 'integer', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $user = $request->user();

        $product = Product::query()->findOrFail($data['product_id']);
        if ($product->stock < 1) {
            return response()->json(['message' => 'Produto sem estoque.'], 422);
        }

        return DB::transaction(function () use ($request, $data, $product) {
            $cart = Cart::firstOrCreate(['user_id' => $request->user()->id]);

            $item = CartItem::query()
                ->where('cart_id', $cart->id)
                ->where('product_id', $data['product_id'])
                ->first();

            $newQty = ($item?->quantity ?? 0) + $data['quantity'];

            if ($newQty > $product->stock) {
                return response()->json(['message' => 'Quantidade excede o estoque disponível.'], 422);
            }

            if ($item) {
                $item->quantity = $newQty;
                $item->save();
            } else {
                $item = CartItem::create([
                    'cart_id' => $cart->id,
                    'product_id' => $data['product_id'],
                    'quantity' => $newQty,
                ]);
            }

            $cart->load(['items.product']);

            return response()->json(['message' => 'Item adicionado ao carrinho.', 'cart' => $cart]);
        });
    }

    public function updateItem(Request $request, CartItem $item)
    {
        $this->authorizeItemOwner($request, $item);

        $data = $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $product = $item->product()->first();
        if ($data['quantity'] > $product->stock) {
            return response()->json(['message' => 'Quantidade excede o estoque disponível.'], 422);
        }

        $item->quantity = $data['quantity'];
        $item->save();

        return response()->json(['message' => 'Item atualizado com sucesso.']);
    }

    public function removeItem(Request $request, CartItem $item)
    {
        $this->authorizeItemOwner($request, $item);

        $item->delete();

        return response()->json(['message' => 'Item removido com sucesso.']);
    }

    private function authorizeItemOwner(Request $request, CartItem $item): void
    {
        $cart = $item->cart()->first();
        if ($cart?->user_id !== $request->user()->id) {
            abort(403);
        }
    }
}

