/* import React components here */
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Dropzone from 'react-dropzone';
import Alert from 'react-s-alert';
import ReactTooltip from 'react-tooltip';
import { Carousel } from 'react-responsive-carousel';
import RemoveModal from './modals/RemoveModal';
import SaveModal from './modals/SaveModal';
import AnalyzeModal from './modals/AnalyzeModal';
/* import bulma components */
import {
  Columns,
  Column,
  Icon,
  Message,
  MessageHeader,
  MessageBody,
  Menu,
  MenuLabel,
  MenuLink,
  MenuList,
  Section,
  Input,
  Heading,
  Delete,
  Button
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
  imageMargin: {
    margin: '5px'
  },
  switchOn: {
    color: '#57bc90',
    margin: '0px',
    padding: '0px',
    textDecoration: 'none'
  },
  switchOff: {
    color: '#ef6f6c',
    margin: '0px',
    padding: '0px',
    textDecoration: 'none'
  },
  toolbar: {
    textAlign: 'center',
    padding: '15px 0px 0px 0px'
  },
  whiteText: {
    color: 'white'
  },
  dropInitial: {
    /* pseudo flexbox */
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    verticalAlign: 'center',
    border: '2px dashed silver',
    borderRadius: '30px',
    backgroundColor: '#f8f8f8',
    margin: '20px'
  },
  dataHeader: {
    backgroundColor: '#015249',
    color: 'white',
    paddingTop: '0px'
  },
  button: {
    backgroundColor: '#015249',
    border: '1px solid #015249',
    color: 'white',
    marginTop: '0px',
    width: '25%'
  },
  activeButton: {
    color: 'white',
    backgroundColor: '#77c9d4',
    border: '1px solid #77c9d4'
  }
};

/* create constants here */
const CLOUDINARY_UPLOAD_PRESET = 'dronedb';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/jasarqui/upload';

