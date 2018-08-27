import React, { Component } from 'react';

import Navigation from '../../Navigation';
import Page from '../../Page';
import Server from '../../Server';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

class Musician extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      sirname: '',
      video: '',
      city: '',
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
    Server.patchJson("/api/Musicos/" + sessionStorage.getItem("userId") + "?access_token=" + sessionStorage.getItem("accessToken"), { nombre: this.state.name, apellido: this.state.sirname, video: this.state.video, ciudad: this.state.city, esmusico: true })
    .then(response => {
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
      },
      halfWidthTextFieldStyle: {
        width: '49%',
        marginRight: '1%',
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
            <p><b>Convert account to musician</b></p>
            <TextField style={styles.halfWidthTextFieldStyle} label="Name" type="text" value={this.state.name} onChange={this.handleChange('name')} />
            <TextField style={styles.halfWidthTextFieldStyle} label="Sirname" type="text" value={this.state.sirname} onChange={this.handleChange('sirname')} />
            <TextField style={styles.textFieldStyle} label="Video" type="text" value={this.state.video} onChange={this.handleChange('video')} />
            <TextField style={styles.textFieldStyle} label="City" type="text" value={this.state.city} onChange={this.handleChange('city')} />
            <Button style={styles.buttonStyle} type="submit" color="primary">Register</Button>
          </form>
        </Card>
      </Page>
    );
  }
}

export default Musician;
