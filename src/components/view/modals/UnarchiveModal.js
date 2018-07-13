/* import React components here */
import React, { Component } from 'react';
/* import bulma components */
import {
  Button,
  Notification,
  Modal,
  ModalContent,
  ModalClose,
  ModalBackground
} from 'bloomer';

/* insert styles here */
const style = {
  successButton: {
    marginTop: '10px',
    marginLeft: '10px',
    marginRight: '10px',
    width: '20%',
    backgroundColor: '#57bc90',
    color: 'white'
  },
  errorButton: {
    marginTop: '10px',
    marginLeft: '10px',
    marginRight: '10px',
    width: '20%',
    backgroundColor: '#ef6f6c',
    color: 'white'
  }
};

export default class UnarchiveModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Modal isActive={this.props.active}>
          <ModalBackground
            data-value={'unarchive'}
            onClick={this.props.close}
          />
          <ModalContent>
            <Notification>
              <center>
                <p>This will unarchive the image. Continue?</p>
                <Button
                  style={style.successButton}
                  onClick={this.props.unarchive}>
                  Yes
                </Button>
                <Button
                  data-value={'unarchive'}
                  style={style.errorButton}
                  onClick={this.props.close}>
                  No
                </Button>
              </center>
            </Notification>
          </ModalContent>
          <ModalClose data-value={'unarchive'} onClick={this.props.close} />
        </Modal>
      </div>
    );
  }
}
