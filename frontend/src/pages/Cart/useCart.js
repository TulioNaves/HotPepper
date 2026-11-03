import { useState, useEffect } from "react";

export function useCart() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("carrinho");
    return saved ? JSON.parse(saved) : [];
  });

  // Atualiza o localStorage sempre que o estado 'cart' mudar
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(cart));
    // Dispara um evento para o seu FloatingCart saber que deve atualizar o número
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cart]);

  const updateQuantity = (id, tipo, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id && item.tipo === tipo) {
          const newQuantity = Math.max(1, item.quantidade + delta);
          return { ...item, quantidade: newQuantity };
        }
        return item;
      }),
    );
  };

  const removeItem = (id, tipo) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.tipo === tipo)),
    );
  };

  const clearCart = () => setCart([]);

  // Calcula o total normalizando os preços, independentemente da formatação
  const total = cart.reduce((acc, item) => {
    let precoTratado = item.preco;

    if (typeof precoTratado === "string") {
      // Se tiver vírgula, assume que é o separador de cêntimos/centavos (ex: "129,90" ou "1.200,50")
      if (precoTratado.includes(",")) {
        precoTratado = precoTratado.replace(/\./g, "").replace(",", ".");
      }
      precoTratado = parseFloat(precoTratado);
    }

    return acc + precoTratado * item.quantidade;
  }, 0);

  // RETORNO OBRIGATÓRIO PARA O HOOK FUNCIONAR
  return { cart, updateQuantity, removeItem, clearCart, total };
} // <-- É ESTA CHAVE QUE ESTAVA FALTANDO!
