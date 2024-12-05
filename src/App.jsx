import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setUser, setError } from "./redux/feature/userSlice";
import useFetch from "./hooks/useFetch";
import { getProfile } from "./actions/profile";

import Navbar from "./components/navbar";
import Loading from "./components/loading";

function App() {
  const dispatch = useDispatch();
  const { data: profile, loading, error } = useFetch(getProfile);

  useEffect(() => {
    if (profile) {
      dispatch(setUser(profile)); // Save profile to Redux
    }
    if (error) {
      dispatch(setError(error.message)); // Save error to Redux
    }
  }, [profile, error, dispatch]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      {" "}
      <Navbar />
      <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 ">
        <Outlet />
      </main>
    </>
  );
}

export default App;
