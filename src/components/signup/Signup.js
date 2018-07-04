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
  Columns,
  Progress,
  Container
} from 'bloomer';
/* import assets here */
import DiaIcon from '../../assets/dia-logo-white.png';
/* import api here */
import * as API from '../../api';

/* insert styles here */
const style = {
  googleSubmit: {
    backgroundColor: 'navy',
    height: '35px',
    borderRadius: '3px',
    border: '1px solid navy',
    cursor: 'pointer',
    width: '50%'
  },
  googleInfo: {
    margin: '20px 0px 20px 0px'
  },
  img: {
    borderRadius: '50%',
    width: '128px',
    height: '128px'
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
  width95: {
    width: '95%',
    margin: 'auto'
  },
  centerElements: {
    textAlign: 'center'
  },
  divider: {
    backgroundColor: 'silver'
  },
  greenText: {
    color: '#23d160'
  },
  redText: {
    color: '#ff3860'
  }
};

/* create regex here */
const passRegex = /^[A-Za-z0-9-_./\\@";:,<>()]{6,}$/;
// email regex according to General Email Regex (RFC 5322 Official Standard)
// changed to accept emails under IRRI domain only
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@irri.org$/;

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /* these are collected from google */
      firstname: '',
      lastname: '',
      email: '',
      imgURL: '',
      /* these are for user input */
      password: '',
      repeatpass: '',
      /* these are flags */
      signupState: 'info',
      currentCard: 0
    };
  }

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
      this.state.password && this.state.repeatpass
        ? this.state.password.match(passRegex) &&
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
      if (response.profileObj.email) {
        this.setState({
          firstname: response.profileObj.givenName,
          lastname: response.profileObj.familyName,
          email: response.profileObj.email,
          imgURL: response.profileObj.imageUrl
        });
        this.setState({ signupState: 'success' });
      } else {
        this.setState({ signupState: 'danger' });
        Alert.warning('Must be under IRRI domain.', {
          beep: false,
          position: 'top-right',
          effect: 'jelly',
          timeout: 2000
        });
      }
    }
  };

  closeModal = () => {
    if (!this.state.password && !this.state.repeatpass) {
      this.setState({ signupState: 'info' });
    }
    this.props.close();
  };

  backButton = e => {
    e.preventDefault();
    if (this.state.currentCard === 0) {
      this.closeModal();
    } else if (this.state.currentCard === 1) {
      this.setState({ currentCard: 0, signupState: 'success' });
    }
  };

  nextButton = e => {
    e.preventDefault();
    if (this.state.currentCard === 0) {
      this.setState({
        currentCard: 1,
        signupState:
          this.state.password || this.state.repeatpass
            ? this.state.password.match(passRegex) ||
              this.state.repeatpass.match(passRegex)
              ? this.state.password === this.state.repeatpass
                ? 'success'
                : 'danger'
              : 'danger'
            : 'info'
      });
    } else if (this.state.currentCard === 1) {
      this.signup(
        this.state.firstname,
        this.state.lastname,
        this.state.email,
        this.state.password
      );
    }
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
              {this.state.currentCard === 0 ? (
                <Container isFluid style={style.centerElements}>
                  <Progress
                    isColor="info"
                    value={1}
                    max={2}
                    style={style.width95}
                    isFullWidth={false}
                  />
                  <center>
                    <Label>
                      Step 1: <small>Sign in with your Google Account</small>
                    </Label>
                    <Container style={style.googleInfo} isFluid>
                      <img
                        alt={'userpic'}
                        src={
                          this.state.imgURL
                            ? this.state.imgURL
                            : 'https://www.iventa.eu/wp-content/uploads/2016/07/Person_Dummy.png'
                        }
                        style={style.img}
                      />
                      {this.state.email ? (
                        <span>
                          <p>
                            <strong>
                              {this.state.firstname + ' ' + this.state.lastname}
                            </strong>
                            <br />
                            <small>{this.state.email}</small>
                            <br />
                          </p>
                        </span>
                      ) : (
                        <div />
                      )}
                    </Container>
                    <GoogleLogin
                      style={style.googleSubmit}
                      clientId="224633775911-d2hav5ep4grlovqrqc4ugtgtqaiub07g.apps.googleusercontent.com"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                      redirectUri={'localhost:3000'}
                      buttonText={
                        <span style={style.whiteText}>
                          <Icon className={'fa fa-google'} />Sign-in with Google
                        </span>
                      }
                    />
                  </center>
                </Container>
              ) : (
                <Container isFluid>
                  <Progress
                    isColor="info"
                    value={2}
                    max={2}
                    style={style.width95}
                    isFullWidth={false}
                  />
                  <center>
                    <Label>
                      Step 2: <small>Choose a Password for your account</small>
                    </Label>
                    <Container style={style.googleInfo} isFluid>
                      <form
                        style={style.formPadding}
                        onChange={this.changeSignupState}
                        onSubmit={this.handleSubmit}>
                        <Field style={style.formPadding}>
                          <Label>
                            Password{' '}
                            <small
                              style={
                                this.state.password
                                  ? this.state.password.match(passRegex)
                                    ? this.state.password ===
                                      this.state.repeatpass
                                      ? style.greenText
                                      : style.redText
                                    : style.redText
                                  : style.noText
                              }>
                              {this.state.password
                                ? this.state.password.match(passRegex)
                                  ? this.state.password ===
                                    this.state.repeatpass
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
                                    ? this.state.password ===
                                      this.state.repeatpass
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
                                    ? this.state.password ===
                                      this.state.repeatpass
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
                                    ? this.state.repeatpass ===
                                      this.state.password
                                      ? style.greenText
                                      : style.redText
                                    : style.redText
                                  : style.noText
                              }>
                              {this.state.repeatpass
                                ? this.state.repeatpass.match(passRegex)
                                  ? this.state.repeatpass ===
                                    this.state.password
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
                                    ? this.state.repeatpass ===
                                      this.state.password
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
                                    ? this.state.repeatpass ===
                                      this.state.password
                                      ? 'fa fa-check'
                                      : 'fa fa-times'
                                    : 'fa fa-times'
                                  : 'fa fa-question'
                              }
                            />
                          </Control>
                        </Field>
                      </form>
                    </Container>
                  </center>
                </Container>
              )}
              <Container style={style.width95}>
                <hr style={style.divider} />
                <Columns>
                  <Column isSize="1/2">
                    <Button
                      isColor={'info'}
                      isFullWidth
                      onClick={this.backButton}>
                      {this.state.currentCard === 0 ? 'Cancel' : 'Back'}
                    </Button>
                  </Column>
                  <Column isSize="1/2">
                    <Button
                      isColor={'info'}
                      isFullWidth
                      disabled={
                        this.state.currentCard === 0
                          ? this.state.email
                            ? false
                            : true
                          : this.state.password.match(passRegex) &&
                            this.state.repeatpass.match(passRegex) &&
                            this.state.password === this.state.repeatpass
                            ? false
                            : true
                      }
                      onClick={this.nextButton}>
                      {this.state.currentCard === 0 ? 'Confirm' : 'Signup'}
                    </Button>
                  </Column>
                </Columns>
              </Container>
            </Box>
          </ModalContent>
          <ModalClose onClick={this.closeModal} />
        </Modal>
      </div>
    );
  }
}
