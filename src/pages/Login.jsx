import { useState } from "react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
} from "react-icons/ai";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { postLogin } from "../actions/auth";
import { loginSchema } from "../utils/zod";
import images from "../constants/image";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // React Hook Form setup with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    // Destructure email and password from form data
    const { email, password } = data;

    // Early validation: Check if fields are filled
    if (!email || !password) return;

    try {
      setLoading(true);
      // Call API
      const response = await postLogin({ email, password });

      const { status, message, data: responseData } = response;

      if (status === 0) {
        // If login successful
        localStorage.setItem("token", responseData.token); // Save token in local storage
        Swal.fire({
          icon: "success",
          title: "Login Berhasil",
          text: message,
          timer: 1500,
          showConfirmButton: false,
        });

        // Redirect to home page after success
        navigate("/");
      } else {
        // Handle unexpected API response
        Swal.fire({
          icon: "warning",
          title: "Login Gagal",
          text: message || "Kesalahan tak terduga. Silakan coba lagi.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      // Log error for debugging
      console.error("Login Error:", error);

      // Display error message
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text:
          error.response?.data?.message ||
          "Terjadi kesalahan dalam melakukan login. Silakan coba lagi.",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      {/* Container */}
      <div className="min-h-screen w-full flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side  */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-4/5">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img
                src={images.logo}
                alt="Logo"
                className="w-10 h-10 object-cover"
              />
              <h1 className="text-center text-xl font-bold text-black">
                SIMS PPOB
              </h1>
            </div>

            <p className="text-center text-2xl text-black font-semibold mb-8">
              Masuk atau buat akun untuk memulai
            </p>

            <form onSubmit={handleSubmit(handleLogin)}>
              {/* Email Input */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <AiOutlineMail size={20} />
                  </span>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`pl-10 mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                    placeholder="Masukkan email Anda"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <AiOutlineLock size={20} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    {...register("password")}
                    className={`pl-10 mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                    placeholder="Masukkan password Anda"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible size={20} />
                    ) : (
                      <AiFillEye size={20} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-2 px-4 rounded-lg font-bold text-white transition duration-300 ${
                  loading
                    ? "bg-[#e26a62] cursor-not-allowed"
                    : "bg-[#F42619] hover:bg-[#c71508]"
                }`}
                disabled={loading}
              >
                Masuk
              </button>
            </form>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Belum punya akun? Registrasi{" "}
              <a href="/register" className="text-red-500 hover:underline">
                di sini
              </a>
            </p>
          </div>
        </div>

        {/* Right Side  */}
        <div className="hidden md:block w-full md:w-1/2 bg-[#FFF1F0] max-h-screen">
          <img
            src={images.ilustrasiLogin}
            alt="Login Illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
