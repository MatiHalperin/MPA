import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Index from './components/Index/Index.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Musician from './components/Forms/Musician/Musician.js';
import Institution from './components/Forms/Institution/Institution';

const PageRouter = () => (
  <Router>
    <div>
      <Route exact path="/" component={Index} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forms/institution" component={Institution} />
      <Route path="/forms/musician" component={Musician} />
    </div>
  </Router>
);

export default PageRouter;
