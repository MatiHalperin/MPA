import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import Navigation from '../Components/Navigation';
import Page from '../Components/Page';
import Server from '../Helpers/Server';
import SessionHandler from '../Helpers/SessionHandler';

class Notice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noticeData: '',
      noticeId: new URLSearchParams(this.props.location.search).get('id'),
    };

    Server.interact("GET", "/api/Notices/" + this.state.noticeId)
    .then(response => {
      this.setState({noticeData: JSON.stringify(response)});
    });

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick(event) {
    Server.interact("DELETE", "/api/Notices/" + this.state.noticeId)
    .then(() => {
      this.props.history.push("/");
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
      noMargin: {
          margin: 0,
      },
      deleteButton: {
        marginTop: '16px',
      }
    };

    let noticeLayout;

    if (this.state.noticeData) {
      let data = JSON.parse(this.state.noticeData);

      noticeLayout = (
        <p style={styles.noMargin}>
            <b>{data.title}</b>
            <br /><br />
            {data.body}
        </p>
      );
    }

    let deleteButton;

    if (SessionHandler.isAdmin())
      deleteButton = (
        <Button style={styles.deleteButton} onClick={this.handleDeleteClick} type="submit" color="primary">Delete</Button>
      )

    return (
      <Page>
        <Navigation />

        <Card style={styles.cardStyle}>
          {noticeLayout}
          {deleteButton}
        </Card>
      </Page>
    );
  }
}

export default Notice;