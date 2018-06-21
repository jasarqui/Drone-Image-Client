/* import React components here */
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
/* import bulma components */
import {
  Columns,
  Column,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardHeaderTitle,
  CardHeaderIcon,
  Icon,
  Image,
  CardImage,
  Panel,
  PanelBlock,
  PanelIcon,
  PanelHeading,
  Button
} from 'bloomer';

/* create styles here */
const style = {
  marginCard: {
    margin: '30px',
    borderRadius: '25px'
  }
};

export default class Analyze extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <DocumentTitle title="DIA | Analyze">
        <Columns isGapless>
          <Column isSize="2/3">
            <Card style={style.marginCard}>
              <CardHeader>
                <CardHeaderTitle>Component</CardHeaderTitle>
                <CardHeaderIcon>
                  <Icon className="fa fa-angle-down" />
                </CardHeaderIcon>
              </CardHeader>
              <CardImage>
                <Image
                  isRatio="4:3"
                  src="https://via.placeholder.com/1280x960"
                />
              </CardImage>
              <CardContent>Hello</CardContent>
            </Card>
          </Column>
          <Column isSize="1/3">
            <Panel>
              <PanelHeading>Lorem Ipsum</PanelHeading>
              <PanelBlock>
                <PanelIcon className="fa fa-book" />
                Bloomer
              </PanelBlock>
              <PanelBlock>
                <PanelIcon className="fa fa-code-fork" />
                RxJS
              </PanelBlock>
              <PanelBlock>
                <PanelIcon className="fa fa-code-fork" />
                Webpack
              </PanelBlock>
              <PanelBlock>
                <PanelIcon className="fa fa-code-fork" />
                Typescript
              </PanelBlock>
              <PanelBlock>
                <Button isOutlined isFullWidth isColor="primary">
                  {' '}
                  Analyze
                </Button>
              </PanelBlock>
            </Panel>
          </Column>
        </Columns>
      </DocumentTitle>
    );
  }
}
