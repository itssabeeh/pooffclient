import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../DashBoard/Dashboard.css';
import Loading from '../Loading/Loading';
import { BiError } from 'react-icons/bi';
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [allMessages, setAllMessages] = useState();
  const [expMessages, setExpMessages] = useState([]);
  const [newMessages, setnewMessages] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const url = 'http://localhost:8000/dmessages/getAll/';
  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await axios.get(`${url}${userInfo.id}`);
      setAllMessages(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleData = () => {
    allMessages.messageList.forEach((msg) => {
      const edate = new Date(msg.expireAt);
      const etime = edate.getTime();
      const diff = etime - new Date().getTime();
      if (diff < 0) expMessages.push(msg);
      else newMessages.push(msg);
    });
  };
  // useEffect(() => {
  //   setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
  //   const id = setInterval(() => {
  //     fetchMessages();
  //   }, 1000);
  //   return () => {
  //     console.log('clearInterval');
  //     clearInterval(id);
  //   };
  // }, []);
  useEffect(() => {
    allMessages && handleData();
  }, [allMessages]);
  useEffect(() => {
    userInfo.id && fetchMessages();
  }, [userInfo]);

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
  }, []);
  return (
    <>
      {isError ? (
        <BiError size={100} />
      ) : (
        <div className="dashboard">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <section className="dash-section">
                <h5>New messages</h5>
                <hr></hr>
                <div className="dashmsg-container">
                  {newMessages &&
                    newMessages.map((item) => {
                      const { dismessage, _id } = item;
                      return (
                        <Link
                          key={_id}
                          style={{ textDecoration: 'none', color: 'white' }}
                          to={`/message/${_id}`}
                        >
                          {dismessage.substr(0, 20)}
                        </Link>
                      );
                    })}
                </div>
              </section>
              <section className="dash-section">
                <h5>Expired messages</h5>
                <hr></hr>
                <div className="dashmsg-container">
                  {expMessages &&
                    expMessages.map((item) => {
                      const { dismessage, _id } = item;
                      return (
                        <Link
                          key={_id}
                          style={{ textDecoration: 'none', color: 'white' }}
                          to={`/message/${_id}`}
                        >
                          {dismessage.substr(0, 20)}
                        </Link>
                      );
                    })}
                </div>
              </section>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
