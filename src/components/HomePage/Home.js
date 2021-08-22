import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../HomePage/Home.css';
import axios from 'axios';

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isRedirect, setIsRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [time, setTime] = useState(0);
  const [expireAt, setExpireAt] = useState(null);
  const [messageData, setMessageData] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const dt = new Date();
    dt.setMinutes(dt.getMinutes() + parseInt(time));
    setExpireAt(dt);
  };
  useEffect(() => {
    expireAt && postDmessage();
  }, [expireAt]);
  const postDmessage = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await axios.post('http://localhost:8000/dmessages', {
        userId: userInfo.id,
        dismessage: message,
        expireAt,
      });
      setMessageData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setIsRedirect(true);
  };
  if (isRedirect) {
    return <Redirect to="/" />;
  }
  return (
    <>
      {userInfo && (
        <div className="homeContainer">
          <h1>{userInfo && userInfo.username}</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></input>
              <input
                placeholder="Enter expiry time in minutes"
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              ></input>
              <button type="submit">Generate</button>
              {messageData && (
                <div>
                  <Link to={`/message/${messageData.dId}`}>go to link</Link>
                </div>
              )}
            </form>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
};

export default Home;
