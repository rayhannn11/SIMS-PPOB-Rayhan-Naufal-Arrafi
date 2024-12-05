import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // URL base dari .env
});

// Tambahkan interceptor untuk menyisipkan token di header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Tangani error permintaan
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Tambahkan interceptor untuk menangani respons
axiosInstance.interceptors.response.use(
  (response) => response, // Jika respons berhasil, langsung kembalikan
  (error) => {
    // Tangani error di respons
    if (error.response?.status === 401) {
      console.warn("Token invalid or expired. Redirecting to login...");
      localStorage.removeItem("token"); // Hapus token
      window.location.href = "/login"; // Redirect ke halaman login
    }
    return Promise.reject(error); // Tetap kembalikan error untuk dihandle lebih lanjut
  }
);

export default axiosInstance;
