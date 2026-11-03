import { useState } from "react";
import api from "../../service/api";

export const useRegister = () => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState(""); // Adicionado estado do CPF
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validação de CPF (mínimo de caracteres com a máscara)
    if (cpf.length < 14) {
      setError("Por favor, insira um CPF completo.");
      setLoading(false);
      return;
    }

    if (password !== password_confirmation) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    try {
      // Limpa o CPF para enviar apenas os 11 números para o Back-end
      const cpfLimpo = cpf.replace(/\D/g, "");

      await api.post("/api/register", {
        name,
        email,
        password,
        password_confirmation,
      });

      setSuccess("Cadastro realizado com sucesso! Redirecionando...");
      // setTimeout(() => { window.location.href = '/login'; }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao realizar cadastro.");
    } finally {
      setLoading(false);
    }
  };

  return {
    setName,
    setCpf, // Exportando o setCpf para a View usar no handleCpfChange
    setEmail,
    setPassword,
    setConfirmPassword,
    loading,
    error,
    success,
    handleSubmit,
  };
};
