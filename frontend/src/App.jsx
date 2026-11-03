import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ItemDetail from "./pages/ItemDetail"; // <-- Componente único importado aqui
import FloatingCart from "./components/FloatingCart/FloatingCart";

import "./styles/custom.css";

function LayoutHandler() {
  const location = useLocation();

  const hiddenPaths = ["/login", "/register", "/", "/carrinho"];
  const shouldHide = hiddenPaths.includes(location.pathname);

  return !shouldHide ? <FloatingCart /> : null;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Fluxo Inicial */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Áreas Logadas */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/carrinho" element={<Cart />} />

        {/* Rotas Dinâmicas Unificadas */}
        {/* Passamos a prop 'tipo' para o mesmo componente saber o que renderizar */}
        <Route path="/produto/:id" element={<ItemDetail tipo="produto" />} />
        <Route path="/pacote/:id" element={<ItemDetail tipo="pacote" />} />

        {/* Segurança: Rota não encontrada */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      <LayoutHandler />
    </BrowserRouter>
  );
}
