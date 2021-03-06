import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading/Loading';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import '../Register/Register.css';

const Register = () => {
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
      const response = await axios.post(
        'https://pooff.herokuapp.com/register',
        {
          username,
          password,
        }
      );
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      setIsLoading(false);
      setIsRedirect(true);
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
      <div className="registerContainer">
        {isError && <ErrorAlert>{error}</ErrorAlert>}
        {isLoading ? (
          <Loading />
        ) : (
          <form className="registerForm" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button type="submit">Register</button>
          </form>
        )}
      </div>
    </>
  );
};

export default Register;
