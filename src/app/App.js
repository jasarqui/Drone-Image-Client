import React, { Component } from 'react';

/* import <Component> from '../features/<component>/<filename>'*/
import Navbar from '../components/access/Navbar';
import Homepage from '../components/home/Homepage';
import Browse from '../components/browse/Browse';
import Analyze from '../components/analysis/Analyze';
import PageNotExist from '../components/error/PageNotExist';

/* import assets here */
import '../assets/index.css';

/* This is where we will handle page redirection */
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      /* pages: home, browse, analyze */
      activePage: 'home',
      loggedIn: false,
      username: ''
    };
  }

  handleLogin = () => {
    this.setState({ loggedIn: !this.state.loggedIn });
  };

  handleChangePage = e => {
    this.setState({ activePage: e.target.dataset.value });
    e.preventDefault();
  };

  directChangePage = page => {
    this.setState({ activePage: page });
  };

  preventReload = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="app">
        {/* this is the navbar part*/}
        <Navbar
          className="header"
          {...{
            /* pass the props here */
            activePage: this.state.activePage,
            loggedIn: this.state.loggedIn,
            /* pass the handlers here */
            handleLogin: this.handleLogin,
            handleChangePage: this.handleChangePage,
            preventReload: this.preventReload,
            directChangePage: this.directChangePage
          }}
        />
        {/* here lies the body of the page */}
        <div className="body">
          {this.state.activePage === 'home' ? (
            <Homepage
              {
                ...{
                  /* pass the props here */
                  /* pass the handlers here */
                }
              }
            />
          ) : this.state.activePage === 'analyze' ? (
            <Analyze
              {...{
                /* pass the props here */
                /* pass the handlers here */
                preventReload: this.preventReload
              }}
            />
          ) : this.state.activePage === 'browse' ? (
            <Browse
              {...{
                /* pass the props here */
                loggedIn: this.state.loggedIn,
                /* pass the handlers here */
                preventReload: this.preventReload
              }}
            />
          ) : (
            <PageNotExist
              {...{
                /* pass the props here */
                /* pass the handlers here */
                preventReload: this.preventReload
              }}
            />
          )}
        </div>
        {/* this is the footer part */}
      </div>
    );
  }
}
