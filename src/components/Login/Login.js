import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading/Loading';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import '../Login/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [isRedirect, setIsRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    logData();
    setUsername('');
    setPassword('');
  };

  const logData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await axios.post('http://localhost:8000/login', {
        username,
        password,
      });
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      setIsRedirect(true);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  if (isRedirect) {
    return <Redirect to="/Home" />;
  }

  return (
    <>
      {isError && <ErrorAlert>{error}</ErrorAlert>}
      <div className="loginContainer">
        <form className="loginForm" onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
      </div>
      {isLoading && <h4>Loading...</h4>}
    </>
  );
};

export default Login;
