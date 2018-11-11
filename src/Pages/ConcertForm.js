import React, { Component } from 'react';

import Geocode from "react-geocode";

import Iframe from 'react-iframe';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

import Navigation from '../Components/Navigation';
import Page from '../Components/Page';
import Server from '../Helpers/Server';
import SessionHandler from '../Helpers/SessionHandler';

class ConcertForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      address: "",
      date: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit(event) {
    Geocode.setApiKey("AIzaSyAQ2uCNQooGSzH4zkM4FAIFx5NWZPcNc4c");

    Geocode.fromAddress(this.state.address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;

        Server.interact("POST", "/api/Concerts", {
          title: this.state.title,
          description: this.state.description,
          location: { lat: lat, lng: lng },
          address: this.state.address,
          date: this.state.date,
          confirmed: SessionHandler.isAdmin()
        })
        .then(() => {
          this.props.history.push("/concerts");
        });
      },
      error => {
        console.error(error);
      }
    );

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
      firstTextFieldStyle: {
        width: '100%',
      },
      textFieldStyle: {
        width: '100%',
        marginTop: '16px',
      },
      buttonStyle: {
        marginTop: '16px',
      }
    };

    let map;

    if (this.state.address)
      map = (
        <div style={styles.textFieldStyle}>
          <Iframe url={"https://www.google.com/maps/embed/v1/place?key=AIzaSyAQ2uCNQooGSzH4zkM4FAIFx5NWZPcNc4c&q=" + this.state.address}
            position="static"
            height="450px"
            styles={{border: 0}}
            allowFullScreen />
        </div>
      )

    return (
      <Page>
        <Navigation />

        <Card style={styles.cardStyle}>
          <form onSubmit={this.handleSubmit}>
            <TextField InputLabelProps={{ required: false }} required style={styles.firstTextFieldStyle} label="Title" type="text" value={this.state.title} onChange={this.handleChange('title')} />
            <TextField InputLabelProps={{ required: false }} required style={styles.textFieldStyle} label="Description" type="text" value={this.state.description} onChange={this.handleChange('description')} />
            <TextField InputLabelProps={{ required: false, shrink: true }} required style={styles.textFieldStyle} label="Date" type="datetime-local" value={this.state.date} onChange={this.handleChange('date')} />
            <TextField InputLabelProps={{ required: false }} required style={styles.textFieldStyle} label="Address" type="text" value={this.state.address} onChange={this.handleChange('address')} />
            {map}
            <Button style={styles.buttonStyle} type="submit" color="primary">Create</Button>
          </form>
        </Card>
      </Page>
    );
  }
}

export default ConcertForm;