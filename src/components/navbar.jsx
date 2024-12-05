import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCaretDown, FaBars, FaTimes } from "react-icons/fa";

import images from "../constants/image";
import { clearUser } from "../redux/feature/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    navigate("/login");
  };

  const shortenEmail = (email) => {
    const maxLength = 10;
    if (email.length > maxLength) {
      return email.substring(0, maxLength) + "...@gmail.com";
    }
    return email;
  };

  const isActivePath = (path) => location.pathname === path;

  return (
    <nav className="bg-[#f3f3f3] shadow-md">
      {/* Outer Container */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left Content */}
        <div className="flex items-center space-x-4">
          <img src={images.logo} alt="Logo" className="h-10 w-auto" />
          <span className="text-lg font-semibold text-gray-800">SIMS PPOB</span>
        </div>

        {/* Hamburger for Mobile */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FaTimes className="text-gray-600" />
            ) : (
              <FaBars className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Right Content (Desktop and Mobile) */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:flex items-center space-x-6`}
        >
          <Link
            to="/"
            className={`${
              isActivePath("/") ? "text-red-500" : "text-gray-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/topup"
            className={`${
              isActivePath("/topup") ? "text-red-500" : "text-gray-600"
            }`}
          >
            Top Up
          </Link>
          <Link
            to="/transaction"
            className={` ${
              isActivePath("/transaction") ? "text-red-500" : "text-gray-600"
            }`}
          >
            Transaction
          </Link>
          <Link
            to="/account"
            className={` ${
              isActivePath("/account") ? "text-red-500" : "text-gray-600"
            }`}
          >
            Account
          </Link>

          {/* Profile Image and Dropdown */}
          {user && (
            <div className="relative">
              <div
                className="flex items-center cursor-pointer space-x-2"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <img
                  src={
                    user.profile_image && !user.profile_image.includes("null")
                      ? user.profile_image
                      : images.profilePhoto
                  }
                  alt="User"
                  className="h-10 w-10 rounded-full"
                />
                <FaCaretDown className="text-gray-600" />
              </div>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                  <p className="px-4 py-2 text-sm text-gray-700">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="px-4 py-2 text-sm text-gray-500">
                    {shortenEmail(user.email)}
                  </p>
                  <hr className="my-2" />
                  <button
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
