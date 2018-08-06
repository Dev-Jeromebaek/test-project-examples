import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DashboardModalEditDashboard from './DashboardModalEditDashboard';
import DashboardModalEditGraph from './DashboardModalEditGraph';
import { modalContext } from '../../store/ModalStore';
import updateIcon from '../../public/icons/update.svg';

class DashboardModal extends React.Component {
  state = {
    modal: false,
    title: 'Dashboard수정',
    primaryBtn: 'Graph수정',
    secondaryBtn: '취소',
    isEditDashboard: true,
  };

  toggle = () => {
    this.setState({
      title: 'Dashboard수정',
      isEditDashboard: true,
      primaryBtn: 'Graph수정',
      secondaryBtn: '취소',
      modal: !this.state.modal,
    });
  };
  /**
   * Edit Modal 부분 Dashboard Store로 변경해야됨.
   */

  nextStep = () => {
    if (this.state.primaryBtn === 'Graph수정') {
      this.props.value.actions.editDashboard();
      this.setState({
        isEditDashboard: false,
        primaryBtn: '저장',
        secondaryBtn: 'Dashboard수정',
        title: 'Graph수정',
      });
    } else {
      this.props.value.actions.editGraph();
      this.toggle();
    }
  };

  previous = () => {
    this.setState({
      isEditDashboard: true,
      primaryBtn: 'Graph수정',
      secondaryBtn: '취소',
      title: 'Dashboard수정',
    });
  };

  render() {
    const editPossibleToggling = (condition, a, b) => {
      if (condition) {
        return a;
      }
      return b;
    };

    const {
      isEditDashboard,
      modal,
      title,
      primaryBtn,
      secondaryBtn,
    } = this.state;

    return (
      <div className="h-100">
        <img
          src={updateIcon}
          width="15"
          height="15"
          alt="Update icon."
          onClick={this.toggle}
        />
        <Modal
          isOpen={modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody>
            {editPossibleToggling(
              isEditDashboard,
              <DashboardModalEditDashboard
                dashboardData={this.props.dashboardData}
              />,
              <DashboardModalEditGraph
                dashboardData={this.props.dashboardData.graphCollectionList}
              />,
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
              {secondaryBtn}
            </Button>
            <Button color="primary" onClick={this.nextStep}>
              {primaryBtn}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default modalContext(DashboardModal);
