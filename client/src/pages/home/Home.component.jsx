import React, { useEffect, useContext } from 'react';
import { API_URI } from '../../constants';
import axios from 'axios';
import AuthApi from '../../utils/AuthApi';

const Home = () => {
  const ctx = useContext(AuthApi);

  useEffect(() => {
    axios
      .get(`${API_URI}`, { withCredentials: true })
      .then((response) => {
        ctx.setAuth(response.data.auth);
      })
      .catch((err) => console.log('error: ', err.response));
  });

  return (
    <div className="home-page">
      <p>Home page</p>
    </div>
  );
};

export default Home;
