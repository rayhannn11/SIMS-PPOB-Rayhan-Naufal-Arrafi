import { lazy, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../utils/zod";
import Swal from "sweetalert2";

import { FiAtSign, FiUser } from "react-icons/fi";

import { clearUser, setUser } from "../redux/feature/userSlice";
import { updateProfile } from "../actions/profile";
import { useNavigate } from "react-router-dom";

const ImageProfile = lazy(() => import("../components/image-profile"));

const Account = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user?.email || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
    },
  });

  // handleForm
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    navigate("/login");
  };

  const handleEditProfile = () => {
    setEditing((prev) => !prev);
  };

  // Handle form submission
  const handleSubmitProfile = async (data) => {
    const { first_name, last_name } = data;

    // Early validation
    if (!first_name || !last_name) {
      Swal.fire("Error", "First Name dan Last Name wajib diisi.", "error");
      return;
    }

    try {
      setIsLoading(true);

      // Call API
      const response = await updateProfile({ first_name, last_name });

      if (response.status === 0) {
        Swal.fire("Success", response.message, "success");
        dispatch(setUser(response.data)); // Update user di Redux
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Gagal mengupdate profile.", "error");
    } finally {
      setIsLoading(false);
      setEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[33.75rem] w-full">
      <div className="flex flex-col items-center max-w-xl w-full  p-6 rounded-lg">
        <Suspense
          fallback={
            <div className="w-40 h-40 flex items-center justify-center rounded-full border-2 border-gray-300 ">
              <div className="animate-spin border-t-2 border-gray-600 rounded-full w-10 h-10"></div>
            </div>
          }
        >
          <ImageProfile user={user} />
        </Suspense>

        {/* Form */}
        <form
          className="flex flex-col gap-4 w-full mt-6"
          onSubmit={
            editing
              ? handleSubmit(handleSubmitProfile)
              : (e) => e.preventDefault()
          }
        >
          {/* Email */}
          <div className="relative">
            <FiAtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              {...register("email")}
              className="w-full pl-10 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              disabled={!editing}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* First Name */}
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              {...register("first_name")}
              className="w-full pl-10 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="First Name"
              disabled={!editing}
            />
            {errors.first_name && (
              <span className="text-red-500 text-sm">
                {errors.first_name.message}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              {...register("last_name")}
              className="w-full pl-10 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Last Name"
              disabled={!editing}
            />
            {errors.last_name && (
              <span className="text-red-500 text-sm">
                {errors.last_name.message}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col mt-6 gap-4">
            <button
              type="button"
              className={`w-full py-2 rounded-md ${
                editing
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-[#F42619] text-white hover:bg-[#c71508]"
              }
              ${
                isLoading
                  ? "bg-[#e26a62] cursor-not-allowed"
                  : "bg-[#F42619] text-white hover:bg-[#c71508]"
              }
              `}
              onClick={
                editing ? handleSubmit(handleSubmitProfile) : handleEditProfile
              }
            >
              {editing ? "Submit" : "Edit Profile"}
            </button>
            {!editing && (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-100"
              >
                Logout
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
