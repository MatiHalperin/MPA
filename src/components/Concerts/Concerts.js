import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation';
import Page from '../Page';
import Server from '../Server';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import AddIcon from '@material-ui/icons/Add';

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
    const styles = {
      cardStyle: {
        width: 'fit-content',
        padding: '16px',
        margin: '8px 8px 0',
      },
      newConcertLink: {
        textDecoration: 'none',
      },
      buttonStyle: {
        margin: '8px 0 0 8px',
      },
      buttonIconStyle: {
        marginRight: '8px',
      }
    };

    var concertList = [];

    if (this.state.concerts) {
      let allConcerts = JSON.parse(this.state.concerts);

      for (let concertNumber in allConcerts) {
        let concert = allConcerts[concertNumber];
        concertList.push(
          <Card style={styles.cardStyle}>
            <Link to={"/concert?id=" + concert.id}>{concert.Descripcion}</Link>
          </Card>
        );
      }
    }

    return (
      <Page>
        <Navigation />

        <Link to="/forms/concert" style={styles.newConcertLink}>
          <Button color="primary" variant="extendedFab" style={styles.buttonStyle}>
            <AddIcon style={styles.buttonIconStyle} />
            Crear concierto
          </Button>
        </Link>

        <div>
          {concertList}
        </div>
      </Page>
    );
  }
}

export default Concerts;
