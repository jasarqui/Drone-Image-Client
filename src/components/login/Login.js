/* import React components here */
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
/* import bulma components */
import {
  Columns,
  Column,
  Box,
  Label,
  Control,
  Input,
  Field,
  Icon,
  Button,
  Image,
  Notification
} from 'bloomer';
/* import assets here */
import DiaIcon from '../../assets/dia-logo-white.png';
/* import api here */
import * as API from '../../api';

/* insert styles here */
const style = {
  bodyMargin: {
    margin: '10px',
    paddingTop: '25px'
  },
  submit: {
    backgroundColor: 'navy',
    color: 'white',
    width: '40%',
    marginTop: '20px'
  },
  whiteText: {
    color: 'white'
  },
  title: {
    fontSize: '20px'
  },
  border: {
    border: '1px solid silver'
  }
};

/* create regex here */
const alphanumRegex = /^[A-Za-z'-]+$/;
const passRegex = /^[A-Za-z0-9-_.]{6,}$/;

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      logState: 'info'
    };
  }

  inputUsername = e => {
    this.setState({ username: e.target.value });
  };

  inputPassword = e => {
    this.setState({ password: e.target.value });
  };

  startLogin = () => {
    API.login({
      username: this.state.username,
      password: this.state.password
    })
      .then(result => {
        this.setState({ logState: 'success' });
        this.props.handleLogin();
        this.props.handleChangePage('home');
      })
      .catch(error => {
        if (error.response !== undefined) {
          if (error.response.status === 404)
            this.setState({ logState: 'danger' });
        }
      });
  };

  render() {
    return (
      <DocumentTitle title="DIA | Login">
        <Columns style={style.bodyMargin}>
          <Column isSize="2/3">
            <center style={style.whiteText}>
              <Image src={DiaIcon} isSize="128x128" />
              <p style={style.title}>Drone Image Analysis</p>
            </center>
          </Column>
          {/* this is the login side */}
          <Column isSize="1/3">
            <Box>
              <Notification isColor={this.state.logState} style={style.border}>
                <center>
                  <p style={style.whiteText}>
                    {this.state.logState === 'info'
                      ? 'Welcome!'
                      : this.state.logState === 'success'
                        ? 'Successfully logged in!'
                        : this.state.logState === 'danger'
                          ? 'Username and Password combination does not exist'
                          : ''}
                  </p>
                </center>
              </Notification>
              <Field>
                <Label>Username</Label>
                <Control hasIcons="left">
                  <Input
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.inputUsername}
                  />
                  <Icon isSize="small" isAlign="left">
                    <span className="fa fa-user" aria-hidden="true" />
                  </Icon>
                </Control>
              </Field>
              <Field>
                <Label>Password</Label>
                <Control hasIcons="left">
                  <Input
                    placeholder="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.inputPassword}
                  />
                  <Icon isSize="small" isAlign="left">
                    <span className="fa fa-user-secret" aria-hidden="true" />
                  </Icon>
                </Control>
              </Field>
              <Field>
                <Control>
                  <center>
                    <Button style={style.submit} onClick={this.startLogin}>
                      LOGIN
                    </Button>
                  </center>
                </Control>
              </Field>
            </Box>
          </Column>
        </Columns>
      </DocumentTitle>
    );
  }
}
