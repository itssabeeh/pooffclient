import React, { useEffect, useState } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { Redirect, Link } from 'react-router-dom';
import '../Landing/Landing.css';

const Landing = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
  }, []);
  if (userInfo) {
    return <Redirect to="/Home" />;
  }
  return (
    <div className="LandingContainer">
      <div className="formContainer">{isLogin ? <Login /> : <Register />}</div>
      <div className="sideSection">
        <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
          <h3>Poooff..</h3>
        </Link>
        {isLogin ? (
          <div>
            <p>Hey!! you want to get started with pooff?</p>
            <button onClick={() => setIsLogin(false)}>SignUp</button>
          </div>
        ) : (
          <div>
            <p>Are you an existing user?</p>
            <button onClick={() => setIsLogin(true)}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
