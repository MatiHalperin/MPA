import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';

import Navigation from '../Components/Navigation';
import Page from '../Components/Page';
import Server from '../Helpers/Server';
import SessionHandler from '../Helpers/SessionHandler';

class Concerts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortMethod: "0",
      concerts: '',
    };

    Server.interact("GET", "/api/Concerts")
    .then(response => {
      if (!SessionHandler.isAdmin())
        response = response.filter((a) => new Date(a.date) >= new Date());

      this.setState({concerts: response});
    });

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({ sortMethod: event.target.value });
  };

  render() {
    const styles = {
      cardStyle: {
        width: 'fit-content',
        padding: '16px',
        margin: '8px 0 0 16px',
        borderRadius: '8px',
      },
      newConcertLink: {
        textDecoration: 'none',
      },
      buttonStyle: {
        margin: '16px 0 0 16px',
      },
      buttonIconStyle: {
        marginRight: '8px',
      },
      sortStyle: {
        margin: '16px 0 0 16px',
      },
      concertLink: {
        color: 'initial',
        textDecoration: 'none',
      },
      concertDescription: {
        margin: '0',
      },
      noConcertsStyle: {
        margin: '16px',
      }
    };

    let concertList = [];

    if (this.state.concerts) {
      let allConcerts = this.state.concerts;

      switch(this.state.sortMethod) {
        case "1":
          allConcerts.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        default:
          allConcerts.sort((a, b) => b.id - a.id);
          break;
      }

      for (let concertNumber in allConcerts) {
        let concert = allConcerts[concertNumber];

        if (concert.confirmed === true || SessionHandler.isAdmin())
          concertList.push(
            <Link key={concert.id} to={"/concert?id=" + concert.id} style={styles.concertLink}>
              <Card style={styles.cardStyle}>
                <p style={styles.concertDescription}>
                  <b>{concert.title}</b>
                  <br />
                  {concert.description}
                </p>
              </Card>
            </Link>
          );
      }
    }

    let newConcertText = SessionHandler.isAdmin() ? "Create concert" : "Ask for a new concert";

    let newConcertButton, sortBox;

    if (SessionHandler.isLoggedIn())
      newConcertButton = (
        <Link to="/forms/concert" style={styles.newConcertLink}>
          <Button color="primary" variant="extendedFab" style={styles.buttonStyle}>
            <AddIcon style={styles.buttonIconStyle} />
            {newConcertText}
          </Button>
        </Link>
      );

    if (concertList.length)
        sortBox = (
          <div style={styles.sortStyle}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Sorting method</FormLabel>
            <RadioGroup value={this.state.sortMethod} onChange={this.handleChange} row>
              <FormControlLabel value="0" control={<Radio color="primary" />} label="Creation date" />
              <FormControlLabel value="1" control={<Radio color="primary" />} label="Closeness to date" />
            </RadioGroup>
          </FormControl>
        </div>
        )
    else
      concertList = (
        <Typography variant="h6" style={styles.noConcertsStyle}>
          No concerts available
        </Typography>
      )

    return (
      <Page>
        <Navigation />

        {newConcertButton}

        {sortBox}

        <div>
          {concertList}
        </div>
      </Page>
    );
  }
}

export default Concerts;