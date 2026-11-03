<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::query()
            ->orderBy('id', 'desc')
            ->get();

        return response()->json($products);
    }

    public function show(Product $product)
    {
        return response()->json($product);
    }
}

