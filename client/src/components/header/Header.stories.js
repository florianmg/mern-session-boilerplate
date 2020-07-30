import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import Header from './';

export default {
  title: 'MenuHeader',
  components: Header
};

export const HeaderLogged = () => {
  return <Router><Header logged={true}/></Router>;
}

export const HeaderNotLogged = () => {
  return <Router><Header logged={false} /></Router>;
}