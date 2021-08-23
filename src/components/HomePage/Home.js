import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../HomePage/Home.css';
import axios from 'axios';
import Loading from '../Loading/Loading';
import Dashboard from '../DashBoard/Dashboard';
import { BiMessage } from 'react-icons/bi';

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isRedirect, setIsRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [time, setTime] = useState('');
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
      setMessageData(null);
      setIsError(false);
      const response = await axios.post('http://localhost:8000/dmessages', {
        userId: userInfo.id,
        dismessage: message,
        expireAt,
      });
      setMessageData(response.data);
      setIsLoading(false);
      setMessage('');
      setTime('');
    } catch (error) {
      setIsError(true);
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
          <div className="home-head">
            <h1>Hey!..{userInfo && userInfo.username}</h1>
            <button
              className="dash-btn"
              type="button"
              onClick={() => setShowLogin(!showLogin)}
            >
              <BiMessage size={30} />
            </button>
          </div>
          <div className="home-body">
            {showLogin ? (
              <form className="message-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter your message"
                  value={message}
                  required
                  onChange={(e) => setMessage(e.target.value)}
                ></input>
                <input
                  placeholder="Enter expiry time in minutes"
                  type="number"
                  value={time}
                  required
                  onChange={(e) => setTime(e.target.value)}
                ></input>
                {isLoading ? (
                  <Loading />
                ) : (
                  <button type="submit">Generate</button>
                )}
                {messageData && (
                  <div className="disappear-link">
                    <Link
                      style={{ textDecoration: 'none', color: 'white' }}
                      to={`/message/${messageData.dId}`}
                    >
                      go to the disappearing message
                    </Link>
                  </div>
                )}
              </form>
            ) : (
              <div className="dashboard-container">
                <Dashboard />
              </div>
            )}
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
