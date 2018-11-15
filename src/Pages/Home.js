import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';

import Navigation from '../Components/Navigation';
import Page from '../Components/Page';
import Server from '../Helpers/Server';
import SessionHandler from '../Helpers/SessionHandler';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notices: '',
    };

    Server.interact("GET", "/api/Notices")
    .then(notices => {
      notices.sort((a, b) => b.id - a.id);
      this.setState({notices: notices});
    });
  }

  handleDeleteClick = id => event => {
    Server.interact("DELETE", "/api/Notices/" + id)
    .then(() => {
      let notices = this.state.notices;

      for (let notice in notices)
        if (notices[notice].id === id)
          notices.splice(notice, 1);

      this.setState({notices: notices});
    });

    event.preventDefault();
  }

  render() {
    const styles = {
      cardStyle: {
        width: 'fit-content',
        padding: '16px',
        margin: '8px 8px 0',
        borderRadius: '8px',
      },
      newNoticeLink: {
        textDecoration: 'none',
      },
      buttonStyle: {
        margin: '24px 0 0 24px',
      },
      buttonIconStyle: {
        marginRight: '8px',
      },
      noNoticesStyle: {
        margin: '12px 0 0 12px',
      }
    };

    let newNotice;

    if (SessionHandler.isAdmin())
      newNotice = (
        <Link to="/forms/notice" style={styles.newNoticeLink}>
          <Button color="primary" variant="extendedFab" style={styles.buttonStyle}>
            <AddIcon style={styles.buttonIconStyle} />
            Nueva noticia
          </Button>
        </Link>
      );

    let noticesList = [];

    if (this.state.notices) {
      let allNotices = this.state.notices;

      for (let noticeNumber in allNotices) {
        let notice = allNotices[noticeNumber];

        let deleteButton;

        if (SessionHandler.isAdmin())
          deleteButton = (
            <CardActions>
              <Button onClick={this.handleDeleteClick(notice.id)} type="submit" color="primary">
                Eliminar
              </Button>
            </CardActions>
          )

        noticesList.push(
          <Grid key={notice.id} item xs={4} xl={3}>
            <Card style={{borderRadius: '8px'}}>
              <CardContent>
                <Typography style={{marginBottom: '12px'}} variant="h5" component="h2">
                  {notice.title}
                </Typography>
                <Typography component="p">
                  {notice.body}
                </Typography>
              </CardContent>
              {deleteButton}
            </Card>
          </Grid>
        );
      }
    }

    if (!noticesList.length)
      noticesList = (
        <Typography variant="h6" style={styles.noNoticesStyle}>
          No hay noticias
        </Typography>
      )

    return (
      <Page>
        <Navigation />

        {newNotice}

        <Grid container spacing={24} style={{width: 'calc(100% - 24px)', margin: '12px auto 0'}}>
          {noticesList}
        </Grid>
      </Page>
    );
  }
}

export default Home;