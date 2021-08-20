import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    setUsername('');
    setPassword('');
  };
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
