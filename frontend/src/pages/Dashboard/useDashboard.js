import imgCuriosidade1 from "../../assets/p1.webp";
import imgCuriosidade2 from "../../assets/p2.webp";
import imgCuriosidade3 from "../../assets/p3.webp";
const imagens = import.meta.glob(
  "../../assets/Produtos/**/*.{webp,WEBP,png,PNG,jpg,JPG,jpeg,JPEG}",
  { eager: true },
);
export const useDashboard = () => {
  const getImg = (name) => {
    const chaves = Object.keys(imagens);
    // Encontra a chave do Vite que termina com o nome do arquivo procurado
    const chaveCorreta = chaves.find((chave) =>
      chave.toLowerCase().endsWith(name.toLowerCase()),
    );

    // Se achar, retorna a imagem. Se não, retorna um aviso no console para te ajudar a debugar.
    if (!chaveCorreta) {
      console.warn(`⚠️ Imagem não encontrada: ${name}`);
      return null;
    }
    return imagens[chaveCorreta].default;
  };
  const produtos = [
    {
      id: 1,
      titulo: "Não aguenta bebe leite",
      preco: "120,99",
      cor: "success",
      imagem: getImg("Combo1.webp"),
      itens: ["3 Molhos sortidos", "Livro de receitas", "1 Picles"],
    },
    {
      id: 2,
      titulo: "Peito de Aço",
      preco: "190,50",
      cor: "warning",
      imagem: getImg("Combo2.webp"),
      itens: [
        "4 Molhos sortidos",
        "Suporte Para Pimentas",
        "1 Picles",
        "Livro de receitas",
      ],
    },
    {
      id: 3,
      titulo: "Demoniac Resistance",
      preco: "345,00",
      cor: "danger",
      imagem: getImg("Combo3.webp"),
      itens: [
        "Todos os molhos da casa",
        "suporte para pimentas",
        "3 Picles",
        "1 Livro de",
      ],
    },
  ];

  const curiosidades = [
    {
      id: 1,
      imagem: imgCuriosidade3,
      titulo: "Sua origem ainda é um mistério",
      texto:
        "Até hoje existem discussões sobre a origem da pimenta. Alguns acreditam que veio do México, outros da China ou Índia.",
    },
    {
      id: 2,
      imagem: imgCuriosidade2,
      titulo: "A água não ajuda no ardor",
      texto:
        "A capsaicina não é solúvel em água. Para aliviar a queimação, prefira iogurte ou leite.",
    },
    {
      id: 3,
      imagem: imgCuriosidade1,
      titulo: "Nutritivas e saborosas",
      texto:
        "São ótimos antioxidantes e ricas em nutrientes como potássio, ferro, magnésio e vitaminas A, B e C.",
    },
  ];

  const contato = {
    nome: "HotSuporte",
    email: "suporthotpeper@gmail.com",
    telefone: "+55 00 00000 0000",
  };

  return { produtos, curiosidades, contato };
};
