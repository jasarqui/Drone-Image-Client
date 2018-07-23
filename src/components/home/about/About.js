/* import React components here */
import React, { Component } from 'react';
/* import bulma components */
import {
  Columns,
  Column,
  Heading,
  Media,
  MediaLeft,
  MediaContent,
  Icon
} from 'bloomer';
/* import assets here */
import GirlIcon from '../../../assets/girl.png';
import BoyIcon from '../../../assets/boy.png';
import FadeInGroup from '../../transition/FadeInGroup';
import TrackVisibility from 'react-on-screen';

const style = {
  img: {
    marginTop: '15px',
    borderRadius: '50%',
    width: '45%',
    height: 'auto',
    border: '3px solid white',
    marginBottom: '10px'
  },
  projHeader: {
    backgroundColor: 'white',
    marginBottom: '0px'
  },
  projContainer: {
    padding: '50px 0px 75px 0px'
  },
  devHeader: {
    backgroundColor: '#77c9d4',
    marginBottom: '0px',
    paddingTop: '40px'
  },
  devContainer: {
    padding: '40px 0px 60px 0px',
    backgroundColor: '#77c9d4'
  },
  appHeader: {
    marginBottom: '0px',
    paddingTop: '40px'
  },
  appContainer: {
    padding: '20px 60px 40px 60px'
  },
  appIcons: {
    padding: '0px 100px 40px 100px'
  },
  icon: {
    height: '75px',
    width: 'auto'
  },
  objectives: {
    paddingLeft: '50px',
    paddingRight: '50px'
  }
};

