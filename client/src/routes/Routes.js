import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../pages/login';
import Register from '../pages/register';
import Dashboard from '../pages/dashboard';
import Home from '../pages/home';
import Logout from '../pages/logout';

import AuthApi from '../utils/AuthApi.js';

const Routes = () => {
  return (
    <Switch>
      <RouteProtected path="/dashboard" component={Dashboard} />
      <RouteCredentials path="/register" component={Register} />
      <RouteCredentials path="/login" component={Login} />
      <RouteProtected path="/logout" component={Logout} />
      <Route path="/" component={Home} />
    </Switch>
  );
};

const RouteCredentials = ({ component: Component, ...rest }) => {
  const ctx = React.useContext(AuthApi);
  return (
    <Route
      {...rest}
      render={(props) =>
        !ctx.auth ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  );
};

const RouteProtected = ({ component: Component, ...rest }) => {
  const ctx = React.useContext(AuthApi);
  return (
    <Route
      {...rest}
      render={(props) =>
        ctx.auth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default Routes;
