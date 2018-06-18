import React, { Component } from 'react';
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
  Button
} from 'bloomer';

/* insert styles here */
const style = {
  bodyMargin: {
    margin: '10px'
  },
  loginText: {
    color: 'navy',
    fontSize: '25px',
    fontWeight: 'bold'
  },
  submit: {
    backgroundColor: '#07393C',
    color: 'white',
    width: '40%',
    marginTop: '20px'
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  inputUsername = e => {
    this.setState({ username: e.target.value });
  };

  inputPassword = e => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <Columns style={style.bodyMargin}>
        <Column isSize="2/3">
          <Box>Hello!</Box>
        </Column>
        {/* this is the login side */}
        <Column isSize="1/3">
          <Box>
            <center style={style.loginText}>LOGIN</center>
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
                  <Button style={style.submit}>LOGIN</Button>
                </center>
              </Control>
            </Field>
          </Box>
        </Column>
      </Columns>
    );
  }
}
