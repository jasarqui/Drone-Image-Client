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
  Image,
  Tag,
  Button
} from 'bloomer';
/* import api here */
import * as API from '../../api';
/* import assets here */
import DiaIcon from '../../assets/dia-logo-white.png';

/* create styles here */
const style = {
  nav: { backgroundColor: 'navy' },
  navItem: { backgroundColor: 'navy', color: 'white' },
  navLog: { color: 'white' },
  navDrop: { marginRight: '25px' },
  navUser: { marginRight: '15px' },
  navIcon: { marginRight: '10px' },
  whiteText: { color: 'white' },
  navButton: {
    backgroundColor: 'navy',
    border: '1px solid navy',
    color: 'white',
    margin: '0px 5px 0px 5px'
  }
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
      result.data.data
        ? (this.props.handleLogin(),
          this.props.changeUser(
            result.data.data.firstname,
            result.data.data.lastname,
            result.data.data.id
          ))
        : {
            /* do nothing */
          };
    });
  };

  changeLoginState = () => {
    this.props.handleLogin();
  };

  openLoginModal = e => {
    e.preventDefault();
    this.setState({ loginActive: true });
  };

  closeLoginModal = () => {
    this.setState({ loginActive: false });
  };

  openLogoutModal = e => {
    e.preventDefault();
    this.setState({ logoutActive: true });
  };

  closeLogoutModal = () => {
    this.setState({ logoutActive: false });
  };

  openSignupModal = e => {
    e.preventDefault();
    this.setState({ signupActive: true });
  };

  closeSignupModal = () => {
    this.setState({ signupActive: false });
  };

  menuDrop = () => {
    this.setState({ active: !this.state.active });
  };

  render() {
    return (
      <div style={style.nav}>
        <Navbar style={style.nav} isTransparent>
          <NavbarBrand>
            <NavbarItem
              style={style.navItem}
              href="."
              data-value={'home'}
              onClick={this.props.handleChangePage}>
              <Image
                src={DiaIcon}
                isSize={'32x32'}
                style={{ marginRight: '5px' }}
              />
              <strong>
                D<small>IA</small>
              </strong>
              <Tag
                isColor="light"
                style={{ marginLeft: '10px' }}
                isHidden={'desktop'}>
                <small>MOBILE</small>
              </Tag>
            </NavbarItem>
            <NavbarItem
              hasDropdown
              isHoverable
              style={style.navDrop}
              isHidden={'mobile'}>
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
            <NavbarBurger
              onClick={this.menuDrop}
              isActive={this.state.active}
              style={style.whiteText}
            />
          </NavbarBrand>
          <NavbarMenu isActive={this.state.active} style={style.navItem}>
            <NavbarItem hasDropdown isHoverable style={style.navDrop}>
              <NavbarDropdown>
                <NavbarItem isHidden={'desktop'} style={style.whiteText}>
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
                        className="fa fa-address-card fa-2x"
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
                    {this.props.username}
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
                      className="fa fa-address-card fa-2x"
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
