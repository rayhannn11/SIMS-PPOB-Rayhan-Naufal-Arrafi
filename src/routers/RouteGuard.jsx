import { Navigate } from "react-router-dom";

export default function RouteGuard({ children, isPrivate }) {
  const token = localStorage.getItem("token") || "";

  // Jika route private, hanya izinkan akses dengan token
  if (isPrivate && !token) {
    return <Navigate to="/login" />;
  }

  // Jika route public, redirect jika ada token
  if (!isPrivate && token) {
    return <Navigate to="/" />;
  }

  return children;
}
