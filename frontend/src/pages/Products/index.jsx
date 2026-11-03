import ProductsView from "./ProductsView";
import { useProducts } from "./useProducts";

export default function Products() {
  const { produtos } = useProducts();

  // Dados de contato padronizados
  const contato = {
    nome: "HotSuporte",
    email: "suporthotpeper@gmail.com",
    telefone: "+55 00 00000 0000",
  };

  return <ProductsView produtos={produtos} contato={contato} />;
}
