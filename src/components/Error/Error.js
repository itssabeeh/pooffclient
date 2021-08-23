import React from 'react';
import { BiError } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import '../Error/Error.css';
const Error = () => {
  return (
    <div className="error-container">
      <div className="error-message">
        <BiError size={100} />
        <h5>oops...nothing to see here.</h5>
      </div>
      <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
        want to create a dissapearing message?
      </Link>
    </div>
  );
};

export default Error;
