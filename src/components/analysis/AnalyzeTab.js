import React, { Component } from 'react';
import { Container, Tabs, Tab, TabList, TabLink } from 'bloomer';

/* create styles here */
const style = {
  nav: { backgroundColor: 'navy' },
  navItem: { backgroundColor: 'navy', color: 'white' },
  activeText: { color: 'navy' },
  inactiveText: { color: 'lightsteelblue' }
};

export default class AnalyzeTab extends Component {
  constructor(props) {
    super(props);

    this.state = { tabActive: 1 };
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(e) {
    this.setState({ tabActive: e.currentTarget.value });
  }

  render() {
    return (
      <div style={style.nav}>
        <Tabs isBoxed isFullWidth>
          <Container>
            <TabList>
              <Tab
                isActive={this.state.tabActive === 1 ? true : false}
                value={1}
                onClick={this.changeTab}>
                <TabLink
                  style={
                    this.state.tabActive === 1
                      ? style.activeText
                      : style.inactiveText
                  }>
                  Overview
                </TabLink>
              </Tab>
              <Tab
                isActive={this.state.tabActive === 2 ? true : false}
                value={2}
                onClick={this.changeTab}>
                <TabLink
                  style={
                    this.state.tabActive === 2
                      ? style.activeText
                      : style.inactiveText
                  }>
                  Grid
                </TabLink>
              </Tab>
              <Tab
                isActive={this.state.tabActive === 3 ? true : false}
                value={3}
                onClick={this.changeTab}>
                <TabLink
                  style={
                    this.state.tabActive === 3
                      ? style.activeText
                      : style.inactiveText
                  }>
                  Element
                </TabLink>
              </Tab>
              <Tab
                isActive={this.state.tabActive === 4 ? true : false}
                value={4}
                onClick={this.changeTab}>
                <TabLink
                  style={
                    this.state.tabActive === 4
                      ? style.activeText
                      : style.inactiveText
                  }>
                  Components
                </TabLink>
              </Tab>
              <Tab
                isActive={this.state.tabActive === 5 ? true : false}
                value={5}
                onClick={this.changeTab}>
                <TabLink
                  style={
                    this.state.tabActive === 5
                      ? style.activeText
                      : style.inactiveText
                  }>
                  Layout
                </TabLink>
              </Tab>
            </TabList>
          </Container>
        </Tabs>
      </div>
    );
  }
}
