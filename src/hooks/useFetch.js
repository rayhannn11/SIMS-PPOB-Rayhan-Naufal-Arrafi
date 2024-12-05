import { useState, useEffect, useCallback, useMemo } from "react";

const useFetch = (fn, params = {}) => {
  const [data, setData] = useState(null); // Initial data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fn(params); // Call  function
      setData(res);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [fn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => fetchData();

  // Memoize return values to ensure stable output
  return useMemo(
    () => ({ data, loading, error, refetch }),
    [data, loading, error]
  );
};

export default useFetch;
