import React, { Component } from 'react';

import QueryString from 'query-string';

import Navigation from '../Navigation';
import Page from '../Page';
import Server from '../Server';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

class Concert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      concertData: '',
      userIsPartOfIt: false
    };

    Server.getJson("/api/Conciertos/" + QueryString.parse(this.props.location.search).id)
    .then(response => {
      this.setState({concertData: JSON.stringify(response)});
    });

    this.handleJoinClick = this.handleJoinClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleJoinClick(event) {
    Server.postJson("/api/ConciertoMusicos", {
      musicoId: sessionStorage.getItem("userId"),
      conciertoId: QueryString.parse(this.props.location.search).id
    })
    .then(response => {
      console.log(response);
    });

    event.preventDefault();
  }

  handleDeleteClick(event) {
    Server.deleteJson("/api/Conciertos/" + QueryString.parse(this.props.location.search).id)
    .then(response => {
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
          <b>Date:</b> {data.Fecha}
          <br />
          <b>Latitude:</b> {data.Ubicacion.lat}
          <br />
          <b>Longitude:</b> {data.Ubicacion.lng}
          <br />
          <b>Description:</b> {data.Descripcion}
          <br />
          <b>institucionId:</b> {data.institucionId}
        </p>
      );
    }

    return (
      <Page>
        <Navigation />

        <Card style={styles.cardStyle}>
          {concertLayout}
          <Button onClick={this.handleJoinClick} type="submit" color="primary">Join</Button>
          <Button onClick={this.handleDeleteClick} type="submit" color="primary">Delete</Button>
        </Card>
      </Page>
    );
  }
}

export default Concert;
