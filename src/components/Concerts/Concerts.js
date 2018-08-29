import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation';
import Page from '../Page';
import Server from '../Server';

class Concerts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      concerts: '',
    };

    Server.getJson("/api/Conciertos")
    .then(response => {
      this.setState({concerts: JSON.stringify(response)});
    });
  }

  render() {
    var concertList = [];

    if (this.state.concerts) {
      let allConcerts = JSON.parse(this.state.concerts);

      for (let concertNumber in allConcerts) {
        let concert = allConcerts[concertNumber];
        concertList.push(
          <p>
            <Link to={"/concert?id=" + concert.id}>{concert.Descripcion}</Link>
          </p>
        );
      }
    }

    return (
      <Page>
        <Navigation />

        <div>
          {concertList}
        </div>
      </Page>
    );
  }
}

export default Concerts;
