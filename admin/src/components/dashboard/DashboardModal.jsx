import React from 'react';
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { WettyConsumer } from '../../Store';
import createIcon from '../../public/icons/create.svg';
import DashboardModalEditDashboard from './DashboardModalEditDashboard';
import DashboardModalEditGraph from './DashboardModalEditGraph';

export default class DashboardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: 'Dashboard추가',
      isEditDashboard: true,
      isHover: false,
    };
  }

  toggle = () => {
    this.setState({
      title: 'Dashboard추가',
      primaryBtn: 'Next',
      secondaryBtn: 'Cancle',
      isEditDashboard: true,
      modal: !this.state.modal,
    });
  };

  nextStep = () => {
    this.setState({
      isEditDashboard: false,
    });
  };

  previous = () => {
    this.setState({
      isEditDashboard: true,
    });
  };

  mouseEnter = () => {
    this.setState({
      isHover: true,
    });
  };

  mouseLeave = () => {
    this.setState({
      isHover: false,
    });
  };

  render() {
    const editPossibleToggling = (condition, a, b) => {
      if (condition) {
        return a;
      }
      return b;
    };

    const isEditDashboard = this.state.isEditDashboard;

    return (
      <WettyConsumer>
        {value => {
          return (
            <div className="h-100">
              <Card
                className={
                  this.state.isHover
                    ? 'h-100 bg-light cursor-pointer shadow'
                    : 'h-100 cursor-pointer shadow'
                }
                onClick={this.toggle}
                onMouseLeave={this.mouseLeave}
                onMouseEnter={this.mouseEnter}
              >
                <CardBody className="d-flex justify-content-center align-items-center">
                  <img
                    src={createIcon}
                    width="50"
                    height="50"
                    alt="Create icon."
                  />
                </CardBody>
              </Card>
              <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.toggle}>
                  {this.state.title}
                </ModalHeader>
                <ModalBody>
                  {editPossibleToggling(
                    isEditDashboard,
                    <DashboardModalEditDashboard />,
                    <DashboardModalEditGraph />,
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="secondary"
                    onClick={editPossibleToggling(
                      isEditDashboard,
                      this.toggle,
                      this.previous,
                    )}
                  >
                    {editPossibleToggling(
                      isEditDashboard,
                      'Cancel',
                      'Previous',
                    )}
                  </Button>
                  <Button color="primary" onClick={this.nextStep}>
                    {editPossibleToggling(isEditDashboard, 'Next', 'Save')}
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
