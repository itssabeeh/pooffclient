import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import Timer from '../Timer/Timer';
import '../Message/Message.css';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
const Message = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messageData, setMessageData] = useState(null);
  const [timeover, setTimeOver] = useState(false);
  const { dId } = useParams();
  const getMessage = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await axios.post(
        'https://pooff.herokuapp.com/dmessages/content',
        {
          dId,
        }
      );
      setMessageData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
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
  if (timeover || isError) {
    return <Redirect to="/Error" />;
  }
  return (
    <div className="message-header">
      <Link
        className="logo-holder"
        style={{ textDecoration: 'none', color: 'white' }}
        to="/"
      >
        <h3>Pooff</h3>
      </Link>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {messageData && (
            <>
              <h4>{messageData.dismessage}</h4>
              <Timer expireAt={messageData.expireAt} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Message;
