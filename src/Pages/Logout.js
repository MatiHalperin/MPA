import { Component } from 'react';

import SessionHandler from "../Helpers/SessionHandler";

class Logout extends Component {
  constructor(props) {
    super(props);

    SessionHandler.logOut();
    this.props.history.push("/");
  }

  render() {
    return
  }
}

export default Logout;