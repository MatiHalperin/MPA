import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Index from './components/Index/Index.js';
import Concert from './components/Concert/Concert.js';
import Concerts from './components/Concerts/Concerts.js';
import ConcertForm from './components/Forms/Concert/Concert.js';
import Institution from './components/Forms/Institution/Institution';
import Musician from './components/Forms/Musician/Musician.js';
import Login from './components/Login/Login.js';
import Logout from './components/Logout/Logout.js';
import Profile from './components/Profile/Profile.js';
import Register from './components/Register/Register.js';

const PageRouter = () => (
  <Router>
    <div>
      <Route exact path="/" component={Index} />
      <Route path="/concert" component={Concert} />
      <Route path="/concerts" component={Concerts} />
      <Route path="/forms/concert" component={ConcertForm} />
      <Route path="/forms/institution" component={Institution} />
      <Route path="/forms/musician" component={Musician} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/profile" component={Profile} />
      <Route path="/register" component={Register} />
    </div>
  </Router>
);

export default PageRouter;
