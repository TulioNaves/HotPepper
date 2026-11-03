import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  ListGroup,
  InputGroup,
  Form,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import CustomNavbar from "../../components/Navbar";
import { useProducts } from "../Products/useProducts";

// 1. IMPORTAÇÕES DAS IMAGENS COM LETRA MINÚSCULA NO ASSETS
import combo1 from "../../assets/Produtos/Combos/Combo1.webp";
import combo2 from "../../assets/Produtos/Combos/Combo2.webp";
import combo3 from "../../assets/Produtos/Combos/Combo3.webp";

// 2. MOCK ATUALIZADO COM AS IMAGENS REAIS
const pacotesMock = [
  {
    id: 1,
    titulo: "Iniciante",
    cor: "success",
    preco: "89,90",
    imagem: combo1,
    itens: ["1x Pimenta Suave", "1x Molho de Alho", "Adesivo Exclusivo"],
  },
  {
    id: 2,
    titulo: "Intermediário",
    cor: "warning",
    preco: "129,90",
    imagem: combo2,
    itens: ["1x Jalapeño", "1x Dedo de Moça", "1x Molho Especial"],
  },
  {
    id: 3,
    titulo: "Extremo",
    cor: "danger",
    preco: "199,90",
    imagem: combo3,
    itens: ["1x Carolina Reaper", "1x Trinidad Scorpion", "Camiseta Hot"],
  },
];

export default function ItemDetailView({ tipo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { produtos } = useProducts();
  const [quantidade, setQuantidade] = useState(1);

  const isPacote = tipo === "pacote";
  const fonteDeDados = isPacote ? pacotesMock : produtos;
  const item = fonteDeDados.find((p) => p.id === parseInt(id));

  if (!item) {
    return (
      <Container className="text-center mt-5" style={{ paddingTop: "100px" }}>
        <CustomNavbar />
        <h2>{isPacote ? "Pacote" : "Produto"} não encontrado!</h2>
        <Button variant="dark" className="mt-3" onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </Container>
    );
  }

  const nomeExibicao = isPacote ? `Combo ${item.titulo}` : item.nome;
  const corTema = isPacote ? item.cor : "danger";
  const tagTexto = isPacote
    ? "Pacote Exclusivo"
    : item.tag || "Produto Exclusivo";

  // --- LÓGICA DO CARRINHO (LOCALSTORAGE) ---
  const handleAddToCart = () => {
    // 1. Pega o carrinho atual do localStorage ou cria um array vazio
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];

    // 2. Monta o objeto do item que está sendo comprado
    const novoItem = {
      id: item.id,
      nome: nomeExibicao,
      preco: item.preco,
      quantidade: quantidade,
      imagem: item.imagem,
      tipo: tipo,
    };

    // 3. Verifica se este exato item já está no carrinho
    const indexExistente = carrinhoAtual.findIndex(
      (i) => i.id === item.id && i.tipo === tipo,
    );

    if (indexExistente !== -1) {
      // Se já existe, apenas soma a nova quantidade
      carrinhoAtual[indexExistente].quantidade += quantidade;
    } else {
      // Se não existe, adiciona como um novo item
      carrinhoAtual.push(novoItem);
    }

    // 4. Salva o carrinho atualizado de volta no navegador
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));

    // 5. Avisa o restante do site (como o ícone flutuante) que o carrinho mudou
    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${quantidade}x ${nomeExibicao} adicionado ao carrinho com sucesso!`);
  };

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        paddingTop: "120px",
      }}
    >
      <CustomNavbar />
      <Container className="pb-5">
        <Button
          variant="outline-dark"
          onClick={() => navigate(-1)}
          className="mb-4 fw-bold px-4 py-2 rounded-pill shadow-sm"
          style={{
            letterSpacing: "2px",
            fontSize: "0.8rem",
            textTransform: "uppercase",
            transition: "all 0.3s ease",
          }}
        >
          &#8592; Voltar
        </Button>

        <Row className="bg-white shadow-sm rounded-4 overflow-hidden align-items-stretch">
          {/* COLUNA 1: IMAGEM */}
          <Col
            md={6}
            className="bg-light d-flex align-items-center justify-content-center p-5"
            style={{ minHeight: "500px" }}
          >
            <div className="text-center">
              <img
                src={item.imagem}
                alt={nomeExibicao}
                className="img-fluid transition-zoom"
                style={{
                  maxHeight: "450px",
                  mixBlendMode: "multiply",
                  objectFit: "contain",
                }}
              />
            </div>
          </Col>

          {/* COLUNA 2: DETALHES */}
          <Col md={6} className="p-5 d-flex flex-column justify-content-center">
            <div>
              <Badge
                bg={corTema}
                className="mb-3 px-3 py-2 text-uppercase"
                style={{ letterSpacing: "1px" }}
              >
                {tagTexto}
              </Badge>

              <h1 className="fw-bold display-4 mb-2">{nomeExibicao}</h1>

              {isPacote ? (
                <>
                  <p className="text-muted fs-5 mb-4">
                    A seleção perfeita para o seu nível de coragem.
                  </p>
                  <h3
                    className="fw-bold mb-4 text-dark"
                    style={{ fontSize: "2.5rem" }}
                  >
                    R$ {item.preco}
                  </h3>
                  <h6
                    className="fw-bold text-uppercase text-muted mb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    O que vem no pacote:
                  </h6>
                  <ListGroup variant="flush" className="mb-5">
                    {item.itens.map((li, index) => (
                      <ListGroup.Item
                        key={index}
                        className="px-0 bg-transparent border-bottom border-light py-3 fw-medium text-secondary"
                      >
                        <span className={`text-${corTema} fw-bold me-3 fs-5`}>
                          ✓
                        </span>{" "}
                        {li}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </>
              ) : (
                <>
                  <p
                    className="text-muted fs-5 mb-4"
                    style={{ lineHeight: "1.6" }}
                  >
                    Pimentas selecionadas manualmente para uma experiência
                    intensa e autêntica.
                  </p>
                  <h2
                    className="text-danger fw-bold mb-5"
                    style={{ fontSize: "2.5rem" }}
                  >
                    R$ {item.preco}
                  </h2>
                </>
              )}
            </div>

            {/* SELETOR DE QUANTIDADE E BOTÃO */}
            <div className={`mt-auto ${!isPacote ? "border-top pt-4" : ""}`}>
              <p className="text-muted small fw-bold mb-2 text-uppercase">
                Quantidade
              </p>
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <div style={{ width: "140px" }}>
                  <InputGroup size="lg">
                    <Button
                      variant="outline-secondary"
                      onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                      className="fw-bold"
                    >
                      -
                    </Button>
                    <Form.Control
                      className="text-center fw-bold bg-white"
                      value={quantidade}
                      readOnly
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setQuantidade((q) => q + 1)}
                      className="fw-bold"
                    >
                      +
                    </Button>
                  </InputGroup>
                </div>

                <Button
                  variant={corTema === "warning" ? "warning" : corTema}
                  size="lg"
                  className="flex-grow-1 fw-bold py-3 text-uppercase shadow-sm"
                  onClick={handleAddToCart} // <-- LÓGICA APLICADA AQUI
                >
                  Adicionar ao Carrinho
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
