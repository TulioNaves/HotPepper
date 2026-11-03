import { Container, Form, Button, Card, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function RegisterView({
  setName,
  setCpf,
  setEmail,
  setPassword,
  setConfirmPassword,
  loading,
  error,
  success,
  handleSubmit,
}) {
  // Função interna para formatar o CPF enquanto o usuário digita
  const handleCpfChange = (e) => {
    let value = e.target.value;

    // Remove tudo o que não é número
    value = value.replace(/\D/g, "");

    // Aplica a máscara progressivamente
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    e.target.value = value; // Atualiza o valor visual no input
    setCpf(value); // Envia o valor formatado para o estado (Hook)
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center login-bg"
      style={{ minHeight: "100vh" }}
    >
      <Card
        style={{ width: "300%", maxWidth: "500px" }}
        className="p-4 shadow-lg border-0"
      >
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="HotPepper Logo"
            className="d-block mx-auto mb-3"
            style={{ width: "60px", height: "auto" }}
          />
          <h3 className="fw-bold text-danger">Criar Conta</h3>
          <p className="text-muted small">
            Preencha os dados para se cadastrar
          </p>
        </div>

        {error && (
          <Alert variant="danger" className="py-2 small">
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" className="py-2 small">
            {success}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold small">Nome Completo</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          {/* NOVO CAMPO: CPF COM MÁSCARA */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold small">CPF</Form.Label>
            <Form.Control
              type="text"
              placeholder="000.000.000-00"
              maxLength="14"
              onChange={handleCpfChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold small">E-mail</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold small">Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold small">
              Confirmar Senha
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex flex-column gap-2">
            <Button
              variant="danger"
              type="submit"
              className="py-2 fw-bold"
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Cadastrar"}
            </Button>
            <hr />
            <Button
              as={Link}
              to="/login"
              variant="outline-secondary"
              className="py-2 fw-bold"
              disabled={loading}
            >
              Voltar para o Login
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
