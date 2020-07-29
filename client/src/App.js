import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { API_URI } from './constants';

import Routes from './routes/Routes';
import Header from './components/header';
import AuthApi from './utils/AuthApi';

import './App.scss';

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkIsAuthenticated = () => {
      axios
        .get(`${API_URI}/auth/check`, { withCredentials: true })
        .then((response) => setAuth(response.data.auth))
        .catch((err) => console.log('checkIsAuthenticated', err.response));
    };
    checkIsAuthenticated();
  }, []);

  return (
    <div className="App">
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Router>
          <Header logged={auth} />
          <main className="general-layout">
            <Routes />
          </main>
        </Router>
      </AuthApi.Provider>
    </div>
  );
}

export default App;
