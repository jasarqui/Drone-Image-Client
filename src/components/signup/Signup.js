/* import React components here */
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import Alert from 'react-s-alert';
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
    width: '100%',
    height: '35px',
    borderRadius: '3px',
    border: '1px solid navy'
  },
  googleSubmit: {
    backgroundColor: 'navy',
    height: '35px',
    borderRadius: '3px',
    border: '1px solid navy',
    cursor: 'pointer',
    width: '100%'
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
  },
  buttons: {
    width: '90%'
  }
};

/* create regex here */
const nameRegex = /^[A-Za-z'-\s]{1,}$/;
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
      this.state.password &&
      this.state.repeatpass
        ? this.state.firstname.match(nameRegex) &&
          this.state.lastname.match(nameRegex) &&
          this.state.email.match(emailRegex) &&
          this.state.password.match(passRegex) &&
          this.state.repeatpass.match(passRegex) &&
          this.state.password === this.state.repeatpass
          ? this.setState({ signupState: 'success' })
          : this.setState({ signupState: 'danger' })
        : this.setState({ signupState: 'info' });
    }, 50);
  };

  signup = (firstname, lastname, email, password) => {
    API.signup({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    }).then(() => {
      /* set timeout is added because
      login is faster than signing up */

      setTimeout(() => {
        API.login({
          email: email,
          password: password
        })
          .then(res => {
            this.setState({ logState: 'success' });
            this.props.changeLog();
            this.props.changeUser(firstname, lastname, res.data.data.id);
          })
          .then(() => {
            this.props.close();
            /* reset the modal */
            this.setState({
              firstname: '',
              lastname: '',
              email: '',
              password: '',
              repeatpass: '',
              signupState: 'info'
            });
          });
      }),
        50;
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.state.signupState === 'success' || 'warning'
      ? API.getEmail(this.state.email).then(res => {
          res.data.data
            ? this.setState({ signupState: 'warning' })
            : this.signup(
                this.state.firstname,
                this.state.lastname,
                this.state.email,
                this.state.password
              );
        })
      : this.props.close();
  };

  responseGoogle = response => {
    /* if there was an error with loggin in */
    if (response.error && response.error !== 'popup_closed_by_user') {
      // closing the popup is considered an error, but must not show error alert
      Alert.error('Login Error.', {
        beep: false,
        position: 'top-right',
        effect: 'jelly',
        timeout: 2000
      });
    }

    /* successfully logged in */
    if (response.googleId) {
      if (response.profileObj.email.match(emailRegex)) {
        API.getEmail(response.profileObj.email).then(res => {
          res.data.data
            ? this.setState({ signupState: 'warning' })
            : this.signup(
                response.profileObj.givenName,
                response.profileObj.familyName,
                response.profileObj.email,
                response.profileObj.googleId
              );
        });
      } else {
        this.setState({ signupState: 'danger' });
        Alert.error('Must be under IRRI domain.', {
          beep: false,
          position: 'top',
          effect: 'jelly',
          timeout: 2000
        });
      }
    }
  };

  closeModal = () => {
    if (
      !this.state.firstname &&
      !this.state.lastname &&
      !this.state.email &&
      !this.state.password &&
      !this.state.repeatpass
    ) {
      this.setState({ signupState: 'info' });
    }
    this.props.close();
  };

  render() {
    return (
      <div>
        <Modal isActive={this.props.active}>
          <ModalBackground onClick={this.closeModal} />
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
                onSubmit={this.handleSubmit}>
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
                    <Columns style={style.buttons}>
                      <Column isSize="1/2">
                        <Button
                          style={style.submit}
                          type="submit"
                          disabled={
                            this.state.signupState === 'success' ? false : true
                          }>
                          <small>Submit</small>
                        </Button>
                      </Column>
                      <Column isSize="1/2">
                        <GoogleLogin
                          style={style.googleSubmit}
                          clientId="224633775911-d2hav5ep4grlovqrqc4ugtgtqaiub07g.apps.googleusercontent.com"
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                          redirectUri={'localhost:3000'}
                          buttonText={
                            <span style={style.whiteText}>
                              <Icon className={'fa fa-google'} />Signup with
                              Google
                            </span>
                          }
                        />
                      </Column>
                    </Columns>
                  </center>
                </Control>
              </form>
            </Box>
          </ModalContent>
          <ModalClose onClick={this.closeModal} />
        </Modal>
      </div>
    );
  }
}
