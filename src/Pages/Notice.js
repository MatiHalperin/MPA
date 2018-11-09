import React, { Component } from 'react';

import Card from '@material-ui/core/Card';

import Navigation from '../Components/Navigation';
import Page from '../Components/Page';
import Server from '../Helpers/Server';

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
          margin: 0
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

    return (
      <Page>
        <Navigation />

        <Card style={styles.cardStyle}>
          {noticeLayout}
        </Card>
      </Page>
    );
  }
}

export default Notice;