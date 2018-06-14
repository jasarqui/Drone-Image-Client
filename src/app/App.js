import React, { Component } from 'react';

/* import <Component> from '../features/<component>/<filename>'*/
import Navbar from '../components/access/Navbar';

import '../assets/index.css';

/* This is where we will handle page redirection */
export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        {/* Navbars should be here */}
        {/* Components here */}
      </div>
    );
  }
}
