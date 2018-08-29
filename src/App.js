import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Index from './components/Index/Index.js';
import Login from './components/Login/Login.js';
import Logout from './components/Logout/Logout.js';
import Register from './components/Register/Register.js';
import Concert from './components/Forms/Concert/Concert.js';
import Musician from './components/Forms/Musician/Musician.js';
import Institution from './components/Forms/Institution/Institution';
import Profile from './components/Profile/Profile.js';
import Concerts from './components/Concerts/Concerts.js';

const PageRouter = () => (
  <Router>
    <div>
      <Route exact path="/" component={Index} />
      <Route path="/concerts" component={Concerts} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/register" component={Register} />
      <Route path="/forms/concert" component={Concert} />
      <Route path="/forms/institution" component={Institution} />
      <Route path="/forms/musician" component={Musician} />
      <Route path="/profile" component={Profile} />
    </div>
  </Router>
);

export default PageRouter;
