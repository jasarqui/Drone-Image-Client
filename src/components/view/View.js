/* import React components here */
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Alert from 'react-s-alert';
import ReactTooltip from 'react-tooltip';
import ArchiveModal from './modals/ArchiveModal';
import UnarchiveModal from './modals/UnarchiveModal';
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
  Input,
  Heading,
  Button
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
    width: '25%',
    textAlign: 'center'
  },
  activeButton: {
    color: 'white',
    backgroundColor: '#77c9d4',
    border: '1px solid #77c9d4'
  },
  activeHelper: {
    float: 'right',
    borderRadius: '50%',
    color: 'white',
    backgroundColor: '#77c9d4',
    border: 'none',
    marginTop: '-4px'
  },
  inactiveHelper: {
    float: 'right',
    borderRadius: '50%',
    backgroundColor: 'white',
    border: 'none',
    marginTop: '-4px'
  },
  imageColumn: {
    /* pseudo flexbox */
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'center',
    backgroundColor: '#f8f8f8',
    paddingLeft: '0px'
  }
};

export default class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileURL: '',
      name: '',
      camera: '',
      season: '',
      private: '',
      date: '',
      archived: '',
      attrib: [],
      /* these are for UX */
      metadataOpen: true,
      attribOpen: true,
      archiveModalOpen: false,
      unarchiveModalOpen: false,
      userID: ''
    };
  }

  /* modal functions */
  openModal = e => {
    e.preventDefault();
    e.currentTarget.dataset.value === 'archive'
      ? this.setState({ archiveModalOpen: true })
      : this.setState({ unarchiveModalOpen: true });
  };

  closeModal = e => {
    e.preventDefault();
    e.currentTarget.dataset.value === 'archive'
      ? this.setState({ archiveModalOpen: false })
      : this.setState({ unarchiveModal: false });
  };

  /* this is to archive an image */
  archive = e => {
    e.preventDefault();
    this.archiveImage().then(() => {
      this.loadInfo('archive');
      this.setState({ archiveModalOpen: false });
    });
  };

  async archiveImage() {
    API.archiveImg({ id: this.props.imageID });
  }

  /* this is to unarchive an image */
  unarchive = e => {
    e.preventDefault();
    this.unarchiveImage().then(() => {
      this.loadInfo('unarchive');
      this.setState({ unarchiveModalOpen: false });
    });
  };

  async unarchiveImage() {
    API.unarchiveImg({ id: this.props.imageID });
  }

  /* handlers */
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

  changeName = e => {
    this.setState({ name: e.target.value });
  };

  changeCam = e => {
    this.setState({ camera: e.target.value });
  };

  changeSeason = e => {
    e.preventDefault();
    this.setState({ season: e.currentTarget.dataset.value });
  };

  /* when user logs out */
  componentWillReceiveProps(nextProps) {
    if (
      this.props.loggedIn === false &&
      nextProps.loggedIn === false &&
      (this.state.private || this.state.archived)
    )
      this.props.changePage('browse');
  }

  /* loads the image info */
  componentDidMount = () => {
    this.loadInfo('all');
  };

  /* reusable load info */
  loadInfo = params => {
    if (params === 'all') {
      API.getImage(this.props.imageID).then(result => {
        this.setState({
          fileURL: result.data.data.filepath,
          name: result.data.data.name,
          camera: result.data.data.camera,
          season: result.data.data.season,
          private: result.data.data.private,
          date: result.data.data.date,
          attrib: result.data.data.data,
          archived: result.data.data.archived,
          userID: result.data.data.user_id
        });
      });
    } else {
      API.getImage(this.props.imageID).then(result => {
        this.setState({
          archived: result.data.data.archived
        });
      });
    }
  };

  /* analyzes one */
  analyzeImage = e => {
    e.preventDefault();
    /* this is where we put the glue */

    /* this should only get the date excluding the time */
    this.setState({
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

  /* saves one */
  save = e => {
    e.preventDefault();
    API.update({
      name: this.state.name,
      camera: this.state.camera,
      date: this.state.date ? this.state.date : 'unanalyzed',
      is_private: this.state.private,
      season: this.state.season,
      attrib: this.state.attrib,
      id: this.props.imageID
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
      <DocumentTitle title="DIA | View">
        <div>
          <Columns isFullWidth style={{ backgroundColor: '#015249' }}>
            {this.state.userID && this.props.userID === this.state.userID ? (
              <Column style={style.toolbar} isHidden={'mobile'}>
                <a
                  href={'.'}
                  data-tip={'Analyze Image'}
                  style={style.whiteText}
                  onClick={this.analyze}>
                  <Icon className={'fa fa-bolt fa-1x'} />
                  <Heading>ANALYZE</Heading>
                </a>
              </Column>
            ) : !this.state.userID ? (
              <Column style={style.toolbar} isHidden={'mobile'}>
                <a
                  href={'.'}
                  data-tip={'Analyze Image'}
                  style={style.whiteText}
                  onClick={this.analyze}>
                  <Icon className={'fa fa-bolt fa-1x'} />
                  <Heading>ANALYZE</Heading>
                </a>
              </Column>
            ) : (
              <div />
            )}
            {this.state.userID && this.props.userID === this.state.userID ? (
              <Column style={style.toolbar} isHidden={'mobile'}>
                <a
                  href={'.'}
                  data-tip={'Save Image'}
                  style={style.whiteText}
                  onClick={this.save}>
                  <Icon className={'fa fa-save fa-1x'} />
                  <Heading>SAVE</Heading>
                </a>
              </Column>
            ) : !this.state.userID ? (
              <Column style={style.toolbar} isHidden={'mobile'}>
                <a
                  href={'.'}
                  data-tip={'Save Image'}
                  style={style.whiteText}
                  onClick={this.save}>
                  <Icon className={'fa fa-save fa-1x'} />
                  <Heading>SAVE</Heading>
                </a>
              </Column>
            ) : (
              <div />
            )}
            {this.state.userID && this.props.userID === this.state.userID ? (
              this.state.archived ? (
                <Column style={style.toolbar} isHidden={'mobile'}>
                  <a
                    href={'.'}
                    data-value={'unarchive'}
                    data-tip={'Remove from Archive'}
                    style={style.whiteText}
                    onClick={this.openModal}>
                    <Icon className={'fa fa-plus-circle fa-1x'} />
                    <Heading>UNARCHIVE</Heading>
                  </a>
                </Column>
              ) : (
                <Column style={style.toolbar} isHidden={'mobile'}>
                  <a
                    href={'.'}
                    data-value={'archive'}
                    data-tip={'Archive Image'}
                    style={style.whiteText}
                    onClick={this.openModal}>
                    <Icon className={'fa fa-minus-circle fa-1x'} />
                    <Heading>ARCHIVE</Heading>
                  </a>
                </Column>
              )
            ) : !this.state.userID ? (
              this.state.archived ? (
                <Column style={style.toolbar} isHidden={'mobile'}>
                  <a
                    href={'.'}
                    data-value={'unarchive'}
                    data-tip={'Remove from Archive'}
                    style={style.whiteText}
                    onClick={this.openModal}>
                    <Icon className={'fa fa-plus-circle fa-1x'} />
                    <Heading>UNARCHIVE</Heading>
                  </a>
                </Column>
              ) : (
                <Column style={style.toolbar} isHidden={'mobile'}>
                  <a
                    href={'.'}
                    data-value={'archive'}
                    data-tip={'Archive Image'}
                    style={style.whiteText}
                    onClick={this.openModal}>
                    <Icon className={'fa fa-minus-circle fa-1x'} />
                    <Heading>ARCHIVE</Heading>
                  </a>
                </Column>
              )
            ) : (
              <Column style={style.toolbar} isHidden={'mobile'}>
                <Heading style={style.whiteText}>NO USER PRIVILEGES</Heading>
              </Column>
            )}
            <Column
              style={{ paddingTop: '20px', textAlign: 'center' }}
              isHidden={'desktop'}>
              {this.state.userID && this.props.userID === this.state.userID ? (
                <Button style={style.button} onClick={this.analyze}>
                  <center>
                    <Icon className={'fa fa-bolt fa-1x'} />
                    <small style={{ color: 'white' }}>ANALYZE</small>
                  </center>
                </Button>
              ) : !this.state.userID ? (
                <Button style={style.button} onClick={this.analyze}>
                  <center>
                    <Icon className={'fa fa-bolt fa-1x'} />
                    <small style={{ color: 'white' }}>ANALYZE</small>
                  </center>
                </Button>
              ) : (
                <div />
              )}
              {this.state.userID && this.props.userID === this.state.userID ? (
                <Button style={style.button} onClick={this.save}>
                  <center>
                    <Icon className={'fa fa-save fa-1x'} />
                    <small style={{ color: 'white' }}>SAVE</small>
                  </center>
                </Button>
              ) : !this.state.userID ? (
                <Button style={style.button} onClick={this.save}>
                  <center>
                    <Icon className={'fa fa-save fa-1x'} />
                    <small style={{ color: 'white' }}>SAVE</small>
                  </center>
                </Button>
              ) : (
                <div />
              )}
              {this.state.userID && this.props.userID === this.state.userID ? (
                this.state.archived ? (
                  <Button
                    data-value={'unarchive'}
                    style={style.button}
                    onClick={this.openModal}>
                    <center>
                      <Icon className={'fa fa-plus-circle fa-1x'} />
                      <small style={{ color: 'white' }}>UNARCHIVE</small>
                    </center>
                  </Button>
                ) : (
                  <Button
                    data-value={'archive'}
                    style={style.button}
                    onClick={this.openModal}>
                    <center>
                      <Icon className={'fa fa-minus-circle fa-1x'} />
                      <small style={{ color: 'white' }}>ARCHIVE</small>
                    </center>
                  </Button>
                )
              ) : !this.state.userID ? (
                this.state.archived ? (
                  <Button
                    data-value={'unarchive'}
                    style={style.button}
                    onClick={this.openModal}>
                    <center>
                      <Icon className={'fa fa-plus-circle fa-1x'} />
                      <small style={{ color: 'white' }}>UNARCHIVE</small>
                    </center>
                  </Button>
                ) : (
                  <Button
                    data-value={'archive'}
                    style={style.button}
                    onClick={this.openModal}>
                    <center>
                      <Icon className={'fa fa-minus-circle fa-1x'} />
                      <small style={{ color: 'white' }}>ARCHIVE</small>
                    </center>
                  </Button>
                )
              ) : (
                <Heading style={style.whiteText}>NO USER PRIVILEGES</Heading>
              )}
            </Column>
          </Columns>
          <div>
            <Columns isFullWidth style={{ minHeight: '40vh' }}>
              <Column
                isSize={'1/3'}
                style={{ borderRight: '2px solid #015249' }}>
                <Menu>
                  <MenuLabel style={{ marginLeft: '10px' }}>
                    Metadata
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
                            <Column isSize="1/4">Name</Column>
                            <Column isSize="3/4">
                              {this.state.userID &&
                              this.props.userID === this.state.userID ? (
                                <Input
                                  type="text"
                                  isSize="small"
                                  value={this.state.name}
                                  onChange={this.changeName}
                                />
                              ) : !this.state.userID ? (
                                <Input
                                  type="text"
                                  isSize="small"
                                  value={this.state.name}
                                  onChange={this.changeName}
                                />
                              ) : (
                                this.state.name
                              )}
                            </Column>
                          </Columns>
                        </MenuLink>
                      </li>
                      <li>
                        <MenuLink style={style.removeUnderline}>
                          <Columns>
                            <Column isSize="1/4">Camera</Column>
                            <Column isSize="3/4">
                              {this.state.userID &&
                              this.props.userID === this.state.userID ? (
                                <Input
                                  type="text"
                                  isSize="small"
                                  value={this.state.camera}
                                  onChange={this.changeCam}
                                />
                              ) : !this.state.userID ? (
                                <Input
                                  type="text"
                                  isSize="small"
                                  value={this.state.camera}
                                  onChange={this.changeCam}
                                />
                              ) : (
                                this.state.camera
                              )}
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
                              onClick={
                                this.state.userID &&
                                this.state.userID === this.props.userID
                                  ? this.changeSeason
                                  : !this.state.userID
                                    ? this.changeSeason
                                    : e => e.preventDefault()
                              }
                              isSize={'small'}
                              style={
                                this.state.season === 'WET'
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
                              onClick={
                                this.state.userID &&
                                this.state.userID === this.props.userID
                                  ? this.changeSeason
                                  : !this.state.userID
                                    ? this.changeSeason
                                    : e => e.preventDefault()
                              }
                              isSize={'small'}
                              style={
                                this.state.season === 'DRY'
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
                          onClick={this.state.userID && this.props.userID === this.state.userID ? this.switch : !this.state.userID ? this.switch : e => e.preventDefault()}>
                          <Columns>
                            <Column isSize="1/4">Private</Column>
                            <Column
                              isSize="3/4"
                              style={{ paddingLeft: '20px' }}>
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
                      <li>
                        <MenuLink style={style.removeUnderline}>
                          <Columns>
                            <Column isSize="1/4">Date</Column>
                            <Column isSize="3/4">{this.state.date}</Column>
                          </Columns>
                        </MenuLink>
                      </li>
                    </MenuList>
                  ) : (
                    <div />
                  )}
                </Menu>
              </Column>
              <Column isSize={'2/3'} style={style.imageColumn}>
                <img alt={`${this.state.name}`} src={this.state.fileURL} />
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
                  </MessageHeader>
                  <MessageBody>
                    <Menu style={{ minHeight: '35vh' }}>
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
          <ReactTooltip effect={'solid'} place={'bottom'} />
          <ArchiveModal
            {...{
              /* pass props here */
              active: this.state.archiveModalOpen,
              /* pass handlers here */
              close: this.closeModal,
              archive: this.archive
            }}
          />
          <UnarchiveModal
            {...{
              /* pass props here */
              active: this.state.unarchiveModalOpen,
              /* pass the handlers here */
              close: this.closeModal,
              unarchive: this.unarchive
            }}
          />
        </div>
      </DocumentTitle>
    );
  }
}