export default class About extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div style={{backgroundColor: 'white'}}>
        {/* about the project here */}
        <Columns isFullWidth style={style.projHeader}>
          <Column>
            <center>
              <Heading>
                <strong style={{ fontSize: '20px' }}>THE PROJECT</strong>
              </Heading>
            </center>
          </Column>
        </Columns>
        <Columns isFullWidth style={style.projContainer}>
          <Column>
            <center style={{ color: 'black' }}>
              This web application is made as part of the research project
              entitled <strong>Drone Image Analysis</strong>,
              <br />which intends to:
              <Columns isMultiline>
                <Column style={style.objectives} isSize="1/2">
                  <TrackVisibility once>
                    {({ isVisible }) =>
                      isVisible ? (
                        <FadeInGroup
                          transitionAppear={isVisible ? true : false}>
                          <Media style={{ marginTop: '80px' }}>
                            <MediaLeft>
                              <a
                                target={'_blank'}
                                href={'https://bisque.cyverse.org/client_service/'}>
                                <img
                                  alt={'bisque'}
                                  style={{ height: '40px', width: 'auto' }}
                                  src="https://bisque.cyverse.org/core/images/bisque_logo_gray.svg"
                                />
                              </a>
                            </MediaLeft>
                            <MediaContent style={{ marginLeft: '10%' }}>
                              be of close functionalities to Bisque, another
                              image database
                            </MediaContent>
                          </Media>
                        </FadeInGroup>
                      ) : (
                        <Media style={{ marginTop: '80px', opacity: 0 }}>
                          <MediaLeft>
                            <img
                              alt={'bisque'}
                              style={{ height: '40px', width: 'auto' }}
                              src="https://bisque.cyverse.org/core/images/bisque_logo_gray.svg"
                            />
                          </MediaLeft>
                          <MediaContent style={{ marginLeft: '10%' }}>
                            be of close functionalities to Bisque, another image
                            database
                          </MediaContent>
                        </Media>
                      )
                    }
                  </TrackVisibility>
                </Column>
                <Column style={style.objectives} isSize="1/2">
                  <TrackVisibility once>
                    {({ isVisible }) =>
                      isVisible ? (
                        <FadeInGroup
                          transitionAppear={isVisible ? true : false}>
                          <Media style={{ marginTop: '80px' }}>
                            <MediaLeft style={{ color: '#015249' }}>
                              <Icon className={'fa fa-picture-o fa-3x'} />
                            </MediaLeft>
                            <MediaContent style={{ marginLeft: '10%' }}>
                              be able to save and display images along with
                              their metadata and other information
                            </MediaContent>
                          </Media>
                        </FadeInGroup>
                      ) : (
                        <Media style={{ marginTop: '80px', opacity: 0 }}>
                          <MediaLeft style={{ color: '#015249' }}>
                            <Icon className={'fa fa-picture-o fa-3x'} />
                          </MediaLeft>
                          <MediaContent style={{ marginLeft: '10%' }}>
                            be able to save and display images along with their
                            metadata and other information
                          </MediaContent>
                        </Media>
                      )
                    }
                  </TrackVisibility>
                </Column>
                <Column style={style.objectives} isSize="1/2">
                  <TrackVisibility once>
                    {({ isVisible }) =>
                      isVisible ? (
                        <FadeInGroup
                          transitionAppear={isVisible ? true : false}>
                          <Media style={{ marginTop: '50px' }}>
                            <MediaLeft style={{ color: '#015249' }}>
                              <Icon className={'fa fa-pagelines fa-3x'} />
                            </MediaLeft>
                            <MediaContent style={{ marginLeft: '10%' }}>
                              be able to analyze rice field images taken from
                              drones and extract important information from them
                            </MediaContent>
                          </Media>
                        </FadeInGroup>
                      ) : (
                        <Media style={{ marginTop: '50px', opacity: 0 }}>
                          <MediaLeft style={{ color: '#015249' }}>
                            <Icon className={'fa fa-pagelines fa-3x'} />
                          </MediaLeft>
                          <MediaContent style={{ marginLeft: '10%' }}>
                            be able to analyze rice field images taken from
                            drones and extract important information from them
                          </MediaContent>
                        </Media>
                      )
                    }
                  </TrackVisibility>
                </Column>
                <Column style={style.objectives} isSize="1/2">
                  <TrackVisibility once>
                    {({ isVisible }) =>
                      isVisible ? (
                        <FadeInGroup
                          transitionAppear={isVisible ? true : false}>
                          <Media style={{ marginTop: '50px' }}>
                            <MediaLeft style={{ color: '#454545' }}>
                              <Icon className={'fa fa-search fa-3x'} />
                            </MediaLeft>
                            <MediaContent style={{ marginLeft: '10%' }}>
                              be able to search for images according to the
                              information given or extracted from them
                            </MediaContent>
                          </Media>
                        </FadeInGroup>
                      ) : (
                        <Media style={{ marginTop: '50px', opacity: 0 }}>
                          <Media style={{ marginTop: '50px' }}>
                            <MediaLeft style={{ color: '#454545' }}>
                              <Icon className={'fa fa-search fa-3x'} />
                            </MediaLeft>
                            <MediaContent style={{ marginLeft: '10%' }}>
                              be able to search for images according to the
                              information given or extracted from them
                            </MediaContent>
                          </Media>
                        </Media>
                      )
                    }
                  </TrackVisibility>
                </Column>
              </Columns>
            </center>
          </Column>
        </Columns>
        {/* about the developers here */}
        <Columns isFullWidth style={style.devHeader}>
          <Column>
            <center>
              <Heading>
                <strong style={{ color: 'white', fontSize: '20px' }}>
                  THE DEVELOPERS
                </strong>
              </Heading>
            </center>
          </Column>
        </Columns>
        <Columns isGapless isFullWidth style={style.devContainer}>
          <Column isSize="1/2">
            <TrackVisibility once>
              {({ isVisible }) =>
                isVisible ? (
                  <FadeInGroup transitionAppear={isVisible ? true : false}>
                    <center>
                      <img alt={'left'} src={GirlIcon} style={style.img} />
                      <small>
                        <p style={{ marginBottom: '-5px' }}>
                          <strong style={{ fontSize: '15px', color: 'white' }}>
                            LORIA ROIE GRACE MALINGAN
                          </strong>
                        </p>
                        <p style={{ marginBottom: '-3px' }}>IMAGE PROCESSING</p>
                      </small>
                    </center>
                  </FadeInGroup>
                ) : (
                  <center style={{ opacity: 0 }}>
                    <img alt={'left'} src={GirlIcon} style={style.img} />
                    <small>
                      <p style={{ marginBottom: '-5px' }}>
                        <strong style={{ fontSize: '15px', color: 'white' }}>
                          LORIA ROIE GRACE MALINGAN
                        </strong>
                      </p>
                      <p style={{ marginBottom: '-3px' }}>IMAGE PROCESSING</p>
                    </small>
                  </center>
                )
              }
            </TrackVisibility>
          </Column>
          <Column isSize="1/2">
            <TrackVisibility once>
              {({ isVisible }) =>
                isVisible ? (
                  <FadeInGroup transitionAppear={isVisible ? true : false}>
                    <center>
                      <img alt={'right'} src={BoyIcon} style={style.img} />
                      <small>
                        <p style={{ marginBottom: '-5px' }}>
                          <strong style={{ fontSize: '15px', color: 'white' }}>
                            JASPER IAN ARQUILITA
                          </strong>
                        </p>
                        <p style={{ marginBottom: '-3px' }}>WEB DEVELOPMENT</p>
                      </small>
                    </center>
                  </FadeInGroup>
                ) : (
                  <center style={{ opacity: 0 }}>
                    <img alt={'right'} src={BoyIcon} style={style.img} />
                    <small>
                      <p style={{ marginBottom: '-5px' }}>
                        <strong style={{ fontSize: '15px', color: 'white' }}>
                          JASPER IAN ARQUILITA
                        </strong>
                      </p>
                      <p style={{ marginBottom: '-3px' }}>WEB DEVELOPMENT</p>
                    </small>
                  </center>
                )
              }
            </TrackVisibility>
          </Column>
        </Columns>
        {/* about the app here */}
        <Columns isFullWidth style={style.appHeader}>
          <Column>
            <center>
              <Heading>
                <strong style={{ fontSize: '20px' }}>THE WEB APP</strong>
              </Heading>
            </center>
          </Column>
        </Columns>
        <Columns isFullWidth style={style.appContainer}>
          <Column>
            <center style={{ color: 'black' }}>
              This project is bootstrapped with Facebook's{' '}
              <a
                href={'https://github.com/facebookincubator/create-react-app'}
                target={'_blank'}>
                Create React App
              </a>.
              <p>The following frameworks were integrated into the app:</p>
            </center>
          </Column>
        </Columns>
        <Columns style={style.appIcons}>
          <Column isSize={'3'}>
            <TrackVisibility once>
              {({ isVisible }) =>
                isVisible ? (
                  <FadeInGroup transitionAppear={isVisible ? true : false}>
                    <center>
                      <a href={'https://nodejs.org/en/'} target={'_blank'}>
                        <img
                          alt={'node'}
                          src={
                            'http://creative.stage5.com.ng/blog/wp-content/uploads/2018/04/nodejs.png'
                          }
                          style={style.icon}
                        />
                      </a>
                    </center>
                  </FadeInGroup>
                ) : (
                  <center style={{ opacity: 0 }}>
                    <a href={'https://nodejs.org/en/'} target={'_blank'}>
                      <img
                        alt={'node'}
                        src={
                          'http://creative.stage5.com.ng/blog/wp-content/uploads/2018/04/nodejs.png'
                        }
                        style={style.icon}
                      />
                    </a>
                  </center>
                )
              }
            </TrackVisibility>
          </Column>
          <Column isSize={'3'}>
            <TrackVisibility once>
              {({ isVisible }) =>
                isVisible ? (
                  <FadeInGroup transitionAppear={isVisible ? true : false}>
                    <center>
                      <a href={'https://reactjs.org/'} target={'_blank'}>
                        <img
                          alt={'react'}
                          src={
                            'https://cdn-images-1.medium.com/max/512/1*6kK9j74vyOmXYm1gN6ARhQ.png'
                          }
                          style={style.icon}
                        />
                      </a>
                    </center>
                  </FadeInGroup>
                ) : (
                  <center style={{ opacity: 0 }}>
                    <a href={'https://reactjs.org/'} target={'_blank'}>
                      <img
                        alt={'react'}
                        src={
                          'https://cdn-images-1.medium.com/max/512/1*6kK9j74vyOmXYm1gN6ARhQ.png'
                        }
                        style={style.icon}
                      />
                    </a>
                  </center>
                )
              }
            </TrackVisibility>
          </Column>
          <Column isSize={'3'} isHidden={'mobile'}>
            <TrackVisibility once>
              {({ isVisible }) =>
                isVisible ? (
                  <FadeInGroup transitionAppear={isVisible ? true : false}>
                    <center>
                      <a href={'https://expressjs.com/'} target={'_blank'}>
                        <img
                          alt={'express'}
                          src={'https://i.cloudup.com/zfY6lL7eFa-3000x3000.png'}
                          style={{
                            marginTop: '20px',
                            height: '40px',
                            width: 'auto'
                          }}
                        />
                      </a>
                    </center>
                  </FadeInGroup>
                ) : (
                  <center style={{ opacity: 0 }}>
                    <a href={'https://expressjs.com/'} target={'_blank'}>
                      <img
                        alt={'express'}
                        src={'https://i.cloudup.com/zfY6lL7eFa-3000x3000.png'}
                        style={{
                          marginTop: '20px',
                          height: '40px',
                          width: 'auto'
                        }}
                      />
                    </a>
                  </center>
                )
              }
            </TrackVisibility>
          </Column>
          <Column isSize={'3'} isHidden={'desktop'}>
            <TrackVisibility once>
              {({ isVisible }) =>
                isVisible ? (
                  <FadeInGroup transitionAppear={isVisible ? true : false}>
                    <center>
                      <a href={'https://expressjs.com/'} target={'_blank'}>
                        <img
                          alt={'express'}
                          src={'https://i.cloudup.com/zfY6lL7eFa-3000x3000.png'}
                          style={{
                            margin: '10px 0px 10px 0px',
                            height: '40px',
                            width: 'auto'
                          }}
                        />
                      </a>
                    </center>
                  </FadeInGroup>
                ) : (
                  <center style={{ opacity: 0 }}>
                    <a href={'https://expressjs.com/'} target={'_blank'}>
                      <img
                        alt={'express'}
                        src={'https://i.cloudup.com/zfY6lL7eFa-3000x3000.png'}
                        style={{
                          margin: '10px 0px 10px 0px',
                          height: '40px',
                          width: 'auto'
                        }}
                      />
                    </a>
                  </center>
                )
              }
            </TrackVisibility>
          </Column>
          <Column isSize={'3'}>
            <TrackVisibility once>
              {({ isVisible }) =>
                isVisible ? (
                  <FadeInGroup transitionAppear={isVisible ? true : false}>
                    <center>
                      <a href={'https://www.postgresql.org/'} target={'_blank'}>
                        <img
                          alt={'psql'}
                          src={
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png'
                          }
                          style={style.icon}
                        />
                      </a>
                    </center>
                  </FadeInGroup>
                ) : (
                  <center style={{ opacity: 0 }}>
                    <a href={'https://www.postgresql.org/'} target={'_blank'}>
                      <img
                        alt={'psql'}
                        src={
                          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png'
                        }
                        style={style.icon}
                      />
                    </a>
                  </center>
                )
              }
            </TrackVisibility>
          </Column>
          <Column isSize={'3'}>
            <TrackVisibility once>
              {({ isVisible }) =>
                isVisible ? (
                  <FadeInGroup transitionAppear={isVisible ? true : false}>
                    <center>
                      <a
                        href={'http://docs.sequelizejs.com/'}
                        target={'_blank'}>
                        <img
                          alt={'sequelize'}
                          src={
                            'http://docs.sequelizejs.com/manual/asset/logo-small.png'
                          }
                          style={style.icon}
                        />
                      </a>
                    </center>
                  </FadeInGroup>
                ) : (
                  <center style={{ opacity: 0 }}>
                    <a href={'http://docs.sequelizejs.com/'} target={'_blank'}>
                      <img
                        alt={'sequelize'}
                        src={
                          'http://docs.sequelizejs.com/manual/asset/logo-small.png'
                        }
                        style={style.icon}
                      />
                    </a>
                  </center>
                )
              }
            </TrackVisibility>
          </Column>
          <Column isSize={'3'}>
            <TrackVisibility once>
              {({ isVisible }) =>
                isVisible ? (
                  <FadeInGroup transitionAppear={isVisible ? true : false}>
                    <center>
                      <a href={'https://www.python.org/'} target={'_blank'}>
                        <img
                          alt={'python'}
                          src={
                            'https://pbs.twimg.com/profile_images/439154912719413248/pUBY5pVj_400x400.png'
                          }
                          style={style.icon}
                        />
                      </a>
                    </center>
                  </FadeInGroup>
                ) : (
                  <center style={{ opacity: 0 }}>
                    <a href={'https://www.python.org/'} target={'_blank'}>
                      <img
                        alt={'python'}
                        src={
                          'https://pbs.twimg.com/profile_images/439154912719413248/pUBY5pVj_400x400.png'
                        }
                        style={style.icon}
                      />
                    </a>
                  </center>
                )
              }
            </TrackVisibility>
          </Column>
        </Columns>
        <Columns style={style.appIcons}>
          <Column isSize={'3'}>
            <TrackVisibility once>
              {({ isVisible }) =>
                isVisible ? (
                  <FadeInGroup transitionAppear={isVisible ? true : false}>
                    <center>
                      <a
                        href={'https://developers.google.com/apis-explorer/'}
                        target={'_blank'}>
                        <img
                          alt={'googleapis'}
                          src={
                            'https://pbs.twimg.com/profile_images/722158570205130752/1t1sxtjy_400x400.jpg'
                          }
                          style={style.icon}
                        />
                      </a>
                    </center>
                  </FadeInGroup>
                ) : (
                  <center style={{ opacity: 0 }}>
                    <a
                      href={'https://developers.google.com/apis-explorer/'}
                      target={'_blank'}>
                      <img
                        alt={'googleapis'}
                        src={
                          'https://pbs.twimg.com/profile_images/722158570205130752/1t1sxtjy_400x400.jpg'
                        }
                        style={style.icon}
                      />
                    </a>
                  </center>
                )
              }
            </TrackVisibility>
          </Column>
          <Column isSize={'3'} isHidden={'mobile'}>
            <TrackVisibility once>
              {({ isVisible }) =>
                isVisible ? (
                  <FadeInGroup transitionAppear={isVisible ? true : false}>
                    <center>
                      <a href={'https://bulma.io/'} target={'_blank'}>
                        <img
                          alt={'bulma'}
                          src={'https://bulma.io/images/bulma-logo.png'}
                          style={{
                            marginTop: '26px',
                            height: '30px',
                            width: 'auto'
                          }}
                        />
                      </a>
                    </center>
                  </FadeInGroup>
                ) : (
                  <center style={{ opacity: 0 }}>
                    <a href={'https://bulma.io/'} target={'_blank'}>
                      <img
                        alt={'bulma'}
                        src={'https://bulma.io/images/bulma-logo.png'}
                        style={{
                          marginTop: '26px',
                          height: '30px',
                          width: 'auto'
                        }}
                      />
                    </a>
                  </center>
                )
              }
            </TrackVisibility>
          </Column>
          <Column isSize={'3'} isHidden={'desktop'}>
            <TrackVisibility once>
              {({ isVisible }) =>
                isVisible ? (
                  <FadeInGroup transitionAppear={isVisible ? true : false}>
                    <center>
                      <a href={'https://bulma.io/'} target={'_blank'}>
                        <img
                          alt={'bulma'}
                          src={'https://bulma.io/images/bulma-logo.png'}
                          style={{
                            margin: '13px 0px 13px 0px',
                            height: '30px',
                            width: 'auto'
                          }}
                        />
                      </a>
                    </center>
                  </FadeInGroup>
                ) : (
                  <center style={{ opacity: 0 }}>
                    <a href={'https://bulma.io/'} target={'_blank'}>
                      <img
                        alt={'bulma'}
                        src={'https://bulma.io/images/bulma-logo.png'}
                        style={{
                          margin: '13px 0px 13px 0px',
                          height: '30px',
                          width: 'auto'
                        }}
                      />
                    </a>
                  </center>
                )
              }
            </TrackVisibility>
          </Column>
          <Column isSize={'3'}>
            <TrackVisibility once>
              {({ isVisible }) =>
                isVisible ? (
                  <FadeInGroup transitionAppear={isVisible ? true : false}>
                    <center>
                      <a href={'https://bloomer.js.org/'} target={'_blank'}>
                        <img
                          alt={'bloomer'}
                          src={'https://bloomer.js.org/assets/logo.png'}
                          style={style.icon}
                        />
                      </a>
                    </center>
                  </FadeInGroup>
                ) : (
                  <center style={{ opacity: 0 }}>
                    <a href={'https://bloomer.js.org/'} target={'_blank'}>
                      <img
                        alt={'bloomer'}
                        src={'https://bloomer.js.org/assets/logo.png'}
                        style={style.icon}
                      />
                    </a>
                  </center>
                )
              }
            </TrackVisibility>
          </Column>
          <Column isSize={'3'}>
            <TrackVisibility once>
              {({ isVisible }) =>
                isVisible ? (
                  <FadeInGroup transitionAppear={isVisible ? true : false}>
                    <center>
                      <a href={'https://fontawesome.com/'} target={'_blank'}>
                        <img
                          alt={'fontawesome'}
                          src={
                            'https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Font_Awesome_2017_Logo.svg/220px-Font_Awesome_2017_Logo.svg.png'
                          }
                          style={style.icon}
                        />
                      </a>
                    </center>
                  </FadeInGroup>
                ) : (
                  <center style={{ opacity: 0 }}>
                    <a href={'https://fontawesome.com/'} target={'_blank'}>
                      <img
                        alt={'fontawesome'}
                        src={
                          'https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Font_Awesome_2017_Logo.svg/220px-Font_Awesome_2017_Logo.svg.png'
                        }
                        style={style.icon}
                      />
                    </a>
                  </center>
                )
              }
            </TrackVisibility>
          </Column>
          <Column isSize={'3'}>
            <TrackVisibility once>
              {({ isVisible }) =>
                isVisible ? (
                  <FadeInGroup transitionAppear={isVisible ? true : false}>
                    <center>
                      <a href={'https://www.tensorflow.org/'} target={'_blank'}>
                        <img
                          alt={'tensorflow'}
                          src={
                            'https://pbs.twimg.com/profile_images/773317101012586496/q8sc1KuZ.jpg'
                          }
                          style={style.icon}
                        />
                      </a>
                    </center>
                  </FadeInGroup>
                ) : (
                  <center style={{ opacity: 0 }}>
                    <a href={'https://www.tensorflow.org/'} target={'_blank'}>
                      <img
                        alt={'tensorflow'}
                        src={
                          'https://pbs.twimg.com/profile_images/773317101012586496/q8sc1KuZ.jpg'
                        }
                        style={style.icon}
                      />
                    </a>
                  </center>
                )
              }
            </TrackVisibility>
          </Column>
          <Column isSize={'3'}>
            <TrackVisibility once>
              {({ isVisible }) =>
                isVisible ? (
                  <FadeInGroup transitionAppear={isVisible ? true : false}>
                    <center>
                      <a href={'https://opencv.org/'} target={'_blank'}>
                        <img
                          alt={'opencv'}
                          src={
                            'https://softlay.net/wp-content/uploads/2016/08/opencv-3-200x200.png'
                          }
                          style={style.icon}
                        />
                      </a>
                    </center>
                  </FadeInGroup>
                ) : (
                  <center style={{ opacity: 0 }}>
                    <a href={'https://opencv.org/'} target={'_blank'}>
                      <img
                        alt={'opencv'}
                        src={
                          'https://softlay.net/wp-content/uploads/2016/08/opencv-3-200x200.png'
                        }
                        style={style.icon}
                      />
                    </a>
                  </center>
                )
              }
            </TrackVisibility>
          </Column>
        </Columns>
      </div>
    );
  }
}
