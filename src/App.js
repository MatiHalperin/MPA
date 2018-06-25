import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Index from './components/Index/Index.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';

const PageRouter = () => (
  <Router>
    <div>
      <Route exact path="/" component={Index} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </div>
  </Router>
);

export default PageRouter;
