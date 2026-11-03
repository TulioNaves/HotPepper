import { useState } from "react";
import api from "../../service/api";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (password.length < 6) {
        setError("A senha deve ter pelo menos 6 caracteres.");
        return;
      }

      if (!email.includes("@")) {
        setError("Insira um e-mail válido.");
        return;
      }

      const response = await api.post("/api/login", { email, password });

      // Captura o token de autenticação caso o back-end trabalhe com Bearer
      const token = response.data?.token || response.data?.access_token;
      if (token) {
        localStorage.setItem("auth_token", token);
      }

      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao realizar login.");
    } finally {
      setLoading(false);
    }
  };

  return { setEmail, setPassword, loading, error, handleSubmit };
}
