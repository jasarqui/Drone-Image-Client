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
    color: 'white',
    width: '40%',
    marginTop: '10px'
  },
  whiteText: {
    color: 'white'
  },
  boxPadding: {
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px'
  },
  formPadding: {
    marginLeft: '10px',
    marginRight: '10px'
  },
  greenText: {
    color: '#23d160'
  },
  redText: {
    color: '#ff3860'
  },
  noText: {
    color: 'black'
  }
};

/* create regex here */
const nameRegex = /^[A-Za-z'-\s]{1,}$/;
const credRegex = /^[A-Za-z0-9-_]{6,}$/;
const passRegex = /^[A-Za-z0-9-_./\\@";:,<>()]{6,}$/;
// email regex according to General Email Regex (RFC 5322 Official Standard)
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@irri.org$/;

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
  };

  inputLastName = e => {
    this.setState({ lastname: e.target.value });
  };

  inputEmail = e => {
    this.setState({ email: e.target.value });
  };

  inputUserName = e => {
    this.setState({ username: e.target.value });
  };

  inputPassword = e => {
    this.setState({ password: e.target.value });
  };

  inputRepeatPass = e => {
    this.setState({ repeatpass: e.target.value });
  };

  changeSignupState = () => {
    /* Timeout is used to have a buffer time,
    so that the function will only check the state
    only after the values change */

    setTimeout(() => {
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
          this.state.password.match(passRegex) &&
          this.state.repeatpass.match(passRegex) &&
          this.state.password === this.state.repeatpass
          ? this.setState({ signupState: 'success' })
          : this.setState({ signupState: 'danger' })
        : this.setState({ signupState: 'info' });
    }, 50);
  };

  handleClose = e => {
    e.preventDefault();
    this.state.signupState === 'success' || 'warning'
      ? API.getUser(this.state.username).then(result => {
          result.data.data
            ? this.setState({ signupState: 'warning' })
            : API.getEmail(this.state.email).then(res => {
                res.data.data
                  ? this.setState({ signupState: 'warning' })
                  : API.signup({
                      firstname: this.state.firstname,
                      lastname: this.state.lastname,
                      email: this.state.email,
                      username: this.state.username,
                      password: this.state.password
                    }).then(result => {
                      /* set timeout is added because
                      login is faster than signing up */

                      setTimeout(() => {
                        API.login({
                          username: this.state.username,
                          password: this.state.password
                        })
                          .then(result => {
                            this.setState({ logState: 'success' });
                            this.props.changeLog(e);
                            this.props.changeUser(
                              this.state.username,
                              this.state.password
                            );
                          })
                          .then(this.props.close(e))
                          .then(result => {
                            /* reset the modal */
                            this.setState({
                              firstname: '',
                              lastname: '',
                              email: '',
                              username: '',
                              password: '',
                              repeatpass: '',
                              signupState: 'info'
                            });
                          });
                      }),
                        50;
                    });
              });
        })
      : this.props.close(e);
  };

  render() {
    return (
      <div>
        <Modal isActive={this.props.active}>
          <ModalBackground onClick={this.props.close} />
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
                    ) : this.state.signupState === 'warning' ? (
                      <span>
                        <Icon className="fa fa-times-circle" />
                        {'Account already exists!'}
                      </span>
                    ) : (
                      ''
                    )}
                  </p>
                </center>
              </Notification>
              <form
                style={style.formPadding}
                onChange={this.changeSignupState}
                onSubmit={this.handleClose}>
                <Field style={style.formPadding}>
                  <Label>
                    Name{' '}
                    <small
                      style={
                        this.state.firstname && this.state.lastname
                          ? this.state.firstname.match(nameRegex) &&
                            this.state.lastname.match(nameRegex)
                            ? style.greenText
                            : style.redText
                          : style.noText
                      }>
                      {this.state.firstname && this.state.lastname
                        ? this.state.firstname.match(nameRegex) &&
                          this.state.lastname.match(nameRegex)
                          ? 'looks good!'
                          : 'should only contain letters, spaces, dashes, and single quotes'
                        : ''}
                    </small>
                  </Label>
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
                  <Label>
                    E-mail{' '}
                    <small
                      style={
                        this.state.email
                          ? this.state.email.match(emailRegex)
                            ? style.greenText
                            : style.redText
                          : style.noText
                      }>
                      {this.state.email
                        ? this.state.email.match(emailRegex)
                          ? 'looks good!'
                          : 'should be a valid email under the IRRI domain!'
                        : ''}
                    </small>
                  </Label>
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
                  <Label>
                    Username{' '}
                    <small
                      style={
                        this.state.username
                          ? this.state.username.match(credRegex)
                            ? style.greenText
                            : style.redText
                          : style.noText
                      }>
                      {this.state.username
                        ? this.state.username.match(credRegex)
                          ? 'looks good!'
                          : 'should contain at least 6 valid characters!'
                        : ''}
                    </small>
                  </Label>
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
                  <Label>
                    Password{' '}
                    <small
                      style={
                        this.state.password
                          ? this.state.password.match(passRegex)
                            ? this.state.password === this.state.repeatpass
                              ? style.greenText
                              : style.redText
                            : style.redText
                          : style.noText
                      }>
                      {this.state.password
                        ? this.state.password.match(passRegex)
                          ? this.state.password === this.state.repeatpass
                            ? 'looks good!'
                            : 'should match!'
                          : 'should contain at least 6 valid characters!'
                        : ''}
                    </small>
                  </Label>
                  <Control hasIcons={['left', 'right']}>
                    <Input
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.inputPassword}
                      type="password"
                      isColor={
                        this.state.password
                          ? this.state.password.match(passRegex)
                            ? this.state.password === this.state.repeatpass
                              ? 'success'
                              : 'danger'
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
                          ? this.state.password.match(passRegex)
                            ? this.state.password === this.state.repeatpass
                              ? 'fa fa-check'
                              : 'fa fa-times'
                            : 'fa fa-times'
                          : 'fa fa-question'
                      }
                    />
                  </Control>
                </Field>
                <Field style={style.formPadding}>
                  <Label>
                    Repeat Password{' '}
                    <small
                      style={
                        this.state.repeatpass
                          ? this.state.repeatpass.match(passRegex)
                            ? this.state.repeatpass === this.state.password
                              ? style.greenText
                              : style.redText
                            : style.redText
                          : style.noText
                      }>
                      {this.state.repeatpass
                        ? this.state.repeatpass.match(passRegex)
                          ? this.state.repeatpass === this.state.password
                            ? 'looks good!'
                            : 'should match!'
                          : 'should contain at least 6 valid characters!'
                        : ''}
                    </small>
                  </Label>
                  <Control hasIcons={['left', 'right']}>
                    <Input
                      placeholder="Repeat Password"
                      value={this.state.repeatpass}
                      onChange={this.inputRepeatPass}
                      type="password"
                      isColor={
                        this.state.repeatpass
                          ? this.state.repeatpass.match(passRegex)
                            ? this.state.repeatpass === this.state.password
                              ? 'success'
                              : 'danger'
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
                          ? this.state.repeatpass.match(passRegex)
                            ? this.state.repeatpass === this.state.password
                              ? 'fa fa-check'
                              : 'fa fa-times'
                            : 'fa fa-times'
                          : 'fa fa-question'
                      }
                    />
                  </Control>
                </Field>
                <Control>
                  <center>
                    <Button
                      style={style.submit}
                      isColor={this.state.signupState}
                      type="submit"
                      disabled={
                        this.state.signupState === 'success' ? false : true
                      }>
                      SUBMIT
                    </Button>
                  </center>
                </Control>
              </form>
            </Box>
          </ModalContent>
          <ModalClose onClick={this.handleClose} />
        </Modal>
      </div>
    );
  }
}
