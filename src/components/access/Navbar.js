import React, { Component } from 'react';
import {
  Hero,
  HeroBody,
  HeroFooter,
  HeroHeader,
  HeroVideo,
  Navbar,
  NavbarBrand,
  NavbarBurger,
  NavbarDivider,
  NavbarDropdown,
  NavbarEnd,
  NavbarItem,
  NavbarLink,
  NavbarMenu,
  NavbarStart,
  brand,
  Field,
  Control,
  Button,
  Container,
  Title,
  Icon,
  Tab,
  Tabs,
  TabLink,
  TabList
} from 'bloomer';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Hero isColor="primary" isSize="small">
        <HeroHeader>
          <Navbar
            style={{
              border: 'solid 1px #00D1B2',
              margin: '0',
              backgroundColor: 'black',
              color: 'silver'
            }}>
            <NavbarBrand>
              <NavbarItem>
                <img src={brand} style={{ marginRight: 5 }} /> Bloomer
              </NavbarItem>
              <NavbarItem isHidden="desktop">
                <Icon className="fa fa-github" />
              </NavbarItem>
              <NavbarItem isHidden="desktop">
                <Icon className="fa fa-twitter" style={{ color: '#55acee' }} />
              </NavbarItem>
              <NavbarBurger
                isActive={this.state.isActive}
                onClick={this.onClickNav}
              />
            </NavbarBrand>
            <NavbarMenu
              isActive={this.state.isActive}
              onClick={this.onClickNav}>
              <NavbarStart>
                <NavbarItem href="#/">Home</NavbarItem>
                <NavbarItem hasDropdown isHoverable>
                  <NavbarLink href="#/documentation">Documentation</NavbarLink>
                  <NavbarDropdown>
                    <NavbarItem href="#/">One A</NavbarItem>
                    <NavbarItem href="#/">Two B</NavbarItem>
                    <NavbarDivider />
                    <NavbarItem href="#/">Two A</NavbarItem>
                  </NavbarDropdown>
                </NavbarItem>
              </NavbarStart>
              <NavbarEnd>
                <NavbarItem
                  href="https://github.com/AlgusDark/bloomer"
                  isHidden="touch">
                  <Icon className="fa fa-github" />
                </NavbarItem>
                <NavbarItem
                  href="https://twitter.com/AlgusDark"
                  isHidden="touch">
                  <Icon
                    className="fa fa-twitter"
                    style={{ color: '#55acee' }}
                  />
                </NavbarItem>
                <NavbarItem>
                  <Field isGrouped>
                    <Control>
                      <Button
                        id="twitter"
                        data-social-network="Twitter"
                        data-social-action="tweet"
                        data-social-target="http://bloomer.js.org"
                        target="_blank"
                        href="https://twitter.com/intent/tweet?text=bloomer:
                    a set of React Stateless Components for bulma.io&amp;url=http://bloomer.js.org&amp;via=AlgusDark">
                        <Icon className="fa fa-twitter" />
                        <span>Tweet</span>
                      </Button>
                    </Control>
                  </Field>
                </NavbarItem>
              </NavbarEnd>
            </NavbarMenu>
          </Navbar>
        </HeroHeader>

        <HeroBody>
          <Container hasTextAlign="centered">
            <Title>Title</Title>
          </Container>
        </HeroBody>

        <HeroFooter>
          <Tabs isBoxed isFullWidth>
            <Container>
              <TabList>
                <Tab isActive>
                  <TabLink>Overview</TabLink>
                </Tab>
                <Tab>
                  <TabLink>Grid</TabLink>
                </Tab>
                <Tab>
                  <TabLink>Element</TabLink>
                </Tab>
                <Tab>
                  <TabLink>Components</TabLink>
                </Tab>
                <Tab>
                  <TabLink>Layout</TabLink>
                </Tab>
              </TabList>
            </Container>
          </Tabs>
        </HeroFooter>
      </Hero>
    );
  }
}
