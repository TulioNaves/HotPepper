<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

class OrderController extends Controller
{
    public function checkout(Request $request)
    {
        $user = $request->user();

        $cart = Cart::with(['items.product'])->where('user_id', $user->id)->first();
        if (!$cart || $cart->items->isEmpty()) {
            return response()->json(['message' => 'Carrinho vazio.'], 422);
        }

        return DB::transaction(function () use ($cart, $user, $request) {
            // Revalida estoque
            foreach ($cart->items as $item) {
                $product = $item->product;
                if ($product->stock < $item->quantity) {
                    return response()->json([
                        'message' => 'Estoque insuficiente para um item do carrinho.',
                        'product_id' => $product->id,
                    ], 422);
                }
            }

            $order = Order::create([
                'user_id' => $user->id,
                'status' => 'pending',
                'total' => 0,
            ]);

            $total = 0;

            foreach ($cart->items as $item) {
                $product = $item->product;

                $unitPrice = $product->price;
                $qty = $item->quantity;
                $lineTotal = round($unitPrice * $qty, 2);

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $qty,
                    'unit_price' => $unitPrice,
                    'line_total' => $lineTotal,
                ]);

                $product->decrement('stock', $qty);

                $total += $lineTotal;
            }

            $order->total = round($total, 2);
            $order->save();

            // limpa carrinho
            $cart->items()->delete();

            return response()->json([
                'message' => 'Pedido criado com sucesso!',
                'order' => $order->load(['items.product']),
            ]);
        });
    }
}

