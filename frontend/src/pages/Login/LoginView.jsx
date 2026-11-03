import { Container, Form, Button, Card, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function LoginView({
  setEmail,
  setPassword,
  loading,
  error,
  handleSubmit,
}) {
  return (
    <Container
      className="d-flex align-items-center justify-content-center login-bg"
      style={{ minHeight: "100vh" }}
    >
      <Card
        style={{ width: "200%", maxWidth: "500px" }}
        className="p-4 shadow-lg border-0"
      >
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="HotPepper Logo"
            className="d-block mx-auto mb-3"
            style={{ width: "80px", height: "auto" }}
          />
          <h3 className="fw-bold text-danger">Login</h3>
          <p className="text-muted small">Entre com suas credenciais</p>
        </div>

        {error && (
          <Alert variant="danger" className="py-2 small">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="exemplo@ufv.br"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="•••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            variant="danger"
            type="submit"
            className="w-100 py-2 fw-bold"
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Entrar"}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <Link to="#" className="text-decoration-none text-danger small">
            Esqueceu a senha?
          </Link>
          <hr />
          <p className="small text-muted">
            Não tem uma conta?{" "}
            <Link
              to="/register"
              className="text-decoration-none text-danger fw-bold"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </Card>
    </Container>
  );
}
