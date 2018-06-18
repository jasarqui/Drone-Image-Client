import React, { Component } from 'react';
/* import bulma components */
import { Box } from 'bloomer';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  preventReload = e => {
    e.preventDefault();
  };

  render() {
    return <Box>Log in!</Box>;
  }
}
