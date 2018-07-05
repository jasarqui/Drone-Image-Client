import React, { Component } from 'react';

/* import <Component> from '../features/<component>/<filename>'*/
import Navbar from '../components/access/Navbar';
import Homepage from '../components/home/Homepage';
import Browse from '../components/browse/Browse';
import Analyze from '../components/analysis/Analyze';
import View from '../components/view/View';
import PageNotExist from '../components/error/PageNotExist';

/* import assets here */
import '../assets/index.css';
import Main from '../components/alert/Main';

/* This is where we will handle page redirection */
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      /* pages: home, browse, analyze, view */
      activePage: 'home',
      loggedIn: false,
      currentUser: '',
      currentUserId: ''
    };
  }

  handleLogin = () => {
    this.setState({ loggedIn: !this.state.loggedIn });
  };

  handleChangePage = e => {
    e.preventDefault();
    this.setState({ activePage: e.target.dataset.value });
  };

  directChangePage = page => {
    this.setState({ activePage: page });
  };

  preventReload = e => {
    e.preventDefault();
  };

  changeUser = (firstname, lastname, id) => {
    this.setState({
      currentUser: firstname + ' ' + lastname,
      currentUserId: id
    });
  };

  removeUser = () => {
    this.setState({ username: '', currentUserId: '' });
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
            username: this.state.currentUser,
            /* pass the handlers here */
            handleLogin: this.handleLogin,
            handleChangePage: this.handleChangePage,
            preventReload: this.preventReload,
            directChangePage: this.directChangePage,
            changeUser: this.changeUser,
            removeUser: this.removeUser
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
                userId: this.state.currentUserId,
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
          ) : this.state.activePage === 'view' ? (
            <View
              {...{
                /* pass the props here */
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
        {/* these are misc components */}
        <Main />
      </div>
    );
  }
}
