import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [isError, setIsError] = useState(false);
  const [redirect, setRedirect] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin) {
      postData();
    } else {
      postLogin();
    }
    setUsername('');
    setPassword('');
  };
  const postLogin = async () => {
    try {
      const record = await axios.post('http://localhost:8000/login', {
        username,
        password,
      });
      setData(record.data);
      console.log(record.data);
      localStorage.setItem('userInfo', JSON.stringify(record.data));
      setIsLoading(false);
      setRedirect(true);
      if (record.data.status === 'error') {
        alert(record.data.error);
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  const postData = async () => {
    try {
      const record = await axios.post('http://localhost:8000/register', {
        username,
        password,
      });
      setData(record.data);
      console.log(record.data);
      setIsLoading(false);
      if (record.data.status === 'error') {
        alert(record.data.error);
      }
      setRedirect(true);
    } catch (error) {
      setIsError(true);
    }
  };

  if (redirect) {
    return <Redirect to="/Home" />;
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit">{isLogin ? `Login` : 'Register'}</button>
        </form>
      </div>
      <div>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? `Create new Account` : `Existing User`}
        </button>
      </div>
    </>
  );
};

export default Login;
