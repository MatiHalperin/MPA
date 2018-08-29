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

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    Server.postJson("/api/ConciertoMusicos", {
      musicoId: sessionStorage.getItem("userId"),
      conciertoId: QueryString.parse(this.props.location.search).id
    })
    .then(response => {
      console.log(response);
    });

    event.preventDefault();
  }

  render() {
    let concertLayout;

    if (this.state.concertData) {
      concertLayout = <p>{this.state.concertData}</p>;
    }

    const styles = {
      cardStyle: {
        width: 'fit-content',
        padding: '16px',
        margin: '8px',
      },
      buttonStyle: {
        marginTop: '16px',
      }
    };

    return (
      <Page>
        <Navigation />

        <Card style={styles.cardStyle}>
          {concertLayout}
          <Button onClick={this.handleClick} style={styles.buttonStyle} type="submit" color="primary">Unirme</Button>
        </Card>
      </Page>
    );
  }
}

export default Concert;
