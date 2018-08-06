import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import deleteIcon from '../../public/icons/delete.svg';

export default class ConfirmModal extends Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    const { goApi, deleteMyApi, deleteDashboard } = this.props;

    return (
      <Fragment>
        {this.props.isHovered && (
          <button
            type="button"
            className="close"
            onMouseEnter={this.props.onDelBtnEnterHandler}
            onMouseLeave={this.props.onDelBtnLeaveHandler}
            onClick={e => {
              this.toggle();
              e.stopPropagation();
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        )}

        {this.props.isNavLink && (
          <Button color="danger" onClick={this.toggle}>
            삭제
          </Button>
        )}

        {this.props.isCard && (
          <img
            src={deleteIcon}
            width="15"
            height="15"
            alt="Delete icon."
            onClick={e => {
              this.toggle();
              e.stopPropagation();
            }}
          />
        )}
        <Modal isOpen={this.state.modal} toggle={this.state.toggle}>
          <ModalHeader toggle={this.state.toggle}>Warning!</ModalHeader>
          <ModalBody>
            {(this.props.isHovered || this.props.isNavLink) &&
              '사용 중인 API를 삭제하면, 추가했던 그래프들이 모두 삭제됩니다. 그래도 삭제하시겠습니까?'}
            {this.props.isCard &&
              '사용 중인 대시보드를 삭제하면, 추가했던 API와 그래프들이 모두 삭제됩니다. 그래도 삭제하시겠습니까?'}
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={e => {
                this.toggle();
                e.stopPropagation();
              }}
            >
              취소
            </Button>{' '}
            {this.props.isNavLink && (
              <NavLink
                to="/api"
                className="btn btn-danger"
                onClick={e => {
                  this.toggle();
                  deleteMyApi();
                  e.stopPropagation();
                }}
              >
                삭제
              </NavLink>
            )}
            {this.props.isHovered && (
              <Button
                color="danger"
                onClick={e => {
                  this.toggle();
                  deleteMyApi();
                  goApi();
                  e.stopPropagation();
                }}
              >
                삭제
              </Button>
            )}
            {this.props.isCard && (
              <Button
                color="danger"
                onClick={e => {
                  this.toggle();
                  deleteDashboard();
                  e.stopPropagation();
                }}
              >
                삭제
              </Button>
            )}
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}
