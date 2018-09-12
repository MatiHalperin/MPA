import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Components/Navigation';
import Page from '../Components/Page';
import Server from '../Helpers/Server';
import SessionHandler from '../Helpers/SessionHandler';

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
      },
      concertLink: {
        color: 'initial',
        textDecoration: 'none',
      },
      concertDescription: {
        margin: '0',
      },
      noConcertsStyle: {
        margin: '16px 0 0 8px',
      }
    };

    var concertList = [];

    if (this.state.concerts) {
      let allConcerts = JSON.parse(this.state.concerts);

      for (let concertNumber in allConcerts) {
        let concert = allConcerts[concertNumber];
        concertList.push(
          <Link key={concert.id} to={"/concert?id=" + concert.id} style={styles.concertLink}>
            <Card style={styles.cardStyle}>
              <p style={styles.concertDescription}>{concert.Descripcion}</p>
            </Card>
          </Link>
        );
      }
    }

    let newConcertButton;

    if (SessionHandler.isLoggedIn())
      newConcertButton = (
        <Link to="/forms/concert" style={styles.newConcertLink}>
          <Button color="primary" variant="extendedFab" style={styles.buttonStyle}>
            <AddIcon style={styles.buttonIconStyle} />
            Create concert
          </Button>
        </Link>
      );

    if (!concertList.length)
      concertList.push(<p key="0" style={styles.noConcertsStyle}>No concerts</p>)

    return (
      <Page>
        <Navigation />

        {newConcertButton}

        <div>
          {concertList}
        </div>
      </Page>
    );
  }
}

export default Concerts;