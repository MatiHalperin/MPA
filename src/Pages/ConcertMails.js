import React, { Component } from 'react';

import Server from '../Helpers/Server';

class ConcertMails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      concertId: new URLSearchParams(this.props.location.search).get('id'),
      emails: []
    };

    Server.interact("GET", "/api/Concerts/" + this.state.concertId + "/users")
    .then(response => {
      let emails = [];

      for (let user in response)
        emails.push(response[user].email);

      this.setState({ emails: emails });
    });
  }

  render() {
    let emails;

    if (this.state.emails)
      emails = (
        <p style={{margin: 0}}>
          {this.state.emails.map((item, index) => <div>{item}<br /></div> )}
        </p>
      )

    return (
      <div>{emails}</div>
    );
  }
}

export default ConcertMails;