export default class Analyze extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carousel: [],
      images: [
        {
          fileURL:
            'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=350',
          /* UX purpose */
          metadataOpen: true,
          attribOpen: true,
          /* these are metadata */
          name: 'try1.png',
          camera: 'RGB',
          season: 'DRY',
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
        },
        {
          fileURL:
            'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=350',
          /* UX purpose */
          metadataOpen: true,
          attribOpen: true,
          /* these are metadata */
          name: 'try2.png',
          camera: 'Thermal',
          season: 'WET',
          date: '',
          private: false, // this is default
          /* these are analyzed data */
          attrib: [
            {
              name: 'Height',
              value: '5ft'
            },
            {
              name: 'Width',
              value: '2in'
            }
          ]
        },
        {
          fileURL:
            'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=350',
          /* UX purpose */
          metadataOpen: true,
          attribOpen: true,
          /* these are metadata */
          name: 'try3.png',
          camera: 'Something',
          season: 'WET',
          date: '',
          private: true, // this is default
          /* these are analyzed data */
          attrib: [
            {
              name: 'Height',
              value: '10ft'
            },
            {
              name: 'Width',
              value: '1in'
            }
          ]
        }
      ],
      removeModalOpen: false,
      analyzeModalOpen: false,
      saveModalOpen: false,
      activeImage: 0
    };

    /* since this function is not an arrow binded function */
    this.updateImages = this.updateImages.bind(this);
  }

  openModal = e => {
    e.preventDefault();
    e.currentTarget.dataset.value === 'remove'
      ? this.setState({ removeModalOpen: true })
      : e.currentTarget.dataset.value === 'save'
        ? this.setState({ saveModalOpen: true })
        : this.setState({ analyzeModalOpen: true });
  };

  closeModal = e => {
    e.preventDefault();
    e.currentTarget.dataset.value === 'remove'
      ? this.setState({ removeModalOpen: false })
      : e.currentTarget.dataset.value === 'save'
        ? this.setState({ saveModalOpen: false })
        : this.setState({ analyzeModalOpen: false });
  };

  removeAll = e => {
    e.preventDefault();
    this.setState({ removeModalOpen: false });
    /* this will reset the images array */
    this.setState({ images: [] });
    this.setState({ activeImage: 0 });
  };

  saveAll = e => {
    e.preventDefault();
    this.setState({ saveModalOpen: false });
    /* this will save all images to database */
  };

  analyzeAll = e => {
    e.preventDefault();
    this.setState({ analyzeModalOpen: false });
    /* this will analyze all images to database */
  };

  changeActiveImg = index => {
    this.setState({ activeImage: index });
  };

  handleMeta = e => {
    e.preventDefault();
    var imageState = [...this.state.images];
    imageState[this.state.activeImage].metadataOpen = !imageState[
      this.state.activeImage
    ].metadataOpen;
    this.setState({ images: imageState });
  };

  handleAttrib = e => {
    e.preventDefault();
    var imageState = [...this.state.images];
    imageState[this.state.activeImage].attribOpen = !imageState[
      this.state.activeImage
    ].attribOpen;
    this.setState({ images: imageState });
  };

  switch = e => {
    e.preventDefault();
    var imageState = [...this.state.images];
    imageState[this.state.activeImage].private = !imageState[
      this.state.activeImage
    ].private;
    this.setState({ images: imageState });
  };

  changeName = e => {
    var imageState = [...this.state.images];
    imageState[this.state.activeImage].name = e.target.value;
    this.setState({ images: imageState });
  };

  changeCam = e => {
    var imageState = [...this.state.images];
    imageState[this.state.activeImage].camera = e.target.value;
    this.setState({ images: imageState });
  };

  changeSeason = e => {
    e.preventDefault();
    var imageState = [...this.state.images];
    imageState[this.state.activeImage].season = e.currentTarget.dataset.value;
    this.setState({ images: imageState });
  };

  removeImage = index => {
    /* this is to avoid errors */
    if (this.state.activeImage !== 0) {
      if (this.state.activeImage === index)
        this.setState({ activeImage: this.state.activeImage - 1 });
      else if (this.state.activeImage - 1 === index)
        this.setState({ activeImage: this.state.activeImage - 2 });
    }

    this.updateImages(index)
      .then(result => {
        /* update the state */
        this.setState({ images: result });
      }) /* update the carousel */
      .then(this.renderCarousel);
  };

  /* this function returns the properly updated array */
  async updateImages(index) {
    return new Promise(resolve => {
      var imageState = [...this.state.images];
      imageState.splice(index, 1);
      return resolve(imageState);
    });
  }

  /* reusable carousel updater */
  renderCarousel = () => {
    /* restart the carousel first */
    this.setState({ carousel: [] });
    /* update the carousel */
    this.setState({
      carousel: (
        <Carousel
          showStatus={false}
          onChange={this.changeActiveImg}
          selectedItem={this.state.activeImage}>
          {this.state.images.map((image, index) => {
            return (
              <div key={index}>
                <img src={image.fileURL} alt={`${index}`} />
              </div>
            );
          })}
        </Carousel>
      )
    });
  };

  /* for dev purposes only */
  componentDidMount = () => {
    /* maps the initial carousel state */
    /* this is to avoid error, although technically
    the images state is empty from the start */
    this.renderCarousel();
  };

  /* below are unfinished */

  uploadFile = files => {
    this.setState({ selectedFile: files[0] });
    this.uploadImage(files[0]);
  };

  uploadImage = image => {
    this.setState({ name: image.name });
    /* this is to post to the cloudinary api,
    so that the image is uploaded to the cloud */
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', image);

    /* upload end is when the image is finished uploading */
    upload.end((err, response) => {
      if (err) {
        /* this is an alert on success */
        Alert.error('Failed to upload image.', {
          beep: false,
          position: 'top-right',
          effect: 'jelly',
          timeout: 2000
        });
      } else {
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

  render() {
    return (
      <DocumentTitle title="DIA | Analyze">
        <div>
          <Columns isFullWidth style={{ backgroundColor: '#015249' }}>
            <Column style={style.toolbar} isHidden={'mobile'}>
              <a href={'.'} data-tip={'Add Image(s)'} style={style.whiteText}>
                <Icon className={'fa fa-plus-circle fa-1x'} />
                <Heading>ADD</Heading>
              </a>
            </Column>
            <Column style={style.toolbar} isHidden={'mobile'}>
              <a
                href={'.'}
                data-value={'analyze'}
                data-tip={'Analyze Image(s)'}
                style={style.whiteText}
                onClick={this.openModal}>
                <Icon className={'fa fa-bolt fa-1x'} />
                <Heading>ANALYZE</Heading>
              </a>
            </Column>
            <Column style={style.toolbar} isHidden={'mobile'}>
              <a
                href={'.'}
                data-value={'save'}
                data-tip={'Save analyzed Image(s)'}
                style={style.whiteText}
                onClick={this.openModal}>
                <Icon className={'fa fa-save fa-1x'} />
                <Heading>SAVE</Heading>
              </a>
            </Column>
            <Column style={style.toolbar} isHidden={'mobile'}>
              <a
                href={'.'}
                data-value={'remove'}
                data-tip={'Remove all Image(s)'}
                style={style.whiteText}
                onClick={this.openModal}>
                <Icon className={'fa fa-minus-circle fa-1x'} />
                <Heading>REMOVE</Heading>
              </a>
            </Column>
            <Column
              style={{ paddingTop: '20px', textAlign: 'center' }}
              isHidden={'desktop'}>
              <Button style={style.button}>
                <center>
                  <Icon className={'fa fa-plus-circle fa-1x'} />
                  <small style={{ color: 'white', fontSize: '15px' }}>
                    ADD
                  </small>
                </center>
              </Button>
              <Button style={style.button}>
                <center>
                  <Icon className={'fa fa-bolt fa-1x'} />
                  <small style={{ color: 'white' }}>ANALYZE</small>
                </center>
              </Button>
              <Button style={style.button}>
                <center>
                  <Icon className={'fa fa-save fa-1x'} />
                  <small style={{ color: 'white' }}>SAVE</small>
                </center>
              </Button>
              <Button style={style.button} onClick={this.openRemoveModal}>
                <center>
                  <Icon className={'fa fa-minus-circle fa-1x'} />
                  <small style={{ color: 'white' }}>REMOVE</small>
                </center>
              </Button>
            </Column>
          </Columns>
          {this.state.images.length === 0 ? (
            <Dropzone
              style={style.dropInitial}
              multiple={true}
              accept="image/*"
              onDrop={this.uploadFile}>
              <div>
                <Section isHidden="mobile">
                  <Icon className="fa fa-download" style={style.icon} />
                  Drop images or{'  '}
                  <Icon className="fa fa-upload" style={style.icon} />
                  Click to select them.
                </Section>
                <Section isHidden="desktop">
                  <Icon className="fa fa-upload" style={style.icon} />
                  Click to select images.
                </Section>
              </div>
            </Dropzone>
          ) : (
            <div>
              <Columns isFullWidth>
                <Column
                  isSize={'1/3'}
                  style={{ borderRight: '2px solid #015249' }}>
                  <Menu>
                    <MenuLabel style={{ marginLeft: '5px' }}>
                      Collection
                    </MenuLabel>
                    <MenuList>
                      {this.state.images.map((image, index) => {
                        return (
                          <MenuLink
                            key={index}
                            style={
                              index === this.state.activeImage
                                ? {
                                    backgroundColor: '#77c9d4',
                                    color: 'white',
                                    cursor: 'default'
                                  }
                                : { cursor: 'default' }
                            }>
                            {image.name}
                            <Delete
                              style={{ float: 'right' }}
                              onClick={() => {
                                this.removeImage(index);
                              }}
                            />
                          </MenuLink>
                        );
                      })}
                    </MenuList>
                  </Menu>
                </Column>
                <Column
                  isSize={'2/3'}
                  style={{ backgroundColor: '#F8F8F8', paddingLeft: '0px' }}>
                  <center>{this.state.carousel}</center>
                </Column>
              </Columns>
              <Columns isFullWidth style={{ backgroundColor: '#015249' }}>
                <Column>
                  <Message>
                    <MessageHeader style={style.dataHeader}>
                      <Heading
                        style={{
                          fontSize: '18px',
                          paddingTop: '5px',
                          paddingBottom: '0px'
                        }}>
                        Image Data
                      </Heading>
                      <Delete style={{ marginTop: '0px' }} />
                    </MessageHeader>
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
                                this.state.images[this.state.activeImage]
                                  .metadataOpen
                                  ? 'fa fa-angle-up'
                                  : 'fa fa-angle-down'
                              }
                              isSize="small"
                            />
                          </a>
                        </MenuLabel>
                        {this.state.images[this.state.activeImage]
                          .metadataOpen ? (
                          <MenuList>
                            <li>
                              <MenuLink style={style.removeUnderline}>
                                <Columns>
                                  <Column isSize="1/4">Name</Column>
                                  <Column isSize="3/4">
                                    <Input
                                      type="text"
                                      isSize="small"
                                      value={
                                        this.state.images[
                                          this.state.activeImage
                                        ].name
                                      }
                                      onChange={this.changeName}
                                    />
                                  </Column>
                                </Columns>
                              </MenuLink>
                            </li>
                            <li>
                              <MenuLink style={style.removeUnderline}>
                                <Columns>
                                  <Column isSize="1/4">Camera</Column>
                                  <Column isSize="3/4">
                                    <Input
                                      type="text"
                                      isSize="small"
                                      value={
                                        this.state.images[
                                          this.state.activeImage
                                        ].camera
                                      }
                                      onChange={this.changeCam}
                                    />
                                  </Column>
                                </Columns>
                              </MenuLink>
                            </li>
                            <MenuLink style={style.removeUnderline}>
                              <Columns>
                                <Column isSize="1/4">Season</Column>
                                <Column isSize="3/4">
                                  <Button
                                    data-value={'WET'}
                                    onClick={this.changeSeason}
                                    isSize={'small'}
                                    style={
                                      this.state.images[this.state.activeImage]
                                        .season === 'WET'
                                        ? style.activeButton
                                        : {}
                                    }>
                                    <Icon
                                      className={'fa fa-umbrella fa-1x'}
                                      style={{ marginRight: '5px' }}
                                    />{' '}
                                    WET
                                  </Button>
                                  <Button
                                    data-value={'DRY'}
                                    onClick={this.changeSeason}
                                    isSize={'small'}
                                    style={
                                      this.state.images[this.state.activeImage]
                                        .season === 'DRY'
                                        ? style.activeButton
                                        : {}
                                    }>
                                    <Icon
                                      className={'fa fa-fire fa-1x'}
                                      style={{ marginRight: '5px' }}
                                    />{' '}
                                    DRY
                                  </Button>
                                </Column>
                              </Columns>
                            </MenuLink>
                            <li>
                              <MenuLink
                                style={style.removeUnderline}
                                onClick={this.switch}>
                                <Columns>
                                  <Column isSize="1/4">Private</Column>
                                  <Column
                                    isSize="3/4"
                                    style={{ paddingLeft: '20px' }}>
                                    {this.state.images[this.state.activeImage]
                                      .private ? (
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
                            <li>
                              <MenuLink style={style.removeUnderline}>
                                <Columns>
                                  <Column isSize="1/4">Date</Column>
                                  <Column isSize="3/4">
                                    {
                                      this.state.images[this.state.activeImage]
                                        .date
                                    }
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
                                this.state.images[this.state.activeImage]
                                  .attribOpen
                                  ? 'fa fa-angle-up'
                                  : 'fa fa-angle-down'
                              }
                              isSize="small"
                            />
                          </a>
                        </MenuLabel>
                        {this.state.images[this.state.activeImage]
                          .attribOpen ? (
                          <MenuList>
                            {this.state.images[
                              this.state.activeImage
                            ].attrib.map((attribute, id) => {
                              return (
                                <li key={id}>
                                  <MenuLink style={style.removeUnderline}>
                                    <Columns>
                                      <Column isSize="1/4">
                                        {attribute.name}
                                      </Column>
                                      <Column isSize="3/4">
                                        {attribute.value}
                                      </Column>
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
            </div>
          )}
          <ReactTooltip effect={'solid'} place={'bottom'} />
          {/* these are modals */}
          <RemoveModal
            {...{
              /* pass props here */
              active: this.state.removeModalOpen,
              /* pass handlers here */
              close: this.closeModal,
              removeAll: this.removeAll
            }}
          />
          <SaveModal
            {...{
              /* pass props here */
              active: this.state.saveModalOpen,
              /* pass handlers here */
              close: this.closeModal,
              saveAll: this.saveAll
            }}
          />
          <AnalyzeModal
            {...{
              /* pass props here */
              active: this.state.analyzeModalOpen,
              /* pass handlers here */
              close: this.closeModal,
              analyzeAll: this.analyzeAll
            }}
          />
        </div>
      </DocumentTitle>
    );
  }
}
