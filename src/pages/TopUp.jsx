import { useState, lazy, Suspense } from "react";
import Swal from "sweetalert2";

import { CiCreditCard1 } from "react-icons/ci";

import { postTopUp } from "../actions/transaction";
import Loading from "../components/loading";

const UserInformation = lazy(() => import("../components/user-information"));

const TopUp = () => {
  const [inputAmount, setInputAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle Top Up
  const handleSelectChange = (value) => {
    setSelectedAmount(value);
    setInputAmount(value);
  };

  const handleSubmit = async () => {
    if (!selectedAmount) return;

    console.log(selectedAmount);
    try {
      setIsLoading(true);
      // Call API
      const response = await postTopUp({ top_up_amount: selectedAmount });

      const { status, message } = response;

      if (status === 0) {
        // If TopUp successful
        Swal.fire({
          icon: "success",
          title: "Top Up Berhasil",
          text: message,
          timer: 1500,
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        // Handle unexpected API response
        Swal.fire({
          icon: "warning",
          title: "Top Up Gagal",
          text: message || "Kesalahan tak terduga. Silakan coba lagi.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      // Log error for debugging
      console.error("Top Up Error:", error);

      // Display error message
      Swal.fire({
        icon: "error",
        title: "Top Up Gagal",
        text:
          error.response?.data?.message ||
          "Terjadi kesalahan dalam melakukan Top Up. Silakan coba lagi.",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-start mt-10">
      <div className="w-full max-w-[80%] flex flex-col space-y-6 gap-10">
        {/* UserProfile & Amount*/}
        <Suspense fallback={<Loading />}>
          <UserInformation />
        </Suspense>
        {/* Masukan Amount*/}
        <div className="flex flex-col  w-2/3 space-y-2">
          <p className="text-lg ">Silahkan Masukan</p>
          <p className="text-2xl font-bold truncate ">Nominal Top Up</p>
        </div>
        {/* Top Up*/}
        <div className="flex justify-between gap-6 w-full">
          {/* FormTopUp */}
          <div className="relative flex flex-col w-[60%] gap-4">
            <CiCreditCard1 className="absolute left-4 top-8 transform -translate-y-1/2 text-2xl text-gray-500 font" />
            <input
              type="number"
              id="topUpAmount"
              value={inputAmount}
              className="p-4 pl-12 border border-gray-300 rounded-lg w-full"
              placeholder="Masukkan Nominal Top Up"
              disabled
            />
            <button
              onClick={handleSubmit}
              disabled={!selectedAmount || isLoading}
              className={`w-full py-3 text-white rounded-lg cursor-pointer ${
                selectedAmount || isLoading
                  ? "bg-red-500"
                  : "bg-gray-300 cursor-not-allowed"
              }   
              `}
            >
              Top Up
            </button>
          </div>

          {/* Option Amount TopUp */}
          <div className="flex items-center justify-start flex-wrap  gap-2 w-1/2">
            {/* Opsi untuk memilih nominal */}
            {[
              { value: "10000", label: "Rp 10.000" },
              { value: "20000", label: "Rp 20.000" },
              { value: "50000", label: "Rp 50.000" },
              { value: "100000", label: "Rp 100.000" },
              { value: "250000", label: "Rp 250.000" },
              { value: "500000", label: "Rp 500.000" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectChange(option.value)}
                className={`text-lg h-12 w-36 px-6 rounded-lg border border-[#ccc] m-1 cursor-pointer ${
                  selectedAmount === option.value
                    ? "bg-red-500 text-white !important"
                    : "bg-white text-gray-700"
                }}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUp;
