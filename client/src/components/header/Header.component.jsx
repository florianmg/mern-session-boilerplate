import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = ({ logged = false }) => {
  return <div>{logged ? <LoggedMenu /> : <NotLoggedMenu />}</div>;
};

const LoggedMenu = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/logout">Disconnect</Link>
      </li>
    </ul>
  );
};
const NotLoggedMenu = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </ul>
  );
};

Header.prototype = {
  logged: PropTypes.bool,
};

export default Header;
