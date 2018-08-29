import React, { Component } from 'react';

import QueryString from 'query-string';

import Navigation from '../Navigation';
import Page from '../Page';
import Server from '../Server';

class Concert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      concertData: '',
    };

    Server.getJson("/api/Conciertos/" + QueryString.parse(this.props.location.search).id)
    .then(response => {
      this.setState({concertData: JSON.stringify(response)});
      console.log(this.state.concertData);
    });
  }

  render() {
    let concertLayout;

    if (this.state.concertData) {
      concertLayout = <p>{this.state.concertData}</p>;
    }

    return (
      <Page>
        <Navigation />

        <div>
          {concertLayout}
        </div>
      </Page>
    );
  }
}

export default Concert;
