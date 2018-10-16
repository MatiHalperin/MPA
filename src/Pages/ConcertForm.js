import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

import Navigation from '../Components/Navigation';
import Page from '../Components/Page';
import Server from '../Helpers/Server';

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
    Server.interact("POST", "/api/Concerts", {
      title: this.state.title,
      description: this.state.description,
      location: { lat: 0, lng: 0 },
      address: this.state.address,
      date: this.state.date
    })
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

    return (
      <Page>
        <Navigation />

        <Card style={styles.cardStyle}>
          <form onSubmit={this.handleSubmit}>
            <TextField style={styles.firstTextFieldStyle} label="Title" type="text" value={this.state.title} onChange={this.handleChange('title')} />
            <TextField style={styles.textFieldStyle} label="Description" type="text" value={this.state.description} onChange={this.handleChange('description')} />
            <TextField style={styles.textFieldStyle} label="Address" type="text" value={this.state.address} onChange={this.handleChange('address')} />
            <TextField style={styles.textFieldStyle} label="Date" type="datetime-local" value={this.state.date} onChange={this.handleChange('date')} InputLabelProps={{shrink: true}} />
            <Button style={styles.buttonStyle} type="submit" color="primary">Create</Button>
          </form>
        </Card>
      </Page>
    );
  }
}

export default ConcertForm;