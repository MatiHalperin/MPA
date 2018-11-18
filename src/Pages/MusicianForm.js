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
      idCard: '',
      country: '',
      province: '',
      city: '',
      instrument: '',
      style: '',
      experience: '',
      formation: '',
      band: ''
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
      idCard: this.state.idCard,
      country: this.state.country,
      province: this.state.province,
      city: this.state.city,
      instrument: this.state.instrument,
      style: this.state.style,
      experience: this.state.experience,
      formation: this.state.formation,
      band: this.state.band
    })
    .then(() => {
      sessionStorage.setItem("isMusician", true);
      this.props.history.push("/profile");
    });

    event.preventDefault();
  }

  render() {
    const styles = {
      cardStyle: {
        width: '50%',
        padding: '16px',
        margin: '16px 25%',
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
        marginTop: '24px',
      }
    };

    return (
      <Page>
        <Navigation />

        <Card style={styles.cardStyle}>
          <form onSubmit={this.handleSubmit}>
            <TextField InputLabelProps={{ required: false }} required style={styles.firstTextFieldStyle} label="Nombre" type="text" value={this.state.name} onChange={this.handleChange('name')} />
            <TextField InputLabelProps={{ required: false }} required style={styles.textFieldStyle} label="Apellido" type="text" value={this.state.surname} onChange={this.handleChange('surname')} />
            <TextField InputLabelProps={{ required: false }} required style={styles.textFieldStyle} label="DNI" type="text" value={this.state.idCard} onChange={this.handleChange('idCard')} />
            <TextField InputLabelProps={{ required: false }} required style={styles.textFieldStyle} label="País" type="text" value={this.state.country} onChange={this.handleChange('country')} />
            <TextField InputLabelProps={{ required: false }} required style={styles.textFieldStyle} label="Provincia" type="text" value={this.state.province} onChange={this.handleChange('province')} />
            <TextField InputLabelProps={{ required: false }} required style={styles.textFieldStyle} label="Ciudad" type="text" value={this.state.city} onChange={this.handleChange('city')} />
            <TextField InputLabelProps={{ required: false }} required style={styles.textFieldStyle} label="Instrumento" type="text" value={this.state.instrument} onChange={this.handleChange('instrument')} />
            <TextField InputLabelProps={{ required: false }} required style={styles.textFieldStyle} label="Estilo" type="text" value={this.state.style} onChange={this.handleChange('style')} />
            <TextField InputLabelProps={{ required: false }} required style={styles.textFieldStyle} label="Experiencia" type="text" value={this.state.experience} onChange={this.handleChange('experience')} />
            <TextField InputLabelProps={{ required: false }} required style={styles.textFieldStyle} label="Formación" type="text" value={this.state.formation} onChange={this.handleChange('formation')} />
            <TextField InputLabelProps={{ required: false }} required style={styles.textFieldStyle} label="Banda" type="text" value={this.state.band} onChange={this.handleChange('band')} />
            <Button style={styles.buttonStyle} variant="contained" type="submit" color="primary">Enviar</Button>
          </form>
        </Card>
      </Page>
    );
  }
}

export default MusicianForm;