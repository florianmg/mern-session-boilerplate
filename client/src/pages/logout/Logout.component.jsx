import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { API_URI } from '../../constants';
import AuthApi from '../../utils/AuthApi';

const Logout = () => {
  const ctx = useContext(AuthApi);

  useEffect(() => {
    axios
      .post(`${API_URI}/auth/logout`, {}, { withCredentials: true })
      .then((response) => {
        if (response.status !== 200)
          throw new Error('error while trying to logout, try again please');
        ctx.setAuth(false);
      })
      .catch((e) => console.log(e.message));
  }, [ctx]);

  return <div>loggin out</div>;
};
export default Logout;
