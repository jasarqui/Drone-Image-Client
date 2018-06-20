/* import React components here */
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
/* import bulma components */
import { Box } from 'bloomer';

export default class PageNotExist extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <DocumentTitle title="DIA | Error 404">
        <Box>Error 404</Box>
      </DocumentTitle>
    );
  }
}
