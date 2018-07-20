/* import React components here */
import React, { Component } from 'react';
import Alert from 'react-s-alert';
import Dropzone from 'react-dropzone';
/* import bulma components */
import {
  Button,
  Notification,
  Heading,
  Modal,
  ModalContent,
  ModalClose,
  ModalBackground,
  Columns,
  Column,
  Icon,
  Input,
  Tag
} from 'bloomer';
/* import api here */
import * as API from '../../../api';

/* insert styles here */
const style = {
  activeButton: {
    color: 'white',
    backgroundColor: '#77c9d4',
    border: '1px solid #77c9d4'
  },
  valid: {
    backgroundColor: '#57bc90',
    color: 'white',
    width: '20%',
    marginLeft: '5px'
  },
  invalid: {
    backgroundColor: '#ef6f6c',
    color: 'white',
    width: '20%',
    marginLeft: '5px'
  },
  none: {
    backgroundColor: '#77c9d4',
    color: 'white',
    width: '20%',
    marginLeft: '5px'
  },
  date: {
    backgroundColor: '#77c9d4',
    color: 'white',
    width: '20%',
    marginRight: '5px'
  },
  add: {
    borderRadius: '50%',
    color: 'white',
    backgroundColor: '#015249',
    borderColor: '#015249'
  },
  flex: {
    /* pseudo flexbox */
    display: 'flex',
    flexDirection: 'column',
    verticalAlign: 'center'
  },
  attach: {
    fontSize: '8px',
    color: '#999999'
  }
};

/* insert regex here */
/* update if reached more than year 9999 */
const yearRegex = /^[0-9]{4}$/;

