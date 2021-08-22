import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
const Message = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [time, setExpireAt] = useState(null);
  const [messageData, setMessageData] = useState(null);
  const [timeover, setTimeOver] = useState(false);
  const { dId } = useParams();
  const getMessage = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await axios.post(
        'http://localhost:8000/dmessages/content',
        {
          dId,
        }
      );
      setMessageData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };
  const handleTimeout = (time) => {
    if (time > 0) {
      setTimeout(() => {
        setTimeOver(true);
      }, time);
    } else {
      setTimeOver(true);
    }
  };
  useEffect(() => {
    if (messageData) {
      const dt = new Date(messageData.expireAt);
      const time = dt - Date.now();
      handleTimeout(time);
    }
  }, [messageData]);
  useEffect(() => {
    dId && getMessage();
  }, [dId]);
  if (timeover) {
    return <Redirect to="/Error" />;
  }

  return <div>{messageData && <h4>{messageData.dismessage}</h4>}</div>;
};

export default Message;
