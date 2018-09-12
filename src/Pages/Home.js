import React, { Component } from 'react';

import Navigation from '../Components/Navigation';
import Page from '../Components/Page';

class Home extends Component {
  render() {
    return (
      <Page>
        <Navigation />
      </Page>
    );
  }
}

export default Home;