import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Iframe from 'react-iframe';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
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
      open: false,
      currentConcert: 0,
      sortMethod: "0",
      concerts: '',
      isMusician: false,
      reported: false,
      userList: ''
    };

    Server.interact("GET", "/api/Concerts")
    .then(concerts => {
      if (!SessionHandler.isAdmin())
        concerts = concerts.filter((a) => new Date(a.date) >= new Date());

      for (let concert in concerts) {
        Server.interact("GET", "/api/Concerts/" + concerts[concert].id + "/users")
        .then(users => {
          concerts[concert].userIsPartOfIt = false;

          for (let user in users)
            if (users[user].id === parseInt(sessionStorage.getItem("userId")))
              concerts[concert].userIsPartOfIt = true;

          this.setState({concerts: concerts});
        });
      }
    });

    if (SessionHandler.isLoggedIn())
      Server.interact("GET", "/users/" + sessionStorage.getItem("userId"))
      .then(response => {
        this.setState({isMusician: response.isMusician});

        if ("rate" in response)
          this.setState({reported: true});
      });

    this.handleChange = this.handleChange.bind(this);

    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleJoinToggleClick = this.handleJoinToggleClick.bind(this);
  }

  handleChange = event => {
    this.setState({ sortMethod: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleViewUsersClick = id => event => {
    Server.interact("GET", "/api/Concerts/" + id + "/users")
    .then(response => {
      let userList = response.map((user) => (
        <Link key={user.id} to={"/profile?id=" + user.id} style={{color: 'initial', textDecoration: 'initial'}}>
          <Button style={{textTransform: 'initial'}}>{user.name} {user.surname}</Button>
        </Link>
      ));

      this.setState({
        currentConcert: id,
        userList: userList,
        open: true
      });
    });

    event.preventDefault();
  }

  handleConfirmClick = id => event => {
    Server.interact("PATCH", "/api/Concerts/" + id, {
      confirmed: true
    })
    .then(() => {
      let concerts = this.state.concerts;

      for (let concert in concerts)
        if (concerts[concert].id === id)
          concerts[concert].confirmed = true;

      this.setState({concerts: concerts});
    });

    event.preventDefault();
  }

  handleDeleteClick = id => event => {
    Server.interact("DELETE", "/api/Concerts/" + id)
    .then(() => {
      let concerts = this.state.concerts;

      for (let concert in concerts)
        if (concerts[concert].id === id)
          concerts.splice(concert, 1);

      this.setState({concerts: concerts});
    });

    event.preventDefault();
  }

  handleJoinToggleClick = id => event => {
    Server.interact("POST", "/users/" + sessionStorage.getItem("userId") + "/concerts/" + id)
    .then(() => {
      let concerts = this.state.concerts;

      for (let concert in concerts)
        if (concerts[concert].id === id)
          concerts[concert].userIsPartOfIt = !concerts[concert].userIsPartOfIt;

      this.setState({concerts: concerts});
    });

    event.preventDefault();
  };

  render() {
    const styles = {
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      newConcertLink: {
        textDecoration: 'none',
      },
      buttonStyle: {
        margin: '24px 0 0 24px',
      },
      buttonIconStyle: {
        marginRight: '8px',
      },
      sortStyle: {
        margin: '24px 0 -12px 24px',
      },
      gridStyle: {
        width: 'calc(100% - 24px)',
        margin: '12px auto 0',
      },
      cardStyle: {
        borderRadius: '8px',
      },
      noBorder: {
        border: 0,
      },
      linkNoStyle: {
        color: 'initial',
        textDecoration: 'none',
      },
      noConcertsStyle: {
        margin: '12px 0 0 12px',
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

        let date = new Date(concert.date);
        date = ('0' + date.getUTCDate()).slice(-2) + "/" + ('0' + (date.getUTCMonth() + 1)).slice(-2) + "/" + ('000' + date.getUTCFullYear()).slice(-4) + " - " + ('0' + date.getUTCHours()).slice(-2) + ":" + ('0' + date.getUTCMinutes()).slice(-2) + "hs";

        if (concert.confirmed === true || SessionHandler.isAdmin()) {
          let viewUsersButton, confirmButton, deleteButton, joinToggleButton;

          if (SessionHandler.isAdmin()) {
            viewUsersButton = (
              <Button onClick={this.handleViewUsersClick(concert.id)} type="submit" color="primary">
                Ver usuarios
              </Button>
            )

            if (concert.confirmed === false)
              confirmButton = (
                <Button onClick={this.handleConfirmClick(concert.id)} type="submit" color="primary">
                  Confirmar
                </Button>
              )

            deleteButton = (
              <Button onClick={this.handleDeleteClick(concert.id)} type="submit" color="primary">
                Eliminar
              </Button>
            )
          }
          else if (this.state.isMusician === true && !this.state.reported)
            joinToggleButton = (
              <Button onClick={this.handleJoinToggleClick(concert.id)} type="submit" color="primary">
                {concert.userIsPartOfIt ? "Dejar de ser parte": "Ser parte"}
              </Button>
            )

          let actionButtons;

          if (confirmButton || deleteButton || joinToggleButton)
              actionButtons = (
                <CardActions>
                  {viewUsersButton}
                  {confirmButton}
                  {deleteButton}
                  {joinToggleButton}
                </CardActions>
              )

          concertList.push(
            <Grid key={concert.id} item xs={4} xl={3}>
              <Card style={styles.cardStyle}>
                <CardHeader title={concert.title} subheader={date} />
                <div>
                  <Iframe url={"https://www.google.com/maps/embed/v1/place?key=AIzaSyAQ2uCNQooGSzH4zkM4FAIFx5NWZPcNc4c&q=" + concert.address}
                    position="static"
                    styles={styles.noBorder}
                    allowFullScreen />
                </div>
                <CardContent>
                  <Typography component="p">
                    {concert.description}
                  </Typography>
                </CardContent>
                {actionButtons}
              </Card>
            </Grid>
          );
        }
      }
    }

    let newConcertText = SessionHandler.isAdmin() ? "Crear concierto" : "Solicitar concierto";

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
              <FormLabel component="legend">Ordenar por:</FormLabel>
              <RadioGroup value={this.state.sortMethod} onChange={this.handleChange} row>
                <FormControlLabel value="0" control={<Radio color="primary" />} label="Fecha de creación" />
                <FormControlLabel value="1" control={<Radio color="primary" />} label="Cercanía a la fecha" />
              </RadioGroup>
            </FormControl>
          </div>
        )
    else
      concertList = (
        <Typography variant="h6" style={styles.noConcertsStyle}>
          No hay conciertos disponibles
        </Typography>
      )

    return (
      <Page>
        <Navigation />

        {newConcertButton}

        {sortBox}

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Usuarios</DialogTitle>
          <DialogContent>
            {this.state.userList}
          </DialogContent>
          <DialogActions>
            <Link to={"/concertEmails?id=" + this.state.currentConcert} style={styles.linkNoStyle}>
              <Button color="primary">
                Ver mails
              </Button>
            </Link>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Grid container spacing={24} style={styles.gridStyle}>
          {concertList}
        </Grid>
      </Page>
    );
  }
}

export default Concerts;