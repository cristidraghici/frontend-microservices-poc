import { useState, useEffect } from "react";

type Data<T> = T | null;
type FetchError = Error | null;
type Loading = boolean;

const useFetch = <T>(url?: string): [Data<T>, FetchError, Loading] => {
  const [data, setData] = useState<Data<T>>(null);
  const [error, setError] = useState<FetchError>(null);
  const [loading, setLoading] = useState<Loading>(true);

  useEffect(() => {
    if (!url) {
      return;
    }

    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = (await response.text()) as T;
        setData(result);
      } catch (err) {
        const e = err as Error;
        if (e.name === "AbortError") {
          // The fetch was aborted, no need to handle it as an error.
          return;
        }

        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Abort the fetch when the component unmounts or when the URL changes
      abortController.abort();
    };
  }, [url]);

  return [data, error, loading];
};

export default useFetch;
