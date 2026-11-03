import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomNavbar from "../../components/Navbar";
import { useProducts } from "../Products/useProducts";

export default function DashboardView({ produtos, curiosidades, contato }) {
  const { produtos: produtosVitrine } = useProducts();

  return (
    <div id="top" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <CustomNavbar />

      <Container style={{ marginTop: "100px" }}>
        {/* SEÇÃO DE PACOTES */}
        <div id="produtos" className="pt-5 mb-5 text-center">
          <div className="mb-4">
            <h2 className="fw-bold d-inline-block border-bottom border-danger border-3 pb-2 text-dark">
              Nossos <span className="text-danger">Hot Pacotes</span>
            </h2>
            <p className="text-muted small mt-2">
              Escolha seu nível de coragem e sinta a pressão.
            </p>
          </div>

          <Row className="g-4">
            {produtos.slice(0, 3).map((p) => (
              <Col key={p.id} md={4}>
                <Card className="h-100 shadow-sm border-0 transition-hover">
                  <Card.Header
                    className={`bg-${p.cor} text-white py-3 fw-bold border-0 text-uppercase small`}
                  >
                    {p.titulo}
                  </Card.Header>

                  <div
                    className="bg-light p-3"
                    style={{
                      height: "290px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                  >
                    {p.imagem && (
                      <Link
                        to={`/pacote/${p.id}`}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src={p.imagem}
                          className="transition-zoom"
                          style={{
                            maxHeight: "100%",
                            maxWidth: "100%",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      </Link>
                    )}
                  </div>

                  <Card.Body className="d-flex flex-column text-center">
                    <Card.Title className="display-6 fw-bold mb-3 mt-1 text-dark">
                      R$ {p.preco}
                    </Card.Title>
                    <ul className="list-unstyled text-muted mb-4 flex-grow-1 small">
                      {p.itens.map((item, i) => (
                        <li key={i} className="mb-2">
                          ✓ {item}
                        </li>
                      ))}
                    </ul>
                    <Button
                      as={Link}
                      to={`/pacote/${p.id}`}
                      variant={p.cor === "warning" ? "warning" : p.cor}
                      className="w-100 fw-bold py-2 shadow-sm text-uppercase small"
                    >
                      Comprar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* VITRINE PADRONIZADA */}
        <div id="vitrine-destaque" className="py-5 mb-5 text-center">
          <div className="mb-5">
            <h2 className="fw-bold d-inline-block border-bottom border-danger border-3 pb-2 text-dark">
              Destaques da <span className="text-danger">Coleção</span>
            </h2>
            <p className="text-muted small mt-3">
              Engenharia de Sabor & Ardor Gastronômico
            </p>
          </div>

          <Row className="gx-5 gy-4 mb-4 justify-content-center">
            {produtosVitrine.slice(0, 3).map((p) => (
              <Col key={p.id} xs={12} sm={6} lg={4}>
                <Card className="border-0 rounded-0 h-100 bg-transparent product-card text-start">
                  <div
                    className="position-relative overflow-hidden"
                    style={{
                      aspectRatio: "1/1",
                      backgroundColor: "#f9f9f9",
                      padding: "20px",
                    }}
                  >
                    <Link
                      to={`/produto/${p.id}`}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={p.imagem}
                        className="rounded-0 img-fluid transition-zoom"
                        style={{
                          mixBlendMode: "multiply",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Link>
                  </div>

                  <Card.Body className="px-0 py-3">
                    <Card.Title
                      className="text-uppercase fw-bold mb-1"
                      style={{ letterSpacing: "2px", fontSize: "1.20rem" }}
                    >
                      {p.nome}
                    </Card.Title>
                    <div className="d-flex justify-content-between align-items-center pt-2 border-top border-light">
                      <span
                        className="text-secondary"
                        style={{ fontSize: "1rem" }}
                      >
                        A partir de R$ {p.preco}
                      </span>
                      <Link
                        to={`/produto/${p.id}`}
                        className="text-dark text-decoration-none small fw-bold btn-add-hover"
                        style={{ fontSize: "0.7rem" }}
                      >
                        VER DETALHES +
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <Button
              as={Link}
              to="/produtos"
              variant="dark"
              className="rounded-0 text-uppercase fw-bold px-5 py-3 shadow-sm"
              style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}
            >
              Explorar Vitrine Completa →
            </Button>
          </div>
        </div>

        {/* SEÇÃO DE CURIOSIDADES */}
        <div id="sobre" className="pt-5 border-top mb-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold d-inline-block border-bottom border-danger border-3 pb-2 text-dark">
              Hot <span className="text-danger">Curiosidades</span>
            </h2>
          </div>
          <Row className="g-4">
            {curiosidades.map((c) => (
              <Col key={c.id} md={4}>
                <Card className="h-100 shadow-sm border-0 rounded-3 overflow-hidden bg-white">
                  <div className="ratio ratio-16x9">
                    <Card.Img src={c.imagem} style={{ objectFit: "cover" }} />
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold text-dark h6 mb-3 text-uppercase">
                      {c.titulo}
                    </Card.Title>
                    <Card.Text className="text-muted small leading-relaxed">
                      {c.texto}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* SEÇÃO DE CONTATO */}
        <div id="contato" className="pt-5 pb-5 border-top text-center">
          <div className="mb-5">
            <h2 className="fw-bold d-inline-block border-bottom border-dark border-3 pb-2 text-dark">
              Contato
            </h2>
          </div>
          <Row className="g-3 text-start">
            {[
              { label: "Responsável", valor: contato.nome },
              { label: "Suporte", valor: contato.email },
              { label: "WhatsApp", valor: contato.telefone },
            ].map((item, i) => (
              <Col key={i} md={4}>
                <Card className="h-100 shadow-sm border-0 border-bottom border-danger border-3 bg-white">
                  <Card.Body className="p-4">
                    <h6
                      className="fw-bold text-danger mb-3 text-uppercase small"
                      style={{ letterSpacing: "1px" }}
                    >
                      {item.label}
                    </h6>
                    <p className="text-dark mb-0 fw-medium small">
                      {item.valor}
                    </p>
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
