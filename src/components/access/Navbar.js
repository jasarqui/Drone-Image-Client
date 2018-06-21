/* import React components here */
import React, { Component } from 'react';
import Login from '../auth/Login';
import Logout from '../auth/Logout';
/* import bulma components */
import {
  Navbar,
  NavbarEnd,
  NavbarItem,
  NavbarMenu,
  NavbarLink,
  NavbarBrand,
  NavbarDropdown,
  Icon
} from 'bloomer';
/* import api here */
import * as API from '../../api';

/* create styles here */
const style = {
  nav: { backgroundColor: 'navy' },
  navItem: { backgroundColor: 'navy', color: 'white' },
  navLog: { color: 'white' },
  navDrop: { marginRight: '25px' },
  navUser: { marginRight: '15px' },
  navIcon: { marginRight: '10px' }
};

export default class NavigBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabActive: 1,
      loginActive: false,
      logoutActive: false
    };
  }

  componentDidMount = () => {
    API.getSession().then(result => {
      result.data.data
        ? this.props.handleLogin()
        : {
            /* do nothing */
          };
    });
  };

  changeLoginState = e => {
    e.preventDefault();
    this.props.handleLogin();
  };

  openLoginModal = e => {
    e.preventDefault();
    this.setState({ loginActive: true });
  };

  closeLoginModal = e => {
    e.preventDefault();
    this.setState({ loginActive: false });
  };

  openLogoutModal = e => {
    e.preventDefault();
    this.setState({ logoutActive: true });
  };

  closeLogoutModal = e => {
    e.preventDefault();
    this.setState({ logoutActive: false });
  };

  render() {
    return (
      <div style={style.nav}>
        <Navbar style={style.nav}>
          <NavbarMenu>
            <NavbarBrand>
              <NavbarItem
                style={style.navItem}
                href="."
                data-value={'home'}
                onClick={this.props.handleChangePage}>
                Lorem Ipsum
              </NavbarItem>
              <NavbarItem hasDropdown isHoverable style={style.navDrop}>
                <NavbarLink style={style.navItem}>Images</NavbarLink>
                <NavbarDropdown>
                  <NavbarItem
                    data-value={'browse'}
                    href="."
                    onClick={this.props.handleChangePage}>
                    <Icon style={style.navIcon} className="fa fa-search" />
                    Browse
                  </NavbarItem>
                  <NavbarItem
                    data-value={'analyze'}
                    href="."
                    onClick={this.props.handleChangePage}>
                    <Icon style={style.navIcon} className="fa fa-bolt" />
                    Analyze
                  </NavbarItem>
                </NavbarDropdown>
              </NavbarItem>
            </NavbarBrand>
            <NavbarEnd>
              {this.props.loggedIn ? (
                <NavbarItem hasDropdown isHoverable style={style.navDrop}>
                  <NavbarLink style={style.navItem}>
                    <Icon
                      className="fa fa-user-circle fa-2x"
                      style={style.navUser}
                    />
                    You are logged in!
                  </NavbarLink>
                  <NavbarDropdown>
                    <NavbarItem href="." onClick={this.openLogoutModal}>
                      Logout
                    </NavbarItem>
                  </NavbarDropdown>
                </NavbarItem>
              ) : (
                <NavbarItem hasDropdown isHoverable style={style.navDrop}>
                  <NavbarLink style={style.navItem}>
                    <Icon
                      className="fa fa-address-card fa-2x"
                      style={style.navDrop}
                    />
                  </NavbarLink>
                  <NavbarDropdown>
                    <NavbarItem href="." onClick={this.openLoginModal}>
                      Login
                    </NavbarItem>
                    <NavbarItem
                      data-value={'signup'}
                      href="."
                      onClick={this.props.handleChangePage}>
                      Signup
                    </NavbarItem>
                  </NavbarDropdown>
                </NavbarItem>
              )}
            </NavbarEnd>
          </NavbarMenu>
        </Navbar>
        {/* below are modals */}
        <Login
          {...{
            /* insert props here */
            active: this.state.loginActive,
            /* insert handlers here */
            close: this.closeLoginModal,
            changeLog: this.props.handleLogin
          }}
        />
        <Logout
          {...{
            /* insert props here */
            active: this.state.logoutActive,
            /* insert handlers here */
            close: this.closeLogoutModal,
            changeLog: this.changeLoginState
          }}
        />
      </div>
    );
  }
}
