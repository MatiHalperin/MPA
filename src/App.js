import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Index from './components/Index/Index.js';
import Login from './components/Login/Login.js';

const PageRouter = () => (
  <Router>
    <div>
      <Route exact path="/" component={Index} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
);

export default PageRouter;
