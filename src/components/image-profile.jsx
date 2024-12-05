import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { LuPencil } from "react-icons/lu";
import Swal from "sweetalert2";

import { setUser } from "../redux/feature/userSlice";
import { updateProfileImage } from "../actions/profile";
import images from "../constants/image";

const capitalizeName = (name) =>
  name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const ImageProfile = ({ user }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      Swal.fire(
        "Error",
        "Format Image tidak sesuai. Hanya JPEG/PNG diterima.",
        "error"
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      const response = await updateProfileImage(formData);

      if (response.status === 0) {
        Swal.fire("Success", response.message, "success");
        dispatch(setUser(response.data));
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {isLoading ? (
          <div className="w-40 h-40 flex items-center justify-center rounded-full border-2 border-gray-300">
            <div className="animate-spin border-t-2 border-gray-600 rounded-full w-10 h-10"></div>
          </div>
        ) : (
          <img
            src={
              user.profile_image && !user.profile_image.includes("null")
                ? user.profile_image
                : images.profilePhoto
            }
            alt="User"
            className="w-40 h-40 rounded-full object-cover border-2 border-gray-300"
          />
        )}
        <button
          type="button"
          className="absolute bottom-2 right-2 bg-white border border-gray-300 rounded-full p-2 flex items-center justify-center"
          onClick={handleIconClick}
        >
          <LuPencil className="text-black text-lg" />
        </button>
        <input
          type="file"
          accept="image/jpeg, image/png"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
      <div className="mt-6 text-xl font-bold text-gray-700">
        {capitalizeName(`${user?.first_name || ""} ${user?.last_name || ""}`)}
      </div>
    </div>
  );
};

ImageProfile.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    profile_image: PropTypes.string,
  }).isRequired,
};

export default ImageProfile;
