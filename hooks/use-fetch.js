import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://hala-qr.jmintel.net/api/v1${url}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer 1|GsIbagVEXgVewvLFeBY0zzg1EgowdLdQeA3wMdN9fff267c6`,
              Accept: "application/json",
              "Accept-Language": "ar",
            },
          },
        );

        const data = await response.json();
        setData(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, isLoading };
};

export default useFetch;
