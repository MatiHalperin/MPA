import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

import Navigation from '../Components/Navigation';
import Page from '../Components/Page';
import Server from '../Helpers/Server';

class NoticeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: ""
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
    Server.interact("POST", "/api/Notices", {
      title: this.state.title,
      body: this.state.body
    })
    .then(() => {
      this.props.history.push("/");
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
            <TextField InputLabelProps={{ required: false }} required style={styles.firstTextFieldStyle} label="Título" type="text" value={this.state.title} onChange={this.handleChange('title')} />
            <TextField InputLabelProps={{ required: false }} required multiline style={styles.textFieldStyle} label="Cuerpo de la noticia" type="text" value={this.state.body} onChange={this.handleChange('body')} />
            <Button style={styles.buttonStyle} variant="contained" type="submit" color="primary">Crear</Button>
          </form>
        </Card>
      </Page>
    );
  }
}

export default NoticeForm;