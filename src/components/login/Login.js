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
  Notification,
  Title
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
  border: {
    border: '1px solid silver'
  },
  infoBox: {
    marginTop: '25px',
    backgroundColor: '#0a090c',
    border: '1px solid white',
    color: 'white'
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
            <Column isVertical>
              <center style={style.whiteText}>
                <Image src={DiaIcon} isSize="128x128" />
                <Title isSize={5} style={style.whiteText}>
                  Drone Image Analysis
                </Title>
              </center>
            </Column>
            <Column>
              <Box style={style.infoBox}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur sodales eu risus quis ultrices. Donec facilisis neque
                ac enim pellentesque, et interdum libero mollis. Morbi ac
                scelerisque massa, id mattis quam. Nam vitae ante massa. Nulla
                pulvinar ante nunc, nec gravida turpis tristique sit amet. Donec
                sodales pellentesque diam. Integer porttitor metus a justo
                efficitur convallis. Cras felis nibh, ullamcorper ac facilisis
                et, tempus sed magna. Phasellus maximus mollis efficitur.
                Praesent id justo ipsum. Duis interdum neque sed orci euismod,
                in gravida arcu tempus.
              </Box>
            </Column>
          </Column>
          {/* this is the login side */}
          <Column isSize="1/3">
            <Box>
              <Notification isColor={this.state.logState} style={style.border}>
                <center>
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
                    </center>
                  </Control>
                </Field>
              </form>
            </Box>
          </Column>
        </Columns>
      </DocumentTitle>
    );
  }
}
