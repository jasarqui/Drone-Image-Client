import React, { Component } from 'react';

/* import <Component> from '../features/<component>/<filename>'*/
import Navbar from '../components/access/Navbar';
import Homepage from '../components/home/Homepage';
import Login from '../components/login/Login';
import Signup from '../components/signup/Signup';
import AnalyzeTab from '../components/analysis/AnalyzeTab';
import PageNotExist from '../components/error/PageNotExist';

/* import assets here */
import '../assets/index.css';

/* This is where we will handle page redirection */
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      /* pages: home, login, signup */
      activePage: 'home',
      loggedIn: false
    };
  }

  handleLogin = () => {
    this.setState({ loggedIn: !this.state.loggedIn });
  };

  handleChangePage = e => {
    console.log(e);
    console.log(e.currentTarget);
    console.log(e.currentTarget.value);
    this.setState({ activePage: e.currentTarget.value });
    e.preventDefault();
  };

  render() {
    return (
      <div className="app">
        <Navbar
          {...{
            /* pass the props here */
            activePage: this.state.activePage,
            loggedIn: this.state.loggedIn,
            /* pass the handlers here */
            handleLogin: this.handleLogin,
            handleChangePage: this.handleChangePage
          }}
        />
        {this.state.activePage === 'home' ? (
          <Homepage />
        ) : this.state.activePage === 'login' ? (
          <Login />
        ) : this.state.activePage === 'signup' ? (
          <Signup />
        ) : (
          <PageNotExist />
        )}
      </div>
    );
  }
}
