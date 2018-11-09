import React, { Component } from 'react';

import Iframe from 'react-iframe';

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

    this.handleJoinToggleClick = this.handleJoinToggleClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
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
          <div style={styles.descriptionStyle}>
            <Iframe url={"https://www.google.com/maps/embed/v1/place?key=AIzaSyAQ2uCNQooGSzH4zkM4FAIFx5NWZPcNc4c&q=" + data.address}
              position="static"
              width="600px"
              height="450px"
              styles={{border: 0}}
              allowFullScreen />
          </div>
          <p style={styles.descriptionStyle}><b>Date:</b> {data.date}</p>
        </div>
      );
    }

    let joinToggleText = this.state.userIsPartOfIt ? "Unjoin" : "Join";

    return (
      <Page>
        <Navigation />

        <Card style={styles.cardStyle}>
          {concertLayout}
          <Button style={styles.descriptionStyle} onClick={this.handleJoinToggleClick} type="submit" color="primary">{joinToggleText}</Button>
          <Button style={styles.descriptionStyle} onClick={this.handleDeleteClick} type="submit" color="primary">Delete</Button>
        </Card>
      </Page>
    );
  }
}

export default Concert;