export default class Archive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      season: 'WET',
      date: '',
      layout: [],
      report: '',
      uploading: false
    };
  }

  changeSeason = e => {
    e.preventDefault();
    this.setState({ season: e.currentTarget.dataset.value });
  };

  changeDate = e => {
    this.setState({ date: e.target.value });
  };

  uploadFiles = files => {
    var layoutFiles = [...this.state.layout];
    this.setState({ layout: layoutFiles.concat(files) });
  };

  removeFile = e => {
    e.preventDefault();
    var layoutFiles = [...this.state.layout];
    layoutFiles.splice(e.currentTarget.dataset.value, 1);
    this.setState({ layout: layoutFiles });
  };

  uploadReport = file => {
    /* replace original */
    this.setState({ report: file[0] });
  };

  removeReport = e => {
    e.preventDefault();
    this.setState({ report: '' });
  };

  closeModal = e => {
    /* restart modal */
    this.setState({
      season: 'WET',
      date: '',
      layout: [],
      report: '',
      uploading: false
    });
    this.props.close(e);
  };

  addFolder = e => {
    API.addFolder({ season: this.state.season, date: this.state.date })
      .then(() => {
        Alert.success('Successfully added folder.', {
          beep: false,
          position: 'top-right',
          effect: 'jelly',
          timeout: 2000
        });
        this.props.close(e);
        this.props.newFolderSearch(this.props.page);
        /* reset modal */
        this.setState({ season: 'WET', date: '2018' });
      })
      .catch(() => {
        Alert.error('Failed to add folder.', {
          beep: false,
          position: 'top-right',
          effect: 'jelly',
          timeout: 2000
        });
        this.props.close(e);
      });
  };

  render() {
    return (
      <div>
        <center>
          <Modal isActive={this.props.active}>
            <ModalBackground onClick={this.closeModal} />
            <ModalContent>
              <Notification
                style={{ width: '75%', textAlign: 'left' }}
                isHidden={'mobile'}>
                <Heading
                  style={{
                    color: '#015249',
                    fontSize: '14px',
                    marginBottom: '20px'
                  }}>
                  <strong>CREATE A NEW FOLDER</strong>
                </Heading>
                <Columns style={{ marginBottom: '0px' }}>
                  <Column isSize="1/4">Name</Column>
                  <Column isSize="3/4">
                    {this.state.season === 'WET' ? 'WS' : 'DS'}
                    {this.state.date}
                  </Column>
                </Columns>
                <Columns style={{ marginBottom: '0px' }}>
                  <Column isSize="1/4">Season</Column>
                  <Column isSize="3/4">
                    <Button
                      data-value={'WET'}
                      onClick={this.changeSeason}
                      isSize={'small'}
                      style={
                        this.state.season === 'WET' ? style.activeButton : {}
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
                        this.state.season === 'DRY' ? style.activeButton : {}
                      }>
                      <Icon
                        className={'fa fa-fire fa-1x'}
                        style={{ marginRight: '5px' }}
                      />{' '}
                      DRY
                    </Button>
                  </Column>
                </Columns>
                <Columns>
                  <Column isSize="1/4">Date</Column>
                  <Column isSize="3/4">
                    <Input
                      isSize="small"
                      type="text"
                      placeholder="YYYY"
                      value={this.state.date}
                      onChange={this.changeDate}
                      style={{ width: '75%' }}
                    />
                    <Tag
                      style={
                        this.state.date
                          ? this.state.date.match(yearRegex)
                            ? style.valid
                            : style.invalid
                          : style.none
                      }>
                      {this.state.date
                        ? this.state.date.match(yearRegex)
                          ? 'Valid'
                          : 'Invalid'
                        : 'Required'}
                    </Tag>
                  </Column>
                </Columns>
                <Columns>
                  <Column isSize="1/4">Report</Column>
                  <Column isSize="3/4">
                    {this.state.report ? (
                      <p>
                        {this.state.report.name}
                        <a href="." onClick={this.removeReport}>
                          <Icon
                            style={{ textDecoration: 'none', color: '#999999' }}
                            className={'fa fa-times-circle fa-1x'}
                          />
                        </a>
                      </p>
                    ) : (
                      <p />
                    )}
                    <Dropzone
                      multiple={true}
                      onDrop={this.uploadReport}
                      style={{ ...style.flex, width: '100%' }}>
                      <small style={style.attach}>
                        <a
                          href={'.'}
                          style={{ textDecoration: 'none', fontSize: '15px' }}
                          onClick={e => e.preventDefault()}>
                          <Icon
                            style={{ float: 'left', marginTop: '0px' }}
                            className={'fa fa-paperclip fa-1x'}
                          />
                          {this.state.report ? 'Edit ' : 'Insert '}attachment
                        </a>
                      </small>
                    </Dropzone>
                  </Column>
                </Columns>
                <Columns>
                  <Column isSize="1/4">Layout</Column>
                  <Column isSize="3/4">
                    {this.state.layout.map((file, index) => {
                      return (
                        <p key={index}>
                          <small>
                            {file.name}
                            <a
                              data-value={index}
                              href="."
                              onClick={this.removeFile}
                              style={{
                                textDecoration: 'none',
                                color: '#999999'
                              }}>
                              <Icon className={'fa fa-times-circle fa-1x'} />
                            </a>
                          </small>
                        </p>
                      );
                    })}
                    <Dropzone
                      multiple={true}
                      onDrop={this.uploadFiles}
                      style={{ ...style.flex, width: '100%' }}>
                      <small style={style.attach}>
                        <a
                          href={'.'}
                          style={{ textDecoration: 'none', fontSize: '15px' }}
                          onClick={e => e.preventDefault()}>
                          <Icon
                            style={{ float: 'left', marginTop: '0px' }}
                            className={'fa fa-paperclip fa-1x'}
                          />
                          Insert attachments
                        </a>
                      </small>
                    </Dropzone>
                  </Column>
                </Columns>
                {this.state.date.match(yearRegex) ? (
                  <Button
                    isSize="large"
                    style={{
                      ...style.add,
                      float: 'right'
                    }}
                    onClick={this.addFolder}>
                    <Icon className={'fa fa-plus fa-1x'} />
                  </Button>
                ) : (
                  <Button
                    isSize="large"
                    style={{
                      ...style.add,
                      float: 'right',
                      cursor: 'not-allowed'
                    }}
                    onClick={e => e.preventDefault()}>
                    <Icon className={'fa fa-ban fa-1x'} />
                  </Button>
                )}
              </Notification>
              <Notification isHidden={'desktop'}>
                <Heading
                  style={{
                    color: '#015249',
                    fontSize: '14px',
                    marginBottom: '20px'
                  }}>
                  <strong>CREATE A NEW FOLDER</strong>
                </Heading>
                <p style={{ margin: '10px 0px 10px 0px' }}>
                  <strong>Name:</strong>
                  {'  '}
                  <small>
                    {this.state.season === 'WET' ? 'WS' : 'DS'}
                    {this.state.date}
                  </small>
                </p>
                <Button
                  data-value={'WET'}
                  onClick={this.changeSeason}
                  isSize={'small'}
                  style={this.state.season === 'WET' ? style.activeButton : {}}>
                  <Icon
                    className={'fa fa-umbrella fa-1x'}
                    style={{ marginRight: '5px' }}
                  />{' '}
                  WET SEASON
                </Button>
                <Button
                  data-value={'DRY'}
                  onClick={this.changeSeason}
                  isSize={'small'}
                  style={this.state.season === 'DRY' ? style.activeButton : {}}>
                  <Icon
                    className={'fa fa-fire fa-1x'}
                    style={{ marginRight: '5px' }}
                  />{' '}
                  DRY SEASON
                </Button>
                <Columns style={{ marginTop: '2px' }}>
                  <Column>
                    <Tag style={style.date}>Date</Tag>
                    <Input
                      style={{ width: '40%' }}
                      isSize="small"
                      type="text"
                      placeholder="YYYY"
                      value={this.state.date}
                      onChange={this.changeDate}
                    />
                    <Tag
                      style={
                        this.state.date
                          ? this.state.date.match(yearRegex)
                            ? style.valid
                            : style.invalid
                          : style.none
                      }>
                      {this.state.date
                        ? this.state.date.match(yearRegex)
                          ? 'Valid'
                          : 'Invalid'
                        : 'Required'}
                    </Tag>
                  </Column>
                </Columns>
                <Columns>
                  <Column>
                    <p>
                      <strong>Report</strong>
                    </p>
                    <p>
                      <small>
                        {this.state.report.name}
                        {this.state.report.name ? (
                          <a
                            href="."
                            onClick={this.removeReport}
                            style={{
                              textDecoration: 'none',
                              color: '#999999'
                            }}>
                            <Icon className={'fa fa-times-circle fa-1x'} />
                          </a>
                        ) : (
                          <small />
                        )}
                      </small>
                    </p>
                    <Dropzone
                      multiple={true}
                      onDrop={this.uploadReport}
                      style={{ ...style.flex, width: '50%' }}>
                      <small style={style.attach}>
                        <a
                          href={'.'}
                          style={{ textDecoration: 'none', fontSize: '15px' }}
                          onClick={e => e.preventDefault()}>
                          <Icon
                            style={{ float: 'left', marginTop: '0px' }}
                            className={'fa fa-paperclip fa-1x'}
                          />
                          {this.state.report ? 'Edit ' : 'Insert '}attachment
                        </a>
                      </small>
                    </Dropzone>
                  </Column>
                </Columns>
                <Columns>
                  <Column>
                    <p>
                      <strong>Layout</strong>
                    </p>
                    {this.state.layout.map((file, index) => {
                      return (
                        <p key={index}>
                          <small>
                            {file.name}
                            <a
                              data-value={index}
                              href="."
                              onClick={this.removeFile}
                              style={{
                                textDecoration: 'none',
                                color: '#999999'
                              }}>
                              <Icon className={'fa fa-times-circle fa-1x'} />
                            </a>
                          </small>
                        </p>
                      );
                    })}
                    <Dropzone
                      multiple={true}
                      onDrop={this.uploadFiles}
                      style={{ ...style.flex, width: '50%' }}>
                      <small style={style.attach}>
                        <a
                          href={'.'}
                          style={{ textDecoration: 'none', fontSize: '15px' }}
                          onClick={e => e.preventDefault()}>
                          <Icon
                            style={{ float: 'left', marginTop: '0px' }}
                            className={'fa fa-paperclip fa-1x'}
                          />
                          Insert attachments
                        </a>
                      </small>
                    </Dropzone>
                  </Column>
                </Columns>
                <center>
                  {this.state.date.match(yearRegex) ? (
                    <Button
                      isSize="large"
                      style={{
                        ...style.add
                      }}
                      onClick={this.addFolder}>
                      <Icon className={'fa fa-plus fa-1x'} />
                    </Button>
                  ) : (
                    <Button
                      isSize="large"
                      style={{
                        ...style.add,
                        cursor: 'not-allowed'
                      }}
                      onClick={e => e.preventDefault()}>
                      <Icon className={'fa fa-ban fa-1x'} />
                    </Button>
                  )}
                </center>
              </Notification>
            </ModalContent>
            <ModalClose onClick={this.closeModal} />
          </Modal>
        </center>
      </div>
    );
  }
}
