/* import React components here */
import React, { Component } from 'react';
/* import bulma components */
import { Columns, Column, Heading } from 'bloomer';
/* import assetes here */
import GirlIcon from '../../../assets/girl.png';
import BoyIcon from '../../../assets/boy.png';

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
    marginBottom: '0px'
  },
  projContainer: {
    padding: '40px 0px 40px 0px'
  },
  devHeader: {
    backgroundColor: '#77c9d4',
    marginBottom: '0px',
    paddingTop: '40px'
  },
  devContainer: {
    padding: '40px 0px 40px 0px',
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
  }
};

export default class About extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
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
            <center style={{ color: 'black' }}>Lorem ipsum</center>
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
            <center>
              <img alt={'left'} src={GirlIcon} style={style.img} />
              <small>
                <p style={{ marginBottom: '-5px' }}>
                  <strong style={{ fontSize: '15px', color: 'white' }}>
                    LORIA ROIE GRACE MALINGAN
                  </strong>
                </p>
                <p style={{ marginBottom: '-3px' }}>BS COMPUTER SCIENCE</p>
                <p style={{ fontSize: '12px' }}>lnmalingan@up.edu.ph</p>
              </small>
            </center>
          </Column>
          <Column isSize="1/2">
            <center>
              <img alt={'right'} src={BoyIcon} style={style.img} />
              <small>
                <p style={{ marginBottom: '-5px' }}>
                  <strong style={{ fontSize: '15px', color: 'white' }}>
                    JASPER IAN ARQUILITA
                  </strong>
                </p>
                <p style={{ marginBottom: '-3px' }}>BS COMPUTER SCIENCE</p>
                <p style={{ fontSize: '12px' }}>jzarquilita@up.edu.ph</p>
              </small>
            </center>
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
          </Column>
          <Column isSize={'3'}>
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
          </Column>
          <Column isSize={'3'} isHidden={'mobile'}>
            <center>
              <a href={'https://expressjs.com/'} target={'_blank'}>
                <img
                  alt={'express'}
                  src={'https://i.cloudup.com/zfY6lL7eFa-3000x3000.png'}
                  style={{ marginTop: '20px', height: '40px', width: 'auto' }}
                />
              </a>
            </center>
          </Column>
          <Column isSize={'3'} isHidden={'desktop'}>
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
          </Column>
          <Column isSize={'3'}>
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
          </Column>
          <Column isSize={'3'}>
            <center>
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
          </Column>
          <Column isSize={'3'}>
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
          </Column>
        </Columns>
        <Columns style={style.appIcons}>
          <Column isSize={'3'}>
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
          </Column>
          <Column isSize={'3'} isHidden={'mobile'}>
            <center>
              <a href={'https://bulma.io/'} target={'_blank'}>
                <img
                  alt={'bulma'}
                  src={'https://bulma.io/images/bulma-logo.png'}
                  style={{ marginTop: '26px', height: '30px', width: 'auto' }}
                />
              </a>
            </center>
          </Column>
          <Column isSize={'3'} isHidden={'desktop'}>
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
          </Column>
          <Column isSize={'3'}>
            <center>
              <a href={'https://bloomer.js.org/'} target={'_blank'}>
                <img
                  alt={'bloomer'}
                  src={'https://bloomer.js.org/assets/logo.png'}
                  style={style.icon}
                />
              </a>
            </center>
          </Column>
          <Column isSize={'3'}>
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
          </Column>
          <Column isSize={'3'}>
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
          </Column>
          <Column isSize={'3'}>
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
          </Column>
        </Columns>
      </div>
    );
  }
}
