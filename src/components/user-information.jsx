import { useState } from "react";
import { useSelector } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useFetch from "../hooks/useFetch";
import { getBalance } from "../actions/transaction";
import Loading from "../components/loading";
import images from "../constants/image";

const UserInformation = () => {
  const { user } = useSelector((state) => state.user);
  const { data: dataBalance, loading, error } = useFetch(getBalance);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  // Handle balance visibility toggle
  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  // Function to capitalize user name
  const capitalizeName = (name) =>
    name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  // Show loading indicator while fetching data
  if (loading) {
    return <Loading />;
  }

  // Handle any error from data fetching
  if (error) {
    console.log(error.message);
    return null;
  }

  return (
    <div className="flex items-center justify-between w-full">
      {/* User Profile */}
      <div className="flex flex-col w-1/5 space-y-2">
        <img
          src={
            user.profile_image && !user.profile_image.includes("null")
              ? user.profile_image
              : images.profilePhoto
          }
          alt="User"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
        <p className="text-lg">Selamat Datang,</p>
        <p className="text-2xl font-bold truncate">
          {capitalizeName(`${user?.first_name || ""} ${user?.last_name || ""}`)}
        </p>
      </div>

      {/* Amount Balance */}
      <div className="flex flex-col justify-between gap-3 bg-red-500 text-white rounded-lg p-6 w-2/3">
        <p className="text-lg">Saldo Anda</p>
        <p className="text-2xl font-bold">
          Rp{" "}
          {isBalanceVisible ? (
            dataBalance?.balance ?? "N/A"
          ) : (
            <span>********</span>
          )}
        </p>
        <button
          className="flex items-center gap-2 text-white text-lg"
          onClick={toggleBalanceVisibility}
        >
          <span>{isBalanceVisible ? "Tutup Saldo" : "Lihat Saldo"}</span>
          {isBalanceVisible ? <FiEyeOff size={24} /> : <FiEye size={24} />}
        </button>
      </div>
    </div>
  );
};

export default UserInformation;
