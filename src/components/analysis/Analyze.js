/* import React components here */
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Dropzone from 'react-dropzone';
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
  Section,
  Input
} from 'bloomer';
/* import api here */
import * as API from '../../api';
/* import misc components here */
import request from 'superagent';

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
  dropzone: {
    /* pseudo flexbox */
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '500px',
    verticalAlign: 'center',
    border: '2px dashed silver',
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

/* create constants here */
const CLOUDINARY_UPLOAD_PRESET = 'dronedb';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/jasarqui/upload';

export default class Analyze extends Component {
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

  uploadFile = files => {
    this.setState({ selectedFile: files[0] });
    this.uploadImage(files[0]);
  };

  uploadImage = image => {
    /* this is to post to the cloudinary api,
    so that the image is uploaded to the cloud */
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', image);

    /* upload end is when the image is finished uploading */
    upload.end((err, response) => {
      if (err) {
        console.error(err);
        /* this is an alert on success */
        Alert.error('Failed to save image.', {
          beep: false,
          position: 'top-right',
          effect: 'jelly',
          timeout: 2000
        });
      }

      if (response.body.secure_url !== '') {
        this.setState({ fileURL: response.body.secure_url });
        /* this is an alert on success */
        Alert.success('Successfully uploaded image.', {
          beep: false,
          position: 'top-right',
          effect: 'jelly',
          timeout: 2000
        });
      }
    });
  };

  analyzeImage = e => {
    e.preventDefault();
    /* this is where we put the glue */

    /* update date for analyze date */
    this.setState({
      /* this should only get the date excluding the time */
      date: new Date(Date.now()).toLocaleString().split(',')[0]
    });

    // placeholder, needs glue
    /* this is an alert on success */
    Alert.success('Successfully analyzed image.', {
      beep: false,
      position: 'top-right',
      effect: 'jelly',
      timeout: 2000
    });
  };

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

  // this will send the image info into the database
  save = e => {
    e.preventDefault();

    /* saves the image information */
    API.save({
      fileURL: this.state.fileURL,
      name: this.state.name,
      camera: this.state.camera,
      date: this.state.date,
      is_private: this.state.private,
      attrib: this.state.attrib,
      userId: this.props.userId
    })
      .then(() => {
        /* this is an alert on success */
        Alert.success('Successfully saved image.', {
          beep: false,
          position: 'top-right',
          effect: 'jelly',
          timeout: 2000
        });
      })
      .catch(() => {
        /* this is an alert on failure */
        Alert.error('Failed to save image.', {
          beep: false,
          position: 'top-right',
          effect: 'jelly',
          timeout: 2000
        });
      });
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
                  {this.state.fileURL ? (
                    <Image
                      isSize="4:3"
                      src={this.state.fileURL}
                      style={style.imageMargin}
                    />
                  ) : this.state.selectedFile ? (
                    <div style={style.dropzone}>
                      <Icon
                        className="fa fa-cog fa-spin fa-5x"
                        style={style.icon}
                        isSize="large"
                      />
                      <br />
                      Please wait until the upload is complete
                    </div>
                  ) : (
                    <Dropzone
                      style={style.dropzone}
                      multiple={false}
                      accept="image/*"
                      onDrop={this.uploadFile}>
                      <div>
                        <Section isHidden="mobile">
                          <Icon className="fa fa-download" style={style.icon} />
                          Drop an image or{'  '}
                          <Icon className="fa fa-upload" style={style.icon} />
                          Click to select one.
                        </Section>
                        <Section isHidden="desktop">
                          <Icon className="fa fa-upload" style={style.icon} />
                          Click to select an image.
                        </Section>
                      </div>
                    </Dropzone>
                  )}
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
