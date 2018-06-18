import React, { Component } from 'react';
/* import bulma components */
import {
  Navbar,
  NavbarEnd,
  NavbarItem,
  NavbarMenu,
  NavbarStart,
  NavbarLink,
  NavbarDropdown,
  Icon
} from 'bloomer';

/* create styles here */
const style = {
  nav: { backgroundColor: 'navy' },
  navItem: { backgroundColor: 'navy', color: 'white' },
  navLog: { color: 'white' },
  navDrop: { marginRight: '25px' },
  navUser: { marginRight: '15px' }
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { tabActive: 1 };
  }

  preventReload = e => {
    e.preventDefault();
  };

  changeLoginState = e => {
    e.preventDefault();
    this.props.handleLogin();
  };

  render() {
    return (
      <div style={style.nav}>
        <Navbar style={style.nav}>
          <NavbarMenu>
            <NavbarStart>
              <NavbarItem
                style={style.navItem}
                href="."
                data-value={'home'}
                onClick={this.props.handleChangePage}>
                Drone Image Analysis
              </NavbarItem>
            </NavbarStart>
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
                    <NavbarItem href="." onClick={this.changeLoginState}>
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
                    <NavbarItem
                      href="."
                      data-value={'login'}
                      onClick={this.props.handleChangePage}>
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
      </div>
    );
  }
}
