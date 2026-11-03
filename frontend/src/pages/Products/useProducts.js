import { useEffect, useMemo, useState } from "react";
import api from "../../service/api";

const imagens = import.meta.glob(
  "../../assets/Produtos/**/*.{webp,WEBP,png,PNG,jpg,JPG,jpeg,JPEG}",
  { eager: true },
);

export const useProducts = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getImg = useMemo(() => {
    return (slug) => {
      if (!slug) return null;
      const chaves = Object.keys(imagens);

      // Remove acentos e deixa minúsculo para garantir a busca (jalapeño -> jalapeno)
      const normalize = (str) =>
        str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

      const chaveCorreta = chaves.find((chave) =>
        normalize(chave).includes(normalize(slug)),
      );

      if (!chaveCorreta) {
        console.warn(`⚠️ Imagem não encontrada para o slug: ${slug}`);
        return null;
      }
      return imagens[chaveCorreta].default;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchProdutos = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/products");
        const arrayDeProdutos = res.data.data ? res.data.data : res.data;

        const mapped = (arrayDeProdutos || []).map((p) => {
          return {
            id: p.id,
            nome: p.name,
            descricao: p.description,
            // Força a conversão para moeda brasileira
            preco: Number(p.price).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
            imagem: p.image ? p.image : getImg(p.slug),
            tag: null,
            tipo: "produto",
          };
        });

        if (!cancelled) setProdutos(mapped);
      } catch (err) {
        if (!cancelled)
          setError(err.response?.data?.message || "Erro ao buscar produtos.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProdutos();

    return () => {
      cancelled = true;
    };
  }, [getImg]);

  return { produtos, loading, error };
};
