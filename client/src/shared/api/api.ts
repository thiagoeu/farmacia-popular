import axios from "axios";
import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// Extender o tipo InternalAxiosRequestConfig para incluir _retry
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000", // URL do backend
});

// Interceptor de requisição: adiciona o access_token automaticamente
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de resposta: trata erros 401 (token expirado) e 403 (acesso negado)
api.interceptors.response.use(
  (response) => response, // passa respostas válidas normalmente
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | CustomAxiosRequestConfig
      | undefined;

    // 401: token expirado ou inválido (não confundir com login incorreto)
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/login" // ⚠️ evita refresh quando for login
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("Sem refresh token");

        // Tenta gerar novo access token usando refresh token
        const response = await axios.post<{
          access_token: string;
          refresh_token: string;
        }>("http://localhost:3000/auth/refresh", { refreshToken });

        const { access_token, refresh_token } = response.data;

        // Atualiza localStorage com novos tokens
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        // Atualiza header da requisição original
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }

        // Repete a requisição original com o token atualizado
        return api(originalRequest as InternalAxiosRequestConfig);
      } catch (refreshError) {
        // Falha no refresh: limpa tokens e redireciona para login
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // 403: acesso negado
    if (error.response?.status === 403) {
      alert("Acesso negado: você não tem permissão.");
    }

    // 409: conflito (ex.: usuário já existe)
    if (error.response?.status === 409) {
      const message =
        (error.response.data as { message?: string })?.message ||
        "Conflito ao processar a requisição.";
      alert(`Erro: ${message}`);
    }

    // Qualquer outro erro, repassa para ser tratado no front
    return Promise.reject(error);
  }
);

export default api;
