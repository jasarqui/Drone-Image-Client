/* import React components here */
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
/* import bulma components */
import {
  Columns,
  Column,
  Card,
  CardContent,
  CardHeader,
  CardHeaderTitle,
  CardHeaderIcon,
  Icon,
  Image,
  CardImage,
  Message,
  MessageHeader,
  MessageBody,
  Button,
  Menu,
  MenuLabel,
  MenuLink,
  MenuList
} from 'bloomer';

/* create styles here */
const style = {
  marginCard: {
    margin: '30px',
    borderRadius: '25px'
  },
  icon: {
    marginRight: '5px'
  },
  removeUnderline: {
    textDecoration: 'none'
  },
  marginPanel: {
    margin: '30px 20px 20px 0px'
  }
};

export default class Analyze extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      metadata: {
        name: 'sample_file.png',
        date: '06/27/2018'
      },
      attrib: [
        {
          name: 'Height',
          value: '3ft'
        },
        {
          name: 'Width',
          value: '1in'
        }
      ]
    };
  }

  uploadFile = e => {
    e.preventDefault();
    this.setState({ selectedFile: e.target.value });
  };

  analyzeImage = e => {
    /* this is where we put the glue */
    e.preventDefault();
  };

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
                  src={
                    this.state.selectedFile
                      ? this.state.selectedFile
                      : 'http://www.outokummunseutu.fi/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
                  }
                />
              </CardImage>
              <CardContent>
                <Columns>
                  <Column isSize="1/2">
                    <Button
                      isFullWidth
                      isColor="primary"
                      onClick={this.uploadFile}>
                      <Icon className="fa fa-upload" style={style.icon} />
                      Upload Image
                    </Button>
                  </Column>
                  <Column isSize="1/2">
                    <Button
                      isFullWidth
                      isColor="primary"
                      onClick={this.analyzeImage}>
                      <Icon className="fa fa-bolt" style={style.icon} />
                      Analyze
                    </Button>
                  </Column>
                </Columns>
              </CardContent>
            </Card>
          </Column>
          <Column isSize="1/3">
            <Message isColor="light" style={style.marginPanel}>
              <MessageHeader>Lorem Ipsum</MessageHeader>
              <MessageBody>
                <Menu>
                  <MenuLabel>Metadata</MenuLabel>
                  <MenuList>
                    <li>
                      <MenuLink style={style.removeUnderline}>
                        <Columns>
                          <Column isSize="1/3">Name</Column>
                          <Column isSize="2/3">
                            {this.state.metadata.name}
                          </Column>
                        </Columns>
                      </MenuLink>
                    </li>
                    <li>
                      <MenuLink style={style.removeUnderline}>
                        <Columns>
                          <Column isSize="1/3">Date</Column>
                          <Column isSize="2/3">
                            {this.state.metadata.date}
                          </Column>
                        </Columns>
                      </MenuLink>
                    </li>
                  </MenuList>
                  <MenuLabel>Attributes</MenuLabel>
                  <MenuList>
                    {this.state.attrib.map(attribute => {
                      return (
                        <li>
                          <MenuLink style={style.removeUnderline}>
                            <Columns>
                              <Column isSize="1/3">{attribute.name}</Column>
                              <Column isSize="2/3">{attribute.value}</Column>
                            </Columns>
                          </MenuLink>
                        </li>
                      );
                    })}
                  </MenuList>
                </Menu>
              </MessageBody>
            </Message>
          </Column>
        </Columns>
      </DocumentTitle>
    );
  }
}
