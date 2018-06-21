/* import React components here */
import React, { Component } from 'react';
/* import bulma components */
import { Box } from 'bloomer';

export default class BrowseBody extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Box>
        {'Currently shows '}
        {this.props.showData === 'Public and Private Data'
          ? 'all data'
          : this.props.showData === 'Public Data'
            ? 'public data'
            : 'private data'}
        {' of '}
        {this.props.myUpload ? 'your images' : "everyone's images"}
        {' that is of '}
        {this.props.category === 'all'
          ? 'all categories.'
          : 'category ' + this.props.category + '.'}
      </Box>
    );
  }
}
