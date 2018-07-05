/* import React components here */
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Alert from 'react-s-alert';

/* import bulma components */
import {
  Columns,
  Column,
  Card,
  CardContent,
  CardHeader,
  CardHeaderTitle,
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
  MenuList,
  Input
} from 'bloomer';
/* import api here */
import * as API from '../../api';

/* create styles here */
const style = {
  marginCard: {
    margin: '30px',
    borderRadius: '25px'
  },
  icon: {
    marginRight: '3px'
  },
  removeUnderline: {
    textDecoration: 'none'
  },
  marginPanel: {
    margin: '30px'
  },
  imageMargin: {
    margin: '5px'
  },
  switchOn: {
    color: '#23d160',
    margin: '0px',
    padding: '0px',
    textDecoration: 'none'
  },
  switchOff: {
    color: '#b5b5b5',
    margin: '0px',
    padding: '0px',
    textDecoration: 'none'
  }
};
export default class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      fileURL: null,
      /* UX purpose */
      metadataOpen: true,
      attribOpen: true,
      /* these are metadata */
      name: '',
      camera: '',
      date: '',
      private: false, // this is default
      /* these are analyzed data */
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

  /* this will load the information */
  componentDidMount = () => {};

  changeName = e => {
    this.setState({ name: e.target.value });
  };

  changeCam = e => {
    this.setState({ camera: e.target.value });
  };

  handleMeta = e => {
    e.preventDefault();
    this.setState({ metadataOpen: !this.state.metadataOpen });
  };

  handleAttrib = e => {
    e.preventDefault();
    this.setState({ attribOpen: !this.state.attribOpen });
  };

  switch = e => {
    e.preventDefault();
    this.setState({ private: !this.state.private });
  };

  render() {
    return (
      <DocumentTitle title="DIA | Analyze">
        <Columns isGapless>
          <Column isSize="2/3">
            <Card style={style.marginCard}>
              <CardHeader>
                <CardHeaderTitle>
                  {!this.state.name ? 'New Image' : this.state.name}
                </CardHeaderTitle>
              </CardHeader>
              <CardImage>
                <center>
                  <Image
                    isSize="4:3"
                    src={this.state.fileURL}
                    style={style.imageMargin}
                  />
                </center>
              </CardImage>
              <CardContent>
                <Columns>
                  <Column isSize="1/2">
                    <Button
                      isFullWidth
                      isColor="primary"
                      onClick={this.analyzeImage}
                      disabled={this.state.fileURL ? false : true}>
                      <Icon className="fa fa-bolt" style={style.icon} />
                      Analyze
                    </Button>
                  </Column>
                  <Column isSize="1/2">
                    <Button
                      isFullWidth
                      isColor="primary"
                      onClick={this.save}
                      disabled={
                        this.state.fileURL &&
                        this.state.name &&
                        this.state.camera &&
                        this.state.date
                          ? false
                          : true
                      }>
                      <Icon className="fa fa-save" style={style.icon} />
                      Save
                    </Button>
                  </Column>
                </Columns>
              </CardContent>
            </Card>
          </Column>
          <Column isSize="1/3">
            <Message isColor="light" style={style.marginPanel}>
              <MessageHeader>Image Data</MessageHeader>
              <MessageBody>
                <Menu>
                  <MenuLabel>
                    Metadata{' '}
                    <a
                      href="."
                      onClick={this.handleMeta}
                      style={style.removeUnderline}>
                      <Icon
                        className={
                          this.state.metadataOpen
                            ? 'fa fa-angle-up'
                            : 'fa fa-angle-down'
                        }
                        isSize="small"
                      />
                    </a>
                  </MenuLabel>
                  {this.state.metadataOpen ? (
                    <MenuList>
                      <li>
                        <MenuLink style={style.removeUnderline}>
                          <Columns>
                            <Column isSize="1/3">Name</Column>
                            <Column isSize="2/3">
                              <Input
                                type="text"
                                isSize="small"
                                value={this.state.name}
                                onChange={this.changeName}
                              />
                            </Column>
                          </Columns>
                        </MenuLink>
                      </li>
                      <li>
                        <MenuLink style={style.removeUnderline}>
                          <Columns>
                            <Column isSize="1/3">Camera</Column>
                            <Column isSize="2/3">
                              <Input
                                type="text"
                                isSize="small"
                                value={this.state.camera}
                                onChange={this.changeCam}
                              />
                            </Column>
                          </Columns>
                        </MenuLink>
                      </li>
                      <li>
                        <MenuLink style={style.removeUnderline}>
                          <Columns>
                            <Column isSize="1/3">Date</Column>
                            <Column isSize="2/3">{this.state.date}</Column>
                          </Columns>
                        </MenuLink>
                      </li>
                      <li>
                        <MenuLink
                          style={style.removeUnderline}
                          onClick={this.switch}>
                          <Columns>
                            <Column isSize="1/3">Private</Column>
                            <Column isSize="2/3">
                              {this.state.private ? (
                                <i style={style.switchOn}>
                                  <Icon
                                    href="."
                                    className={'fa fa-toggle-on fa-lg'}
                                    isSize="small"
                                  />
                                </i>
                              ) : (
                                <i style={style.switchOff}>
                                  <Icon
                                    href="."
                                    className={'fa fa-toggle-off fa-lg'}
                                    isSize="small"
                                  />
                                </i>
                              )}
                            </Column>
                          </Columns>
                        </MenuLink>
                      </li>
                    </MenuList>
                  ) : (
                    <div />
                  )}
                  <MenuLabel>
                    Attributes{' '}
                    <a
                      href="."
                      onClick={this.handleAttrib}
                      style={style.removeUnderline}>
                      <Icon
                        className={
                          this.state.attribOpen
                            ? 'fa fa-angle-up'
                            : 'fa fa-angle-down'
                        }
                        isSize="small"
                      />
                    </a>
                  </MenuLabel>
                  {this.state.attribOpen ? (
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
                  ) : (
                    <div />
                  )}
                </Menu>
              </MessageBody>
            </Message>
          </Column>
        </Columns>
      </DocumentTitle>
    );
  }
}
