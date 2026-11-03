import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FloatingCart.css";
import carrinhoIcon from "../../assets/carrinho.png"; // Verifique o caminho

export default function FloatingCart() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  // Lógica para ler o carrinho e manter o número sincronizado
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("carrinho")) || [];
      const totalItems = cart.reduce((acc, item) => acc + item.quantidade, 0);
      setCartCount(totalItems);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  // Se o carrinho estiver vazio, o botão flutuante some da tela
  if (cartCount === 0) return null;

  return (
    <div
      className="floating-cart-container"
      onClick={() => navigate("/carrinho")}
    >
      {/* Círculo com efeito de hover igual ao da Samsung */}
      <div className="cart-circle shadow-lg">
        <img src={carrinhoIcon} alt="Carrinho" className="cart-icon-img" />

        {/* Badge de quantidade com a variável dinâmica */}
        <span className="cart-badge">{cartCount}</span>
      </div>

      {/* Texto flutuante opcional (estilo Samsung Expert) */}
      <div className="cart-tooltip">Ver Carrinho</div>
    </div>
  );
}
