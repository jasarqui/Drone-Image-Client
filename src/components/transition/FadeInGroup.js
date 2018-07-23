import { CSSTransitionGroup } from 'react-css-transition';
import React from 'react';
import FadeIn from './FadeIn';

const FadeInGroup = props => (
  <CSSTransitionGroup {...props}>
    {React.Children.map(props.children, child => <FadeIn>{child}</FadeIn>)}
  </CSSTransitionGroup>
);

export default FadeInGroup;
