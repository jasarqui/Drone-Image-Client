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
  Icon
} from 'bloomer';
/* import api here */
import * as API from '../../../api';

/* insert styles here */
const style = {
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

export default class Files extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layout: [],
      report: '',
      uploading: false
    };
  }

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
    e.preventDefault();
    /* restart modal */
    this.setState({
      layout: [],
      report: '',
      uploading: false
    });
    this.props.close();
  };

  editFolder = () => {
    API.editFiles({
      layout: this.state.layout,
      report: this.state.report,
      id: this.props.folder_id
    })
      .then(() => {
        Alert.success('Successfully edited folder.', {
          beep: false,
          position: 'top-right',
          effect: 'jelly',
          timeout: 2000
        });
        this.props.close();
      })
      .catch(() => {
        Alert.error('Failed to edit folder.', {
          beep: false,
          position: 'top-right',
          effect: 'jelly',
          timeout: 2000
        });
      });
  };

  /* when modal opens */
  componentWillReceiveProps(nextProps) {
    if (nextProps.folder_id && nextProps.active) {
      API.getFolder({ id: nextProps.folder_id }).then(result => {
        this.setState({
          layout: result.data.data.layout ? result.data.data.layout : [],
          report: result.data.data.report
        });
      });
    }
  }

  render() {
    return (
      <div>
        <center>
          <Modal isActive={this.props.active}>
            <ModalBackground data-value={'edit'} onClick={this.closeModal} />
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
                  <strong>REPORT AND LAYOUT FILES</strong>
                </Heading>
                <Columns>
                  <Column isSize="1/4">Report</Column>
                  <Column isSize="3/4">
                    {this.state.report ? (
                      <small>
                        <p>
                          {this.state.report.name}
                          <a
                            href="."
                            onClick={this.removeReport}
                            style={{
                              textDecoration: 'none',
                              color: '#999999'
                            }}>
                            <Icon className={'fa fa-times-circle fa-1x'} />
                          </a>
                        </p>
                      </small>
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
                <Button
                  isSize="large"
                  style={{
                    ...style.add,
                    float: 'right'
                  }}
                  onClick={this.editFolder}>
                  <Icon className={'fa fa-edit fa-1x'} />
                </Button>
              </Notification>
              <Notification isHidden={'desktop'}>
                <Heading
                  style={{
                    color: '#015249',
                    fontSize: '14px',
                    marginBottom: '20px'
                  }}>
                  <strong>REPORT AND LAYOUT FILES</strong>
                </Heading>
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
                  <Button
                    isSize="large"
                    style={{
                      ...style.add
                    }}
                    onClick={this.editFolder}>
                    <Icon className={'fa fa-edit fa-1x'} />
                  </Button>
                </center>
              </Notification>
            </ModalContent>
            <ModalClose data-value={'edit'} onClick={this.closeModal} />
          </Modal>
        </center>
      </div>
    );
  }
}
