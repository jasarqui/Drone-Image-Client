/* import React components here */
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Dropzone from 'react-dropzone';
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
  Section
} from 'bloomer';
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
  dropzone: {
    /* pseudo flexbox */
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alingItems: 'center',
    height: '500px',
    verticalAlign: 'center',
    border: '2px dashed silver',
    margin: '5px'
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

  buttonUpload = e => {};

  uploadFile = files => {
    this.setState({ selectedFile: files[0] });

    this.uploadImage(files[0]);
  };

  uploadImage = image => {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', image);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        console.log(this.state.fileURL);
        this.setState({ fileURL: response.body.secure_url });
      }
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
              </CardHeader>
              <CardImage>
                <center>
                  {this.state.fileURL ? (
                    <Image isSize="4:3" src={this.state.fileURL} />
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
                          Click to select a file.
                        </Section>
                        <Section isHidden="desktop">
                          <Icon className="fa fa-upload" style={style.icon} />
                          Click to select a file.
                        </Section>
                      </div>
                    </Dropzone>
                  )}
                </center>
              </CardImage>
              <CardContent>
                <Button
                  isFullWidth
                  isColor="primary"
                  onClick={this.analyzeImage}
                  disabled={this.state.fileURL ? false : true}>
                  <Icon className="fa fa-bolt" style={style.icon} />
                  Analyze
                </Button>
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
