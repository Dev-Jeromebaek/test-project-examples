import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { WettyConsumer } from '../../Store';
import DashboardModalFirstView from './DashboardModalFirstView';
import DashboardModalSecondView from './DashboardModalSecondView';

export default class DashboardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: 'Dashboard추가',
      step: 1,
    };

    this.toggle = this.toggle.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.previous = this.previous.bind(this);
  }

  toggle() {
    this.setState({
      title: 'Dashboard추가',
      primaryBtn: 'Next',
      secondaryBtn: 'Cancle',
      step: 1,
      modal: !this.state.modal,
    });
  }

  nextStep() {
    this.setState({
      step: 2,
    });
  }

  previous() {
    this.setState({
      step: 1,
    });
  }

  render() {
    return (
      <WettyConsumer>
        {value => {
          return (
            <div>
              <Button color="danger" onClick={this.toggle}>
                {this.props.buttonLabel}
              </Button>
              <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.toggle}>
                  {this.state.title}
                </ModalHeader>
                <ModalBody>
                  {this.state.step === 1 ? (
                    <DashboardModalFirstView />
                  ) : (
                    <DashboardModalSecondView />
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="secondary"
                    onClick={
                      this.state.step === 1 ? this.toggle : this.previous
                    }
                  >
                    {this.state.step === 1 ? 'Cancel' : 'Previous'}
                  </Button>
                  <Button color="primary" onClick={this.nextStep}>
                    {this.state.step === 1 ? 'Next' : 'Save'}
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          );
        }}
      </WettyConsumer>
    );
  }
}
