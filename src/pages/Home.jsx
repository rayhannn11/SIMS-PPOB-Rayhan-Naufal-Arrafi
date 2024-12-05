import { lazy, Suspense } from "react";

import Loading from "../components/loading";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { getBanner, getServices } from "../actions/information";

const UserInformation = lazy(() => import("../components/user-information"));

const Home = () => {
  const {
    data: dataServices,
    loading: LoadingBanner,
    error: ErrorServices,
  } = useFetch(getServices);
  const {
    data: dataBanner,
    loading: LoadingServices,
    error: ErrorBanner,
  } = useFetch(getBanner);

  console.log(dataBanner);

  return (
    <div className="min-h-screen flex justify-center items-start my-10 mb">
      <div className="w-full max-w-[80%] flex flex-col space-y-6 gap-10">
        {/* UserProfile & Amount*/}
        <Suspense fallback={<Loading />}>
          <UserInformation />
        </Suspense>
        {/* Menu Service */}
        <div className="flex w-full gap-10">
          {dataServices?.map((service) => (
            <Link
              key={service?.service_code}
              to={`/service/${encodeURIComponent(
                service?.service_code
              )}?tariff=${service?.service_tariff}`}
              className="flex flex-col items-center space-y-2 text-center"
            >
              <img
                src={service?.service_icon}
                alt={service?.service_name}
                className="w-16 h-16 object-contain rounded-full"
              />
              <p className="text-sm font-medium text-gray-700">
                {service?.service_name}
              </p>
            </Link>
          ))}
        </div>
        <div className="flex flex-col w-full ">
          <p className="text-lg ">Temukan promo menarik</p>
          <div className="flex justify-center items-center gap-3">
            {dataBanner?.map((banner) => (
              <div key={banner?.banner_image}>
                <img
                  src={banner?.banner_image}
                  alt={banner?.banner_name}
                  className="w-[260px] h-[260px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
