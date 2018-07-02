/* import react components here */
import React from 'react';
import Alert from 'react-s-alert';

/* these are react s alert elements */
import 'react-s-alert/dist/s-alert-default.css';
// import below the react s alert transitions you are to use
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

/* The primary purpose of this component is that 
to import the React sAlert module into our app */
class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <span>{this.props.children}</span>
        <Alert stack={{ limit: 3 }} />
      </div>
    );
  }
}

export default Main;
