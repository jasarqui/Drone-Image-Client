/* import React components here */
import React, { Component } from 'react';
import Login from '../auth/Login';
import Logout from '../auth/Logout';
import Signup from '../signup/Signup';
/* import bulma components */
import {
  Navbar,
  NavbarEnd,
  NavbarItem,
  NavbarMenu,
  NavbarLink,
  NavbarBrand,
  NavbarDropdown,
  NavbarBurger,
  Icon,
  Button,
  Heading
} from 'bloomer';
/* import api here */
import * as API from '../../api';

/* create styles here */
const style = {
  nav: { borderBottom: '2px solid #015249' },
  navItem: { color: '#015249' },
  navLog: { color: '#015249' },
  navDrop: { marginRight: '25px' },
  navUser: { marginRight: '15px' },
  navIcon: { marginRight: '10px' },
  whiteText: { color: 'white' },
  greenText: { color: '#015249' },
  navButton: {
    backgroundColor: '#015249',
    border: '1px solid #015249',
    color: 'white',
    margin: '0px 0px 0px 10px',
    width: '40%'
  },
  divider: { backgroundColor: '#015249' },
  headText: { marginLeft: '10px' }
};

export default class NavigBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabActive: 1,
      loginActive: false,
      logoutActive: false,
      signupActive: false,
      active: false
    };
  }

  componentDidMount = () => {
    API.getSession().then(result => {
      if (result.data.data) {
        this.props.handleLogin();
        this.props.changeUser(
          result.data.data.firstname,
          result.data.data.lastname,
          result.data.data.id
        );
      }
    });
  };

  changeLoginState = () => this.props.handleLogin();

  openLoginModal = e => {
    e.preventDefault();
    this.setState({ loginActive: true });
  };

  openLogoutModal = e => {
    e.preventDefault();
    this.setState({ logoutActive: true });
  };

  openSignupModal = e => {
    e.preventDefault();
    this.setState({ signupActive: true });
  };

  closeLoginModal = () => this.setState({ loginActive: false });
  closeLogoutModal = () => this.setState({ logoutActive: false });
  closeSignupModal = () => this.setState({ signupActive: false });

  menuDrop = () => {
    this.setState({ active: !this.state.active });
  };

  render() {
    return (
      <div>
        <Navbar isTransparent style={style.nav}>
          <NavbarBrand>
            <NavbarItem
              style={style.navItem}
              href="."
              data-value={'home'}
              onClick={this.props.handleChangePage}>
              <strong>
                <Heading style={style.headText}>DRONE IMAGE ANALYSIS</Heading>
              </strong>
            </NavbarItem>
            <NavbarItem
              hasDropdown
              isHoverable
              style={style.navDrop}
              isHidden={'mobile'}>
              <NavbarLink style={style.navItem}>
                <Heading>Images</Heading>
              </NavbarLink>
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
            <NavbarBurger
              onClick={this.menuDrop}
              isActive={this.state.active}
              style={style.greenText}
            />
          </NavbarBrand>
          <NavbarMenu isActive={this.state.active} style={style.navItem}>
            <NavbarItem hasDropdown isHoverable style={style.navDrop}>
              <NavbarDropdown>
                <NavbarItem isHidden={'desktop'} style={style.greenText}>
                  <center>
                    {this.props.loggedIn ? (
                      <div>
                        <Icon
                          className="fa fa-user-circle fa-2x"
                          style={style.navUser}
                        />
                        <Button isSize={'small'} style={style.navButton}>
                          <strong>{this.props.username}</strong>
                        </Button>
                        <Button
                          isSize={'small'}
                          style={style.navButton}
                          onClick={this.openLogoutModal}>
                          <strong>Logout</strong>
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Icon
                          className="fa fa-address-card fa-1x"
                          style={style.navDrop}
                        />
                        <Button
                          isSize={'small'}
                          style={style.navButton}
                          onClick={this.openLoginModal}>
                          <strong>Login</strong>
                        </Button>
                        <Button
                          isSize={'small'}
                          style={style.navButton}
                          onClick={this.openSignupModal}>
                          <strong>Signup</strong>
                        </Button>
                      </div>
                    )}
                  </center>
                  <hr style={style.divider} />
                </NavbarItem>
                <NavbarItem
                  data-value={'browse'}
                  href="."
                  onClick={this.props.handleChangePage}
                  style={style.navItem}>
                  <Icon style={style.navIcon} className="fa fa-search" />
                  Browse
                </NavbarItem>
                <NavbarItem
                  data-value={'analyze'}
                  href="."
                  onClick={this.props.handleChangePage}
                  style={style.navItem}>
                  <Icon style={style.navIcon} className="fa fa-bolt" />
                  Analyze
                </NavbarItem>
              </NavbarDropdown>
            </NavbarItem>
            <NavbarEnd isHidden={'mobile'}>
              {this.props.loggedIn ? (
                <NavbarItem hasDropdown isHoverable style={style.navDrop}>
                  <NavbarLink style={style.navItem}>
                    <Icon
                      className="fa fa-user-circle fa-2x"
                      style={style.navUser}
                    />
                    <strong>
                      <Heading>{this.props.username}</Heading>
                    </strong>
                  </NavbarLink>
                  <NavbarDropdown>
                    <NavbarItem href="." onClick={this.openLogoutModal}>
                      Logout
                    </NavbarItem>
                  </NavbarDropdown>
                </NavbarItem>
              ) : (
                <NavbarItem hasDropdown isHoverable style={style.navDrop}>
                  <NavbarLink style={style.navItem} isHidden={'mobile'}>
                    <Icon
                      className="fa fa-address-card fa-lg"
                      style={style.navDrop}
                    />
                  </NavbarLink>
                  <NavbarDropdown>
                    <NavbarItem
                      href="."
                      onClick={this.openLoginModal}
                      isHidden={'mobile'}>
                      Login
                    </NavbarItem>
                    <NavbarItem
                      href="."
                      onClick={this.openSignupModal}
                      isHidden={'mobile'}>
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
            changeLog: this.props.handleLogin,
            changeUser: this.props.changeUser
          }}
        />
        <Logout
          {...{
            /* insert props here */
            active: this.state.logoutActive,
            /* insert handlers here */
            close: this.closeLogoutModal,
            changeLog: this.changeLoginState,
            removeUser: this.props.removeUser
          }}
        />
        <Signup
          {...{
            /* insert props here */
            active: this.state.signupActive,
            /* insert handlers here */
            close: this.closeSignupModal,
            changeLog: this.changeLoginState,
            changeUser: this.props.changeUser
          }}
        />
      </div>
    );
  }
}
