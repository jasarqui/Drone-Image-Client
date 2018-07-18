/* import React components here */
import React, { Component } from 'react';
import Alert from 'react-s-alert';
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
  add: {
    borderRadius: '50%',
    color: 'white',
    backgroundColor: '#015249',
    borderColor: '#015249'
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
      date: '2018'
    };
  }

  changeSeason = e => {
    e.preventDefault();
    this.setState({ season: e.currentTarget.dataset.value });
  };

  changeDate = e => {
    this.setState({ date: e.target.value });
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
            <ModalBackground onClick={this.props.close} />
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
                      placeholder="Date"
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
                      WET SEASON
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
                      DRY SEASON
                    </Button>
                  </Column>
                </Columns>
                <Columns>
                  <Column isSize="1/4">Date</Column>
                  <Column isSize="3/4">
                    <Input
                      isSize="small"
                      type="text"
                      placeholder="Date"
                      value={this.state.date}
                      onChange={this.changeDate}
                    />
                  </Column>
                  <Column isSize="1/4">
                    <center>
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
                    </center>
                  </Column>
                </Columns>
                <center>
                  <Button
                    disabled={this.state.date.match(yearRegex) ? false : true}
                    style={style.add}>
                    CREATE
                  </Button>
                </center>
              </Notification>
            </ModalContent>
            <ModalClose onClick={this.props.close} />
          </Modal>
        </center>
      </div>
    );
  }
}
