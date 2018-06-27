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
  ModalBackground,
  Column,
  Columns
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
  boxPadding: {
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px'
  },
  formPadding: {
    marginLeft: '10px',
    marginRight: '10px'
  }
};

/* create regex here */
const nameRegex = /[A-Za-z'-\s]{1,}/;
const credRegex = /[A-Za-z-_]{6,}/;
// email regex according to General Email Regex (RFC 5322 Official Standard)
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@irri.org$/;

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      repeatpass: '',
      signupState: 'info'
    };
  }

  inputFirstName = e => {
    this.setState({ firstname: e.target.value });
    this.changeSignupState();
  };

  inputLastName = e => {
    this.setState({ lastname: e.target.value });
    this.changeSignupState();
  };

  inputEmail = e => {
    this.setState({ email: e.target.value });
    this.changeSignupState();
  };

  inputUserName = e => {
    this.setState({ username: e.target.value });
    this.changeSignupState();
  };

  inputPassword = e => {
    this.setState({ password: e.target.value });
    this.changeSignupState();
  };

  inputRepeatPass = e => {
    this.setState({ repeatpass: e.target.value });
    this.changeSignupState();
  };

  changeSignupState = () => {
    this.state.firstname &&
    this.state.lastname &&
    this.state.email &&
    this.state.username &&
    this.state.password &&
    this.state.repeatpass
      ? this.state.firstname.match(nameRegex) &&
        this.state.lastname.match(nameRegex) &&
        this.state.email.match(emailRegex) &&
        this.state.username.match(credRegex) &&
        this.state.password.match(credRegex) &&
        this.state.repeatpass.match(credRegex)
        ? this.setState({ signupState: 'success' })
        : this.setState({ signupState: 'danger' })
      : this.setState({ signupState: 'info' });
  };

  handleClose = e => {
    this.props.close(e);
  };

  render() {
    return (
      <div>
        <Modal isActive={this.props.active}>
          <ModalBackground onClick={this.handleClose} />
          <ModalContent>
            <Box style={style.boxPadding}>
              <Notification isColor={this.state.signupState}>
                <center>
                  <Image src={DiaIcon} isSize="128x128" />
                  <p style={style.whiteText}>
                    {this.state.signupState === 'info' ? (
                      'Welcome!'
                    ) : this.state.signupState === 'success' ? (
                      <span>
                        <Icon className="fa fa-check-circle" />
                        {'Account information is valid!'}
                      </span>
                    ) : this.state.signupState === 'danger' ? (
                      <span>
                        <Icon className="fa fa-times-circle" />
                        {'Account information is invalid!'}
                      </span>
                    ) : (
                      ''
                    )}
                  </p>
                </center>
              </Notification>
              <form style={style.formPadding}>
                <Field style={style.formPadding}>
                  <Label>Name</Label>
                  <Columns>
                    <Column isSize="1/2">
                      <Control hasIcons={['left', 'right']}>
                        <Input
                          placeholder="First name"
                          value={this.state.firstname}
                          onChange={this.inputFirstName}
                          isColor={
                            this.state.firstname
                              ? this.state.firstname.match(nameRegex)
                                ? 'success'
                                : 'danger'
                              : 'light'
                          }
                        />
                        <Icon
                          isSize="small"
                          isAlign="left"
                          className="fa fa-id-card"
                        />
                        <Icon
                          isSize="small"
                          isAlign="right"
                          className={
                            this.state.firstname
                              ? this.state.firstname.match(nameRegex)
                                ? 'fa fa-check'
                                : 'fa fa-times'
                              : 'fa fa-question'
                          }
                        />
                      </Control>
                    </Column>
                    <Column isSize="1/2">
                      <Control hasIcons={['left', 'right']}>
                        <Input
                          placeholder="Last name"
                          value={this.state.lastname}
                          onChange={this.inputLastName}
                          isColor={
                            this.state.lastname
                              ? this.state.lastname.match(nameRegex)
                                ? 'success'
                                : 'danger'
                              : 'light'
                          }
                        />
                        <Icon
                          isSize="small"
                          isAlign="left"
                          className="fa fa-id-card"
                        />
                        <Icon
                          isSize="small"
                          isAlign="right"
                          className={
                            this.state.lastname
                              ? this.state.lastname.match(nameRegex)
                                ? 'fa fa-check'
                                : 'fa fa-times'
                              : 'fa fa-question'
                          }
                        />
                      </Control>
                    </Column>
                  </Columns>
                </Field>
                <Field style={style.formPadding}>
                  <Label>E-mail</Label>
                  <Control hasIcons={['left', 'right']}>
                    <Input
                      placeholder="Email Address"
                      value={this.state.email}
                      onChange={this.inputEmail}
                      isColor={
                        this.state.email
                          ? this.state.email.match(emailRegex)
                            ? 'success'
                            : 'danger'
                          : 'light'
                      }
                    />
                    <Icon
                      isSize="small"
                      isAlign="left"
                      className="fa fa-envelope"
                    />
                    <Icon
                      isSize="small"
                      isAlign="right"
                      className={
                        this.state.email
                          ? this.state.email.match(emailRegex)
                            ? 'fa fa-check'
                            : 'fa fa-times'
                          : 'fa fa-question'
                      }
                    />
                  </Control>
                </Field>
                <Field style={style.formPadding}>
                  <Label>Username</Label>
                  <Control hasIcons={['left', 'right']}>
                    <Input
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.inputUserName}
                      isColor={
                        this.state.username
                          ? this.state.username.match(credRegex)
                            ? 'success'
                            : 'danger'
                          : 'light'
                      }
                    />
                    <Icon
                      isSize="small"
                      isAlign="left"
                      className="fa fa-user"
                    />
                    <Icon
                      isSize="small"
                      isAlign="right"
                      className={
                        this.state.username
                          ? this.state.username.match(credRegex)
                            ? 'fa fa-check'
                            : 'fa fa-times'
                          : 'fa fa-question'
                      }
                    />
                  </Control>
                </Field>
                <Field style={style.formPadding}>
                  <Label>Password</Label>
                  <Control hasIcons={['left', 'right']}>
                    <Input
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.inputPassword}
                      type="password"
                      isColor={
                        this.state.password
                          ? this.state.password.match(credRegex)
                            ? 'success'
                            : 'danger'
                          : 'light'
                      }
                    />
                    <Icon
                      isSize="small"
                      isAlign="left"
                      className="fa fa-user-secret"
                    />
                    <Icon
                      isSize="small"
                      isAlign="right"
                      className={
                        this.state.password
                          ? this.state.password.match(credRegex)
                            ? 'fa fa-check'
                            : 'fa fa-times'
                          : 'fa fa-question'
                      }
                    />
                  </Control>
                </Field>
                <Field style={style.formPadding}>
                  <Label>Repeat Password</Label>
                  <Control hasIcons={['left', 'right']}>
                    <Input
                      placeholder="Repeat Password"
                      value={this.state.repeatpass}
                      onChange={this.inputRepeatPass}
                      type="password"
                      isColor={
                        this.state.repeatpass
                          ? this.state.repeatpass.match(credRegex)
                            ? 'success'
                            : 'danger'
                          : 'light'
                      }
                    />
                    <Icon
                      isSize="small"
                      isAlign="left"
                      className="fa fa-user-secret"
                    />
                    <Icon
                      isSize="small"
                      isAlign="right"
                      className={
                        this.state.repeatpass
                          ? this.state.repeatpass.match(credRegex)
                            ? 'fa fa-check'
                            : 'fa fa-times'
                          : 'fa fa-question'
                      }
                    />
                  </Control>
                </Field>
              </form>
            </Box>
          </ModalContent>
          <ModalClose onClick={this.handleClose} />
        </Modal>
      </div>
    );
  }
}
