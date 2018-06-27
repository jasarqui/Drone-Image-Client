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
/* import misc components here */
import dialog from 'nw-dialog';

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
      metadata: [
        {
          name: 'Name',
          value: 'sample_file.png'
        },
        {
          name: 'Date',
          value: '06/27/2018'
        },
        {
          name: 'Camera',
          value: 'RGB Camera'
        }
      ],
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
    dialog.folderBrowserDialog(result => {
      this.setState({ selectedFile: result });
    });
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
                    <form>
                      <Button
                        isFullWidth
                        isColor="primary"
                        onClick={this.uploadFile}>
                        <Icon className="fa fa-upload" style={style.icon} />
                        Upload Image
                      </Button>
                    </form>
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
                    {this.state.metadata.map((data, id) => {
                      return (
                        <li key={id}>
                          <MenuLink style={style.removeUnderline}>
                            <Columns>
                              <Column isSize="1/3">{data.name}</Column>
                              <Column isSize="2/3">{data.value}</Column>
                            </Columns>
                          </MenuLink>
                        </li>
                      );
                    })}
                  </MenuList>
                  <MenuLabel>Attributes</MenuLabel>
                  <MenuList>
                    {this.state.attrib.map((attribute, id) => {
                      return (
                        <li key={id}>
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
