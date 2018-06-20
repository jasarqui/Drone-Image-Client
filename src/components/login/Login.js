/* import React components here */
import React, { Component } from 'react';
/* import bulma components */
import {
  Box,
  Label,
  Control,
  Input,
  Field,
  Icon,
  Button,
  Image,
  Notification,
  Modal,
  ModalContent,
  ModalClose,
  ModalBackground
} from 'bloomer';
/* import assets here */
import DiaIcon from '../../assets/dia-logo-white.png';
/* import api here */
import * as API from '../../api';

/* insert styles here */
const style = {
  submit: {
    backgroundColor: 'navy',
    color: 'white',
    width: '40%',
    marginTop: '20px'
  },
  whiteText: {
    color: 'white'
  },
  noBorder: {
    paddingTop: '12px',
    border: '1px solid white',
    color: '#ff3860'
  },
  notifMargin: {
    border: '5px solid black'
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

  startLogin = e => {
    e.preventDefault();

    API.login({
      username: this.state.username,
      password: this.state.password
    })
      .then(result => {
        this.setState({ logState: 'success' });
        this.props.handleLogin();
        setTimeout(() => this.props.handleChangePage('home'), 500);
        this.props.close();
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
      <div>
        <Modal isActive={this.props.active}>
          <ModalBackground onClick={this.props.close} />
          <ModalContent>
            <Box>
              <Notification
                isColor={this.state.logState}
                style={style.notifMargin}>
                <center>
                  <Image src={DiaIcon} isSize="128x128" />
                  <p style={style.whiteText}>
                    {this.state.logState === 'info' ? (
                      'Welcome!'
                    ) : this.state.logState === 'success' ? (
                      <div>
                        <Icon className="fa fa-check-circle" />
                        {'Successfully logged in!'}
                      </div>
                    ) : this.state.logState === 'danger' ? (
                      <div>
                        <Icon className="fa fa-times-circle" />
                        {'Username and Password combination does not exist'}
                      </div>
                    ) : (
                      ''
                    )}
                  </p>
                </center>
              </Notification>
              <form>
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
                      <Button
                        style={style.submit}
                        onClick={this.startLogin}
                        type="submit">
                        LOGIN
                      </Button>
                      <Button style={style.noBorder}>
                        <Icon
                          href="."
                          onClick={this.props.close}
                          className="fa fa-times-circle fa-2x"
                        />
                      </Button>
                    </center>
                  </Control>
                </Field>
              </form>
            </Box>
          </ModalContent>
          <ModalClose onClick={this.props.close} />
        </Modal>
      </div>
    );
  }
}
