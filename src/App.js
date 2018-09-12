import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './Pages/Home';
import Concert from './Pages/Concert';
import Concerts from './Pages/Concerts';
import ConcertForm from './Pages/ConcertForm';
import MusicianForm from './Pages/MusicianForm';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Profile from './Pages/Profile';
import Register from './Pages/Register';

const PageRouter = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/concert" component={Concert} />
      <Route path="/concerts" component={Concerts} />
      <Route path="/forms/concert" component={ConcertForm} />
      <Route path="/forms/musician" component={MusicianForm} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/profile" component={Profile} />
      <Route path="/register" component={Register} />
    </div>
  </Router>
);

export default PageRouter;