import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

function getCookie(name) {
  const match = document.cookie.match(
    new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"),
  );
  return match ? decodeURIComponent(match[3]) : null;
}

api.interceptors.request.use(async (config) => {
  // 1. INJEÇÃO DO TOKEN (Estratégia Stateless)
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  // 2. INJEÇÃO DE CSRF/COOKIE (Mantém a estratégia original ativa)
  const xsrf = getCookie("XSRF-TOKEN");
  if (!xsrf) {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
        headers: { Accept: "application/json" },
      });
    } catch (e) {
      // Ignora falhas silenciosas no CSRF
    }
  }

  const xsrfAfter = getCookie("XSRF-TOKEN");
  if (xsrfAfter) {
    config.headers["X-XSRF-TOKEN"] = xsrfAfter;
  }

  return config;
});

export default api;
