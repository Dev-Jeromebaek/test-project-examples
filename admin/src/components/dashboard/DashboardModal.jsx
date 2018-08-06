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
import DashboardModalEditDashboard from './DashboardModalEditDashboard';
import DashboardModalEditGraph from './DashboardModalEditGraph';
import { dashboardContext } from '../../store/DashboardStore';
import createIcon from '../../public/icons/create.svg';

class DashboardModal extends React.Component {
  state = {
    modal: false,
    title: 'Dashboard추가',
    primaryBtn: '다음',
    secondaryBtn: '취소',
    isEditDashboard: true,
  };

  toggle = () => {
    this.setState({
      title: 'Dashboard추가',
      isEditDashboard: true,
      primaryBtn: '다음',
      secondaryBtn: '취소',
      modal: !this.state.modal,
    });
  };

  nextStep = async () => {
    if (this.state.primaryBtn === '다음') {
      const statusFlag = await this.props.value.actions.createDashboard();

      if (statusFlag) {
        this.setState({
          isEditDashboard: false,
          primaryBtn: '완료',
          secondaryBtn: '이전',
          title: 'Graph추가',
        });
      } else {
        alert('모든 정보를 입력하세요.');
      }
    } else {
      this.props.value.actions.completeAddingDashboard();
      this.toggle();
    }
  };

  previous = () => {
    alert('이전으로 갈 수 없습니다. 일단 막아놨음.');
    // this.setState({
    //   isEditDashboard: true,
    //   primaryBtn: '다음',
    //   secondaryBtn: '취소',
    //   title: 'Dashboard추가',
    // });
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
        <Card
          className="card-hover h-100 cursor-pointer shadow"
          onClick={this.toggle}
        >
          <CardBody className="d-flex justify-content-center align-items-center">
            <img src={createIcon} width="50" height="50" alt="Create icon." />
          </CardBody>
        </Card>
        <Modal
          keyboard={false}
          isOpen={modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
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

export default dashboardContext(DashboardModal);
