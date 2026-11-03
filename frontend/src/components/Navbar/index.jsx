import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logo from "../../assets/logo.png";
import carrinhoIcon from "../../assets/carrinho.png";

export default function CustomNavbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  // LÓGICA DO CARRINHO: Lê o número de itens e escuta atualizações
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("carrinho")) || [];
      // Soma a quantidade total de todos os itens
      const totalItems = cart.reduce((acc, item) => acc + item.quantidade, 0);
      setCartCount(totalItems);
    };

    // Atualiza ao carregar a Navbar pela primeira vez
    updateCartCount();

    // Fica escutando o evento global para atualizar em tempo real
    window.addEventListener("cartUpdated", updateCartCount);

    // Limpa o evento ao desmontar o componente
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow">
      <Container>
        <Navbar.Brand as={HashLink} smooth to="/dashboard#top">
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
          />
          <span className="fw-bold text-danger">HOT</span>PEPPER
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              as={HashLink}
              smooth
              to="/dashboard#produtos"
              className="mx-2"
            >
              Pacotes
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/produtos"
              className="mx-2 fw-bold text-white bg-danger rounded px-3 py-1"
              style={{ fontSize: "0.9rem" }}
            >
              Vitrine Quente
            </Nav.Link>

            <Nav.Link
              as={HashLink}
              smooth
              to="/dashboard#sobre"
              className="mx-2"
            >
              Curiosidades
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              smooth
              to="/dashboard#contato"
              className="mx-2"
            >
              Contato
            </Nav.Link>

            {/* ÍCONE DO CARRINHO */}
            <Nav.Link
              as={Link}
              to="/carrinho"
              className="mx-3 position-relative d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.1)")
              }
            >
              <img
                src={carrinhoIcon}
                alt="Carrinho"
                width="22"
                height="22"
                style={{ filter: "brightness(0) invert(1)" }}
              />

              {/* O número só aparece se houver itens no carrinho */}
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.65rem", border: "2px solid #212529" }}
                >
                  {cartCount}
                </span>
              )}
            </Nav.Link>

            <Button
              variant="outline-danger"
              size="sm"
              className="ms-lg-3"
              onClick={() => navigate("/login")}
            >
              Sair
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
