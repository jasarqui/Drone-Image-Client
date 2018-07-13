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
        <Box style={{ margin: '20px' }}>
          Error 404: Page Not Found<br /> How did you get here?
        </Box>
      </DocumentTitle>
    );
  }
}
