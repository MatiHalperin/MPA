import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Iframe from 'react-iframe';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

import Navigation from '../Components/Navigation';
import Page from '../Components/Page';
import Server from '../Helpers/Server';
import SessionHandler from '../Helpers/SessionHandler';

class Concert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      concertId: new URLSearchParams(this.props.location.search).get('id'),
      isMusician: false,
      reported: false,
      confirmed: false,
      concertData: '',
      userIsPartOfIt: false,
      users: '',
    };

    if (SessionHandler.isLoggedIn())
      Server.interact("GET", "/users/" + sessionStorage.getItem("userId"))
      .then(response => {
        this.setState({isMusician: response.isMusician});

        if ("rate" in response)
          this.setState({reported: true});
      });

    Server.interact("GET", "/api/Concerts/" + this.state.concertId)
    .then(response => {
      this.setState({confirmed: response.confirmed});
      this.setState({concertData: JSON.stringify(response)});
    });

    Server.interact("GET", "/api/Attendances?filter={\"where\":{\"userId\":" + sessionStorage.getItem("userId") + ",\"concertId\":" + this.state.concertId + "}}&access_token=" + sessionStorage.getItem("accessToken"))
    .then(response => {
      this.setState({userIsPartOfIt: (response.length > 0)});
    });

    this.handleJoinToggleClick = this.handleJoinToggleClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
  }

  handleJoinToggleClick(event) {
    Server.interact("POST", "/users/" + sessionStorage.getItem("userId") + "/concerts/" + this.state.concertId)
    .then(() => {
      this.setState({userIsPartOfIt: !this.state.userIsPartOfIt});
    });

    event.preventDefault();
  }

  handleDeleteClick(event) {
    Server.interact("DELETE", "/api/Concerts/" + this.state.concertId)
    .then(() => {
      this.props.history.push("/concerts");
    });

    event.preventDefault();
  }

  handleConfirmClick(event) {
    Server.interact("PATCH", "/api/Concerts/" + this.state.concertId, {
      confirmed: true
    })
    .then(() => {
      this.setState({confirmed: true});
    });

    event.preventDefault();
  }

  render() {
    const styles = {
      cardStyle: {
        width: 'fit-content',
        padding: '16px',
        margin: '8px',
        borderRadius: '8px',
      },
      descriptionStyle: {
        margin: '8px 0',
      },
      userContainer: {
        width: 'fit-content',
      },
      noMargin: {
        margin: 0,
      },
      getEmailsLink: {
        textDecoration: 'none',
      }
    };

    let concertLayout;

    if (this.state.concertData) {
      let data = JSON.parse(this.state.concertData);

      concertLayout = (
        <div style={styles.descriptionStyle}>
          <p style={styles.descriptionStyle}><b>Title:</b> {data.title}</p>
          <p style={styles.descriptionStyle}><b>Description:</b> {data.description}</p>
          <p style={styles.descriptionStyle}><b>Address:</b> {data.address}</p>
          <TextField disabled InputLabelProps={{ shrink: true }} style={styles.descriptionStyle} label="Date" type="datetime-local" defaultValue={data.date.slice(0, -1)} />
          <div style={styles.descriptionStyle}>
            <Iframe url={"https://www.google.com/maps/embed/v1/place?key=AIzaSyAQ2uCNQooGSzH4zkM4FAIFx5NWZPcNc4c&q=" + data.address}
              position="static"
              width="600px"
              height="450px"
              styles={{border: 0}}
              allowFullScreen />
          </div>
        </div>
      );

      if (SessionHandler.isAdmin() && !this.state.users) {
        Server.interact("GET", "/api/Concerts/" + this.state.concertId + "/users")
        .then(response => {
          let users = [];

          for (let user in response) {
            let userData = response[user];
            users.push(
              <Link key={userData.id} to={"/profile?id=" + userData.id}>
                <p style={styles.noMargin}>
                  {userData.name} {userData.surname}
                </p>
              </Link>
            )
          }

          if (users.length > 0)
            this.setState({users: users});
        });
      }
    }

    let userList;

    if (this.state.users) {
      userList = (
        <div>
          <div style={styles.userContainer}>
            <p><b>Users:</b></p>
            <ul>
              {this.state.users.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
          <Link to={"/concertEmails?id=" + this.state.concertId} style={styles.getEmailsLink}>
            <Button>Get emails</Button>
          </Link>
        </div>
      )
    }

    let joinToggleButton, deleteButton, confirmButton;

    if (SessionHandler.isAdmin()) {
      deleteButton = (
        <Button style={styles.descriptionStyle} onClick={this.handleDeleteClick} type="submit" color="primary">Delete</Button>
      )

      if (this.state.confirmed === false)
        confirmButton = (
          <Button style={styles.descriptionStyle} onClick={this.handleConfirmClick} type="submit" color="primary">Confirm</Button>
        )
    }
    else if (this.state.isMusician === true && !this.state.reported)
      joinToggleButton = (
        <Button style={styles.descriptionStyle} onClick={this.handleJoinToggleClick} type="submit" color="primary">
          {this.state.userIsPartOfIt ? "Unjoin" : "Join"}
        </Button>
      )

    return (
      <Page>
        <Navigation />

        <Card style={styles.cardStyle}>
          {concertLayout}
          {userList}
          {joinToggleButton}
          {confirmButton}
          {deleteButton}
        </Card>
      </Page>
    );
  }
}

export default Concert;