/* import React components here */
import React, { Component } from 'react';
import Login from '../login/Login';
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

/* create styles here */
const style = {
  nav: { backgroundColor: 'navy' },
  navItem: { backgroundColor: 'navy', color: 'white' },
  navLog: { color: 'white' },
  navDrop: { marginRight: '25px' },
  navUser: { marginRight: '15px' }
};

export default class NavigBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabActive: 1,
      modalActive: false
    };
  }

  changeLoginState = e => {
    e.preventDefault();
    this.props.handleLogin();
  };

  openLoginModal = e => {
    e.preventDefault();
    this.setState({ modalActive: true });
  };

  closeLoginModal = e => {
    e.preventDefault();
    this.setState({ modalActive: false });
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
                Something something
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
        <Login
          {...{
            /* insert props here */
            active: this.state.modalActive,
            /* insert handlers here */
            open: this.openLoginModal,
            close: this.closeLoginModal
          }}
        />
      </div>
    );
  }
}
