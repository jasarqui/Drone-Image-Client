/* import React components here */
import React, { Component } from 'react';
/* import bulma components */
import { Progress, Heading } from 'bloomer';

export default class How extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div style={{ padding: '30px' }}>
        <Heading>
          <strong>DO STEP 1</strong>
        </Heading>
        <Progress
          isColor={'info'}
          value={1}
          max={4}
          isFullWidth={false}
          isSize={'small'}
        />
        <Heading>
          <strong>DO STEP 2</strong>
        </Heading>
        <Progress
          isColor={'info'}
          value={2}
          max={4}
          isFullWidth={false}
          isSize={'small'}
        />
        <Heading>
          <strong>DO STEP 3</strong>
        </Heading>
        <Progress
          isColor={'info'}
          value={3}
          max={4}
          isFullWidth={false}
          isSize={'small'}
        />
        <Heading>
          <strong>DO STEP 4</strong>
        </Heading>
        <Progress
          isColor={'info'}
          value={4}
          max={4}
          isFullWidth={false}
          isSize={'small'}
        />
      </div>
    );
  }
}
