import React, { Component } from 'react';
/* import bulma components */
import { Footer, Container } from 'bloomer';

const style = {
  footer: {
    backgroundColor: '#F0EDEE'
  }
};

export default class Footbar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Footer id="footer" style={style.footer}>
        <Container>Hello World!</Container>
      </Footer>
    );
  }
}
