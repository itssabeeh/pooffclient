import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export const usePost = (url, body) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);

  const postData = useCallback(async () => {
    try {
      const record = await axios.post(url, body);
      setData(record);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  }, [url]);

  useEffect(() => {
    postData();
  }, [url, postData]);

  return { isLoading, data, isError };
};
