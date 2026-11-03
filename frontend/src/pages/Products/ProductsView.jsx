import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import CustomNavbar from "../../components/Navbar";
import { useProducts } from "../Products/useProducts";
import { Link } from "react-router-dom";

export default function ProductsView({ produtos, contato }) {
  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <CustomNavbar />

      <Container
        style={{
          marginTop: "160px",
          marginBottom: "100px",
          maxWidth: "1200px",
        }}
      >
        {/* CABEÇALHO IMPACTANTE PADRONIZADO */}
        <div className="mb-5 pb-5 text-center">
          <h1
            className="fw-bold text-uppercase display-5 mb-3"
            style={{ letterSpacing: "0.2em" }}
          >
            Coleção{" "}
            <span className="text-danger border-bottom border-danger border-4 pb-2">
              Hot-Molhos
            </span>
          </h1>
          <p
            className="text-muted text-uppercase mt-4"
            style={{ letterSpacing: "0.15em", fontSize: "0.9rem" }}
          >
            Engenharia de Sabor & Ardor Gastronômico
          </p>
        </div>

        {/* GRID DE PRODUTOS */}
        <Row className="gx-5 gy-5 mb-5 pb-5">
          {produtos.map((p) => (
            <Col key={p.id} xs={12} sm={6} lg={4}>
              <Card className="border-0 rounded-0 h-100 product-card bg-transparent">
                {/* Container da Imagem */}
                <div
                  className="position-relative overflow-hidden"
                  style={{
                    aspectRatio: "1/1",
                    backgroundColor: "#f9f9f9",
                    padding: "30px",
                  }}
                >
                  {p.tag && (
                    <Badge
                      bg="dark"
                      className="position-absolute top-0 start-0 m-3 rounded-0 fw-bold px-3 py-2"
                      style={{
                        zIndex: 2,
                        fontSize: "0.75rem",
                        letterSpacing: "1px",
                      }}
                    >
                      {p.tag}
                    </Badge>
                  )}

                  {/* Link envolvendo apenas a imagem, mantendo a tag intacta */}
                  <Link
                    to={`/produto/${p.id}`}
                    style={{ display: "block", height: "100%" }}
                  >
                    <Card.Img
                      variant="top"
                      src={p.imagem}
                      className="rounded-0 img-fluid transition-zoom"
                      style={{
                        mixBlendMode: "multiply",
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Link>
                </div>

                <Card.Body className="px-0 py-4 d-flex flex-column text-center">
                  <Card.Title
                    className="text-uppercase fw-bold mb-2"
                    style={{ letterSpacing: "1.5px", fontSize: "1rem" }}
                  >
                    {p.nome}
                  </Card.Title>
                  <Card.Text
                    className="text-muted small mb-4 flex-grow-1"
                    style={{ lineHeight: "1.6" }}
                  >
                    {p.descricao}
                  </Card.Text>

                  {/* Preço em Destaque */}
                  <div className="mb-3">
                    <span
                      className="fw-bold display-6"
                      style={{ fontSize: "1.4rem" }}
                    >
                      R$ {p.preco}
                    </span>
                  </div>

                  {/* BOTÃO DE ADICIONAR COM LINK ATIVO */}
                  <Button
                    as={Link}
                    to={`/produto/${p.id}`}
                    variant="success"
                    className="rounded-0 text-uppercase fw-bold py-3 shadow-sm btn-add-premium"
                    style={{ letterSpacing: "3px", fontSize: "0.8rem" }}
                  >
                    Comprar agora
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* SEÇÃO DE CONTATO PADRONIZADA */}
        <div id="contato" className="pt-5 pb-5 border-top text-center">
          <div className="mb-5">
            <h3
              className="fw-bold d-inline-block border-bottom border-dark border-3 pb-2 text-dark text-uppercase"
              style={{ letterSpacing: "0.1em" }}
            >
              Contato
            </h3>
          </div>
          <Row className="g-4">
            {[
              { label: "Nome Responsável", valor: contato.nome },
              { label: "E-mail de Suporte", valor: contato.email },
              { label: "Telefone / WhatsApp", valor: contato.telefone },
            ].map((item, i) => (
              <Col key={i} md={4}>
                <Card className="h-100 shadow-sm border-0 border-bottom border-danger border-3 bg-white">
                  <Card.Body className="p-4 text-start">
                    <h6
                      className="fw-bold text-danger mb-3 text-uppercase small"
                      style={{ letterSpacing: "1px" }}
                    >
                      {item.label}
                    </h6>
                    <p className="text-dark mb-0 fw-medium">{item.valor}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
}
