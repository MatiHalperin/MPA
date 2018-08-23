import { Component } from 'react';

import SessionHandler from "../SessionHandler";

class Logout extends Component {
  constructor(props) {
    super(props);

    SessionHandler.logOut();
    this.props.history.push("/");
  }

  render() {
    return 0;
  }
}

export default Logout;
