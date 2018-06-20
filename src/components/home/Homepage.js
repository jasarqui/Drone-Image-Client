/* import React components here */
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
/* import bulma components */
import { Box } from 'bloomer';

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <DocumentTitle title="DIA">
        <Box>Hello world!</Box>
      </DocumentTitle>
    );
  }
}
