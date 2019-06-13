/* import React components here */
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import About from './about/About';
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
  HeroFooter,
  Subtitle,
  TabLink,
  Tab,
  Tabs,
  TabList,
  Container,
  Footer,
  Heading
} from 'bloomer';
/* import assets here */
import DiaIcon from '../../assets/dia-logo-white.png';
import RiceField from '../../assets/ricefield.jpg';
import FadeInGroup from '../transition/FadeInGroup';
import TrackVisibility from 'react-on-screen';

/* create styles here */
const style = {
  bodyMargin: {
    margin: '10px'
  },
  whiteText: {
    color: 'white',
    textDecoration: 'none'
  },
  greenText: {
    color: '#015249',
    textDecoration: 'none'
  },
  greenBack: {
    backgroundColor: '#015249'
  },
  marginBody: {
    margin: '0px 0px 50px 0px',
    color: 'white'
  },
  irriLogo: {
    width: '50px',
    height: '50px',
    borderRadius: '10px'
  }
};

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'about' // values: about, how, devs
    };
  }

  changeTab = e => {
    e.preventDefault();
    this.setState({ activeTab: e.currentTarget.dataset.value });
  };

  render() {
    return (
      <DocumentTitle title="DIA">
        <div>
          <Hero style={style.greenBack} isSize={'large'}>
            <Image
              style={{
                padding: '0',
                margin: '0',
                opacity: '0.3',
                position: 'absolute',
                width: '100%',
                WebkitMaskImage:
                  'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0)), linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
                WebkitMaskSize: '100% 51%',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'top, bottom'
              }}
              src={RiceField}
            />
            <HeroBody>
              <Media>
                <MediaLeft>
                  <TrackVisibility once>
                    {({ isVisible }) =>
                      isVisible ? (
                        <FadeInGroup
                          transitionAppear={isVisible ? true : false}>
                          <Image src={DiaIcon} isSize="64x64" />
                        </FadeInGroup>
                      ) : (
                        <Image
                          style={{ opacity: 0 }}
                          src={DiaIcon}
                          isSize="64x64"
                        />
                      )
                    }
                  </TrackVisibility>
                </MediaLeft>
                <MediaContent>
                  <TrackVisibility once>
                    {({ isVisible }) =>
                      isVisible ? (
                        <FadeInGroup
                          transitionAppear={isVisible ? true : false}>
                          <Content style={style.whiteText}>
                            <Title isSize={3} style={style.whiteText}>
                              Drone Image Analysis
                            </Title>
                            <Subtitle isSize={6} style={style.whiteText}>
                              A web application that uses deep learning to
                              process drone images and extract important
                              information about rice fields.
                            </Subtitle>
                          </Content>
                        </FadeInGroup>
                      ) : (
                        <Content style={{ ...style.whiteText, opacity: 0 }}>
                          <Title isSize={3} style={style.whiteText}>
                            Drone Image Analysis
                          </Title>
                          <Subtitle isSize={6} style={style.whiteText}>
                            A web application that uses deep learning to process
                            drone images and extract important information about
                            rice fields.
                          </Subtitle>
                        </Content>
                      )
                    }
                  </TrackVisibility>
                </MediaContent>
              </Media>
            </HeroBody>
            <HeroFooter>
              <Tabs isBoxed isFullWidth isAlign="centered">
                <Container>
                  <center>
                    <TabList>
                      <Tab
                        isActive={
                          this.state.activeTab === 'about' ? true : false
                        }>
                        <TabLink
                          onClick={this.changeTab}
                          data-value={'about'}
                          style={
                            this.state.activeTab === 'about'
                              ? style.greenText
                              : style.whiteText
                          }>
                          <Heading style={{ fontSize: '14px' }}>
                            <strong>ABOUT</strong>
                          </Heading>
                        </TabLink>
                      </Tab>
                      {/* <Tab
                        isActive={
                          this.state.activeTab === 'how' ? true : false
                        }>
                        <TabLink
                          onClick={this.changeTab}
                          data-value={'how'}
                          style={
                            this.state.activeTab === 'how'
                              ? style.greenText
                              : style.whiteText
                          }>
                          <Heading style={{ fontSize: '14px' }}>
                            <strong>HOW</strong>
                          </Heading>
                        </TabLink>
                        </Tab> */}
                    </TabList>
                  </center>
                </Container>
              </Tabs>
            </HeroFooter>
          </Hero>
          <Container isFluid style={style.marginBody}>
            {this.state.activeTab === 'about' ? <About /> : <How />}
          </Container>
          <Footer>
            <Container>
              <Media>
                <MediaLeft>
                  <a target={'_blank'} href={'http://irri.org/'}>
                    <img
                      alt={'irri'}
                      src={'https://c1.staticflickr.com/3/2880/9364222880_523d753019_b.jpg'}
                      style={style.irriLogo}
                    />
                  </a>
                </MediaLeft>
                <MediaContent>
                  <Content style={{ marginTop: '2px' }}>
                    <Heading style={{ marginBottom: '0px' }}>
                      <strong>INTERNATIONAL RICE RESEARCH INSTITUTE</strong>
                    </Heading>
                    <small style={{ fontSize: '9pt' }}>
                      <p style={{ marginBottom: '0px' }}>
                        The International Rice Research Institute is a member of
                        the{' '}
                        <a target={'_blank'} href={'http://cgiar.org'}>
                          CGIAR
                        </a>{' '}
                        System Organization, a global research partnership for a
                        food secure future.
                      </p>
                      <p>
                        This site is developed under the Bioinformatics |
                        Strategic Innovation unit of the institute.
                      </p>
                    </small>
                  </Content>
                </MediaContent>
              </Media>
            </Container>
          </Footer>
        </div>
      </DocumentTitle>
    );
  }
}
