import React, { useEffect, useContext, useState } from 'react';
import { API_URI } from '../../constants';
import axios from 'axios';
import AuthApi from '../../utils/AuthApi';
import { formatDate } from '../../utils/formatDate';

const Dashboard = () => {
  const ctx = useContext(AuthApi);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URI}/dashboard`, { withCredentials: true })
      .then((response) => {
        ctx.setAuth(response.data.auth);
        setUser(response.data.user);
        setLoading(false);
      })
      .catch((err) => console.log(err.response));
  }, [ctx]);

  return (
    <div className="dashboard-page">
      {!loading ? (
        <div>
          <p>{`Welcome ${user.firstName} ${user.lastName}`}</p>
          <p>{`Email : ${user.email}`}</p>
          <p>{`Creation date : ${formatDate(user.createdAt)}`}</p>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
