import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const shows = await axios.get(url);
      setData(shows);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  return { isLoading, data, isError };
};
