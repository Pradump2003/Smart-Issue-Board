import { useState, useCallback } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useFetchApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApi = useCallback(async ({ url, method = "GET", data = null }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔑 IMPORTANT for cookies
        body: data ? JSON.stringify(data) : null,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Request failed");
      }

      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchApi, loading, error };
};

export default useFetchApi;
