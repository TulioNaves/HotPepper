import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../../components/Navbar";
import { useCart } from "./useCart";
import api from "../../service/api"; // Confirme se o caminho desta pasta está correto

export default function CartView() {
  const { cart, updateQuantity, removeItem, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    try {
      const response = await api.post("/api/orders/checkout", { itens: cart });

      if (response.status === 200 || response.status === 201) {
        alert("Pedido realizado com sucesso!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erro ao fechar pedido:", error);
      alert(
        "Falha ao enviar o pedido para o back-end. Olhe a aba Network no F12.",
      );
    }
  };

  if (cart.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
          paddingTop: "120px",
        }}
      >
        <CustomNavbar />
        <Container className="text-center pb-5">
          <h2 className="fw-bold display-5 text-muted mb-4">
            Seu carrinho está vazio
          </h2>
          <Button
            variant="dark"
            size="lg"
            className="px-5 rounded-pill shadow-sm text-uppercase fw-bold"
            onClick={() => navigate("/produtos")}
          >
            Ir para a Vitrine
          </Button>
        </Container>
      </div>
    );
  }

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
          &#8592; Continuar Comprando
        </Button>

        <h1
          className="fw-bold mb-4 text-uppercase"
          style={{ letterSpacing: "1px" }}
        >
          Meu Carrinho
        </h1>

        <Row className="g-5">
          {/* COLUNA DOS ITENS */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
              <Card.Body className="p-0">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className={`d-flex align-items-center p-4 ${index !== cart.length - 1 ? "border-bottom" : ""}`}
                  >
                    {/* Imagem */}
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        backgroundColor: "#f9f9f9",
                      }}
                      className="d-flex justify-content-center align-items-center rounded p-2 me-4"
                    >
                      <img
                        src={item.imagem}
                        alt={item.nome}
                        className="img-fluid"
                        style={{ maxHeight: "100%", mixBlendMode: "multiply" }}
                      />
                    </div>

                    {/* Detalhes */}
                    <div className="flex-grow-1">
                      <h5 className="fw-bold mb-1">{item.nome}</h5>
                      <p className="text-muted small text-uppercase mb-2">
                        {item.tipo === "pacote" ? "Combo" : "Produto"}
                      </p>
                      <h6 className="fw-bold text-danger mb-0">
                        R$ {item.preco}
                      </h6>
                    </div>

                    {/* Controles de Quantidade */}
                    <div style={{ width: "120px" }} className="mx-4">
                      <InputGroup size="sm">
                        <Button
                          variant="outline-secondary"
                          onClick={() => updateQuantity(item.id, item.tipo, -1)}
                        >
                          -
                        </Button>
                        <Form.Control
                          className="text-center fw-bold bg-white"
                          value={item.quantidade}
                          readOnly
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => updateQuantity(item.id, item.tipo, 1)}
                        >
                          +
                        </Button>
                      </InputGroup>
                    </div>

                    {/* Remover */}
                    <Button
                      variant="link"
                      className="text-danger p-0"
                      onClick={() => removeItem(item.id, item.tipo)}
                    >
                      <h5 className="mb-0">&#10005;</h5>
                    </Button>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          {/* COLUNA DO RESUMO (CHECKOUT) */}
          <Col lg={4}>
            <Card
              className="border-0 shadow-sm rounded-4 bg-dark text-white sticky-top"
              style={{ top: "100px" }}
            >
              <Card.Body className="p-5">
                <h4
                  className="fw-bold mb-4 text-uppercase"
                  style={{ letterSpacing: "1px" }}
                >
                  Resumo
                </h4>

                <div className="d-flex justify-content-between mb-3 text-secondary">
                  <span>Subtotal</span>
                  <span>
                    R${" "}
                    {total.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-4 pb-4 border-bottom border-secondary text-secondary">
                  <span>Frete</span>
                  <span>Calculado no Checkout</span>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-5">
                  <span className="fw-bold fs-5">Total</span>
                  <span className="fw-bold fs-3 text-danger">
                    R${" "}
                    {total.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <Button
                  variant="danger"
                  size="lg"
                  className="w-100 fw-bold py-3 text-uppercase shadow-sm"
                  style={{ letterSpacing: "2px" }}
                  onClick={handleCheckout}
                >
                  Finalizar Compra
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
