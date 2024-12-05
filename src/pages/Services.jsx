import { Suspense, useState } from "react";
import UserInformation from "../components/user-information";
import Loading from "../components/loading";
import { CiCreditCard1 } from "react-icons/ci";
import { useParams, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { postTransaction } from "../actions/transaction";

const Services = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { service_code } = useParams(); // Mengambil nama service dari URL
  const [searchParams] = useSearchParams();
  const tariff = searchParams.get("tariff");
  const inputAmount = tariff || 0;

  const handleSubmit = async () => {
    if (!service_code) return;
    try {
      setIsLoading(true);
      // Call API
      const response = await postTransaction({ service_code });

      const { status, message } = response;

      if (status === 0) {
        // If TopUp successful
        Swal.fire({
          icon: "success",
          title: "Payment Berhasil",
          text: message,
          timer: 1500,
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.replace("/transaction");
        }, 2000);
      } else {
        // Handle unexpected API response
        Swal.fire({
          icon: "warning",
          title: "Payment Gagal",
          text: message || "Kesalahan tak terduga. Silakan coba lagi.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      // Log error for debugging

      // Display error message
      Swal.fire({
        icon: "error",
        title: "Payment",
        text:
          error.response?.data?.message ||
          "Terjadi kesalahan dalam melakukan Payment. Silakan coba lagi.",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-start my-10 mb">
      <div className="w-full max-w-[80%] flex flex-col space-y-6 gap-10">
        {/* UserProfile & Amount*/}
        <Suspense fallback={<Loading />}>
          <UserInformation />
        </Suspense>
        {/* Masukan Amount*/}
        <div className="flex flex-col  w-2/3 space-y-2">
          <p className="text-lg ">Pembayaran</p>
          <p className="text-2xl font-bold truncate ">{service_code}</p>
        </div>
        {/* Top Up*/}
        <div className="flex justify-between gap-6 w-full">
          {/* FormTopUp */}
          <div className="relative flex flex-col w-full gap-4">
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
              disabled={isLoading}
              className={`w-full py-3 text-white rounded-lg cursor-pointer ${
                isLoading ? "bg-gray-300 cursor-not-allowed " : "bg-red-500"
              }   
              `}
            >
              Bayar{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
