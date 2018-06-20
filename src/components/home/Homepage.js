/* import React components here */
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import About from './about/About';
import Devs from './devs/Devs';
import How from './how/How';
/* import bulma components */
import {
  Image,
  Title,
  Media,
  MediaContent,
  MediaLeft,
  Content,
  Hero,
  HeroBody,
  Subtitle,
  TabLink,
  Tab,
  Tabs,
  TabList,
  Container,
  Message,
  MessageBody,
  MessageHeader
} from 'bloomer';
/* import assets here */
import DiaIcon from '../../assets/dia-logo-white.png';

/* create styles here */
const style = {
  bodyMargin: {
    margin: '10px'
  },
  whiteText: {
    color: 'white',
    textDecoration: 'none'
  },
  blackText: {
    color: 'black',
    textDecoration: 'none'
  },
  tabMargin: {
    marginBottom: '-12px'
  }
};

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'about', // values: about, how, devs
      logs: [
        {
          type: 'announcement',
          username: 'admin',
          date: '2018-06-20',
          body: 'This is an'
        },
        {
          type: 'announcement',
          username: 'admin',
          date: '2018-06-20',
          body: 'announcement'
        },
        {
          type: 'log',
          username: 'admin',
          date: '2018-06-20',
          body: 'This is a'
        },
        {
          type: 'log',
          username: 'admin',
          date: '2018-06-20',
          body: 'sample log'
        },
        {
          type: 'patch',
          username: 'admin',
          date: '2018-06-20',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales eu risus quis ultrices. Donec facilisis neque ac enim pellentesque, et interdum libero mollis. Morbi ac scelerisque massa, id mattis quam. Nam vitae ante massa. Nulla pulvinar ante nunc, nec gravida turpis tristique sit amet.'
        }
      ]
    };
  }

  changeTab = e => {
    e.preventDefault();
    this.setState({ activeTab: e.target.dataset.value });
  };

  render() {
    return (
      <DocumentTitle title="DIA">
        <div>
          <Hero>
            <HeroBody>
              <Media>
                <MediaLeft>
                  <Image src={DiaIcon} isSize="64x64" />
                </MediaLeft>
                <MediaContent>
                  <Content>
                    <Title isSize={3} style={style.whiteText}>
                      Drone Image Analysis
                    </Title>
                    <Subtitle isSize={6} style={style.whiteText}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Curabitur sodales eu risus quis ultrices. Donec facilisis
                      neque ac enim pellentesque, et interdum libero mollis.
                      Morbi ac scelerisque massa, id mattis quam
                    </Subtitle>
                  </Content>
                </MediaContent>
              </Media>
            </HeroBody>
          </Hero>
          <Container isFluid>
            <Message isColor="black">
              <MessageHeader>
                <Tabs
                  isBoxed
                  isFullWidth
                  isAlign="centered"
                  style={style.tabMargin}>
                  <Container>
                    <center>
                      <TabList>
                        <Tab
                          isActive={
                            this.state.activeTab === 'about' ? true : false
                          }
                          onClick={this.changeTab}>
                          <TabLink
                            data-value={'about'}
                            style={
                              this.state.activeTab === 'about'
                                ? style.blackText
                                : style.whiteText
                            }>
                            About
                          </TabLink>
                        </Tab>
                        <Tab
                          isActive={
                            this.state.activeTab === 'how' ? true : false
                          }
                          onClick={this.changeTab}>
                          <TabLink
                            data-value={'how'}
                            style={
                              this.state.activeTab === 'how'
                                ? style.blackText
                                : style.whiteText
                            }>
                            How
                          </TabLink>
                        </Tab>
                        <Tab
                          isActive={
                            this.state.activeTab === 'devs' ? true : false
                          }
                          onClick={this.changeTab}>
                          <TabLink
                            data-value={'devs'}
                            style={
                              this.state.activeTab === 'devs'
                                ? style.blackText
                                : style.whiteText
                            }>
                            Developers
                          </TabLink>
                        </Tab>
                      </TabList>
                    </center>
                  </Container>
                </Tabs>
              </MessageHeader>
              <MessageBody>
                {this.state.activeTab === 'about' ? (
                  <About />
                ) : this.state.activeTab === 'how' ? (
                  <How />
                ) : (
                  <Devs />
                )}
              </MessageBody>
            </Message>
          </Container>
        </div>
      </DocumentTitle>
    );
  }
}
