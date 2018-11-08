import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import Navigation from '../Components/Navigation';
import Page from '../Components/Page';
import Server from '../Helpers/Server';

class Concert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      concertData: '',
      userIsPartOfIt: false,
      concertId: new URLSearchParams(this.props.location.search).get('id'),
    };

    Server.interact("GET", "/api/Concerts/" + this.state.concertId)
    .then(response => {
      this.setState({concertData: JSON.stringify(response)});
    });

    Server.interact("GET", "/api/Attendances?filter={\"where\":{\"userId\":" + sessionStorage.getItem("userId") + ",\"concertId\":" + this.state.concertId + "}}&access_token=" + sessionStorage.getItem("accessToken"))
    .then(response => {
      this.setState({userIsPartOfIt: (response.length > 0)});
    });

    this.handleJoinClick = this.handleJoinClick.bind(this);
    this.handleUnjoinClick = this.handleUnjoinClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleJoinClick(event) {
    Server.interact("POST", "/api/Attendances", {
      userId: sessionStorage.getItem("userId"),
      concertId: this.state.concertId,
    })
    .then(response => {
      this.setState({id: response.id});
      this.setState({userIsPartOfIt: true});
    });

    event.preventDefault();
  }

  handleUnjoinClick(event) {
    Server.interact("DELETE", "/api/Attendances/" + this.state.id)
    .then(() => {
      this.setState({userIsPartOfIt: false});
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

  render() {
    const styles = {
      cardStyle: {
        width: 'fit-content',
        padding: '16px',
        margin: '8px',
        borderRadius: '8px',
      },
      descriptionStyle: {
        margin: '1em',
      }
    };

    let concertLayout;

    if (this.state.concertData) {
      let data = JSON.parse(this.state.concertData);

      concertLayout = (
        <p style={styles.descriptionStyle}>
          <b>Title:</b> {data.title}
          <br />
          <b>Description:</b> {data.description}
          <br />
          <b>Address:</b> {data.address}
          <br />
          <b>Date:</b> {data.date}
        </p>
      );
    }

    let joinButton = this.state.userIsPartOfIt
      ? <Button onClick={this.handleUnjoinClick} type="submit" color="primary">Unjoin</Button>
      : <Button onClick={this.handleJoinClick} type="submit" color="primary">Join</Button>;

    return (
      <Page>
        <Navigation />

        <Card style={styles.cardStyle}>
          {concertLayout}
          {joinButton}
          <Button onClick={this.handleDeleteClick} type="submit" color="primary">Delete</Button>
        </Card>
      </Page>
    );
  }
}

export default Concert;