import React, { Component } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div style={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              style={styles.menuButton}
              color="inherit"
              aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" style={styles.flex}>
              Title
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
