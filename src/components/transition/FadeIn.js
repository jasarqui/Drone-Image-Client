import { CSSTransition, transit } from 'react-css-transition';
import React from 'react';

const FadeIn = props => (
  <CSSTransition
    {...props}
    defaultStyle={{ opacity: 0 }}
    enterStyle={{
      opacity: transit(1.0, 300, 'ease-in-out'),
      transform: transit('translate(0px, 20px)', 300, 'ease-in-out')
    }}
    activeStyle={{ opacity: 1.0, transform: 'translate(0px, 20px)' }}
  />
);

export default FadeIn;
