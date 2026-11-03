<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsConfigMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Allow Vite dev server
        $allowedOrigin = 'http://localhost:5173';

        if ($request->getMethod() === 'OPTIONS') {
            $response = response()->noContent(204);
        } else {
            /** @var \Symfony\Component\HttpFoundation\Response $response */
            $response = $next($request);
        }

        $response->headers->set('Access-Control-Allow-Origin', $allowedOrigin);
        $response->headers->set('Access-Control-Allow-Credentials', 'true');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN, X-Requested-With, Authorization');

        return $response;
    }
}


