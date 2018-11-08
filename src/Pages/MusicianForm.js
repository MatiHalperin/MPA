import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

import Navigation from '../Components/Navigation';
import Page from '../Components/Page';
import Server from '../Helpers/Server';

class MusicianForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      surname: '',
      country: '',
      province: '',
      city: '',
      idCard: '',
      photo: '',
      video: ''
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
    Server.interact("POST", "/users/" + sessionStorage.getItem("userId"), {
      isMusician: true,
      name: this.state.name,
      surname: this.state.surname,
      country: this.state.country,
      province: this.state.province,
      city: this.state.city,
      idCard: this.state.idCard,
      photo: this.state.photo,
      video: this.state.video
    })
    .then(() => {
      this.props.history.push("/profile");
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
      textFieldStyle: {
        width: '100%',
        marginTop: '16px',
      },
      firstLeftTextFieldStyle: {
        width: '49%',
        marginRight: '1%',
      },
      firstRightTextFieldStyle: {
        width: '49%',
        marginLeft: '1%',
      },
      leftTextFieldStyle: {
        width: '49%',
        marginRight: '1%',
        marginTop: '16px',
      },
      rightTextFieldStyle: {
        width: '49%',
        marginLeft: '1%',
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
            <TextField style={styles.firstLeftTextFieldStyle} label="Name" type="text" value={this.state.name} onChange={this.handleChange('name')} />
            <TextField style={styles.firstRightTextFieldStyle} label="Surname" type="text" value={this.state.surname} onChange={this.handleChange('surname')} />
            <TextField style={styles.textFieldStyle} label="Country" type="text" value={this.state.country} onChange={this.handleChange('country')} />
            <TextField style={styles.textFieldStyle} label="Province" type="text" value={this.state.province} onChange={this.handleChange('province')} />
            <TextField style={styles.textFieldStyle} label="City" type="text" value={this.state.city} onChange={this.handleChange('city')} />
            <TextField style={styles.textFieldStyle} label="ID Card" type="text" value={this.state.idCard} onChange={this.handleChange('idCard')} />
            <TextField style={styles.leftTextFieldStyle} label="Photo" type="text" value={this.state.photo} onChange={this.handleChange('photo')} />
            <TextField style={styles.rightTextFieldStyle} label="Video" type="text" value={this.state.video} onChange={this.handleChange('video')} />
            <Button style={styles.buttonStyle} type="submit" color="primary">Convert</Button>
          </form>
        </Card>
      </Page>
    );
  }
}

export default MusicianForm;