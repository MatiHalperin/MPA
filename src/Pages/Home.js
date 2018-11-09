import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import Navigation from '../Components/Navigation';
import Page from '../Components/Page';
import Server from '../Helpers/Server';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notices: '',
    };

    Server.interact("GET", "/api/Notices")
    .then(response => {
      this.setState({notices: JSON.stringify(response)});
    });
  }

  render() {
    const styles = {
      cardStyle: {
        width: 'fit-content',
        padding: '16px',
        margin: '8px 8px 0',
        borderRadius: '8px',
      },
      noticeLink: {
        color: 'initial',
        textDecoration: 'none',
      },
      noticeDescription: {
        margin: '0',
      },
      noNoticesStyle: {
        margin: '16px',
      }
    };

    var noticesList = [];

    if (this.state.notices) {
      let allNotices = JSON.parse(this.state.notices);

      for (let noticeNumber in allNotices) {
        let notice = allNotices[noticeNumber];
        noticesList.push(
          <Link key={notice.id} to={"/notice?id=" + notice.id} style={styles.noticeLink}>
            <Card style={styles.cardStyle}>
              <p style={styles.noticeDescription}>
                <b>{notice.title}</b>
                <br />
                {notice.body}
              </p>
            </Card>
          </Link>
        );
      }
    }

    if (!noticesList.length)
      noticesList.push(
        <Typography variant="h6" style={styles.noNoticesStyle}>
          No notices available
        </Typography>
      )

    return (
      <Page>
        <Navigation />

        <div>
          {noticesList}
        </div>
      </Page>
    );
  }
}

export default Home;