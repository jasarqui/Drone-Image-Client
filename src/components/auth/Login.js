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
  Progress,
  Columns,
  Column
} from 'bloomer';
/* import assets here */
import DiaIcon from '../../assets/dia-logo-white.png';
/* import api here */
import * as API from '../../api';

/* insert styles here */
const style = {
  marginTop: {
    marginTop: '20px',
    marginBottom: '0px'
  },
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
    width: '100%',
    marginTop: '5px'
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
    marginLeft: '20px',
    marginRight: '20px',
    textAlign: 'center'
  },
  img: {
    borderRadius: '50%',
    width: '128px',
    height: '128px',
    marginTop: '20px'
  },
  divider: {
    backgroundColor: 'silver'
  },
  info: {
    marginTop: '32px'
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      imgURL: '',
      password: '',
      logState: 'info'
    };
  }

  inputPassword = e => {
    this.setState({ password: e.target.value });
  };

  handleClose = e => {
    this.props.close(e);
  };

  startLogin = e => {
    e.preventDefault();

    API.login({
      email: this.state.email,
      password: this.state.password
    })
      .then(result => {
        this.setState({ logState: 'success' });
        this.props.changeLog();
        this.props.changeUser(
          result.data.data.firstname,
          result.data.data.lastname,
          result.data.data.id
        );

        setTimeout(() => {
          this.props.close(e);
          /* this resets the modal */
          this.setState({
            email: '',
            name: '',
            password: '',
            imgURL: '',
            logState: 'info'
          });
        }, 350);
      })
      .catch(error => {
        if (error.response !== undefined) {
          if (error.response.status === 404)
            this.setState({ logState: 'danger' });
        }
      });
  };

  responseGoogle = res => {
    /* if there was an error with loggin in */
    if (res.error && res.error !== 'popup_closed_by_user') {
      // closing the popup is considered an error, but must not show error alert
      Alert.error('Login Error.', {
        beep: false,
        position: 'top-right',
        effect: 'jelly',
        timeout: 2000
      });
    }

    /* successfully logged in */
    if (res.googleId) {
      this.setState({
        name: res.profileObj.name,
        email: res.profileObj.email,
        imgURL: res.profileObj.imageUrl
      });
    }
  };

  render() {
    return (
      <div>
        <Modal isActive={this.props.active}>
          <ModalBackground onClick={this.handleClose} />
          <ModalContent>
            <Box style={style.boxPadding}>
              <Notification isColor={this.state.logState}>
                <center>
                  <Image src={DiaIcon} isSize="128x128" />
                  <p style={style.whiteText}>
                    {this.state.logState === 'info' ? (
                      'Welcome!'
                    ) : this.state.logState === 'success' ? (
                      <span>
                        <Icon className="fa fa-check-circle" />
                        {'Successfully logged in!'}
                      </span>
                    ) : this.state.logState === 'danger' ? (
                      <span>
                        <Icon className="fa fa-times-circle" />
                        {'Username and Password combination does not exist!'}
                      </span>
                    ) : (
                      ''
                    )}
                  </p>
                </center>
              </Notification>
              <form style={style.formPadding}>
                <Progress
                  isColor={this.state.logState}
                  value={!this.state.email ? 1 : 2}
                  max={2}
                  style={style.width95}
                  isFullWidth={false}
                />
                <Columns isCentered>
                  <Column isSize="1/2">
                    <small>
                      <Label>Step 1</Label> Sign-in your Google Account
                    </small>
                    <div>
                      <img
                        alt={'userpic'}
                        src={
                          this.state.imgURL
                            ? this.state.imgURL
                            : 'https://www.iventa.eu/wp-content/uploads/2016/07/Person_Dummy.png'
                        }
                        style={style.img}
                      />
                    </div>
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
                  </Column>
                  {this.state.email ? (
                    <Column isSize="1/2">
                      <small>
                        <Label>Step 2</Label> Input your Password
                      </small>
                      <br />
                      <div style={style.info}>
                        <small>{this.state.email ? 'Log in as' : ''}</small>
                        <p>
                          <strong>{this.state.name}</strong>
                          <br />
                          <small>{this.state.email}</small>
                          <br />
                        </p>
                        <br />
                        <Field>
                          <Label>Password</Label>
                          <Control hasIcons="left">
                            <center>
                              <Input
                                placeholder="Password"
                                type="password"
                                value={this.state.password}
                                onChange={this.inputPassword}
                              />
                            </center>
                            <Icon isSize="small" isAlign="left">
                              <span
                                className="fa fa-user-secret"
                                aria-hidden="true"
                              />
                            </Icon>
                          </Control>
                        </Field>
                      </div>
                    </Column>
                  ) : (
                    <div />
                  )}
                </Columns>
                <hr style={style.divider} />
                <Button
                  style={style.submit}
                  onClick={this.startLogin}
                  type="submit"
                  disabled={
                    this.state.email && this.state.password ? false : true
                  }>
                  <small>Login</small>
                </Button>
              </form>
            </Box>
          </ModalContent>
          <ModalClose onClick={this.handleClose} />
        </Modal>
      </div>
    );
  }
}
