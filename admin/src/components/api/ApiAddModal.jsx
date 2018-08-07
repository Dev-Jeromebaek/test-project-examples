import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import GlobalModalInput from '../global/GlobalModalInput';
import GlobalSelectBar from '../global/GlobalSelectBar';
import { apiContext } from '../../store/ApiStore';
import createIcon from '../../public/icons/create.svg';

class ApiAddModal extends React.Component {
  state = {
    modal: false,
    inputValue: {},
    selectedApi: 'Api를 선택하세요.',
    selectApiId: '',
  };

  async componentDidMount() {
    await this.props.value.actions.getUnusedApiList();
  }

  toggle = () => {
    this.setState({
      inputValue: {},
      selectedApi: 'Api를 선택하세요.',
      selectApiId: '',
      modal: !this.state.modal,
    });
  };

  handleInputChange = ({ target }) => {
    const { name, type, checked, value } = target;
    const inputData = type === 'checkbox' ? checked : value;

    if (inputData.length >= 20) {
      alert('너무 길어.');
    } else {
      this.setState({
        inputValue: { ...this.state.inputValue, [name]: inputData },
      });
    }
  };

  handleSelectChange = ({ target }) => {
    const { innerText, id } = target;
    this.setState({
      inputValue: { ...this.state.inputValue, apiId: id },
      selectedApi: innerText,
    });
  };

  checkInputValue = () => {
    const { inputValue } = this.state;
    const { apiName, additionalDescription, apiId } = inputValue;

    if (
      apiName === undefined ||
      additionalDescription === undefined ||
      apiId === undefined
    ) {
      alert('모든 정보를 입력하세요.');
    } else {
      this.props.value.actions.saveAvailableApi(inputValue);
      this.toggle();
    }
  };

  render() {
    const { modal, selectedApi } = this.state;
    const { className } = this.props;
    const { unusedApiList } = this.props.value.state;

    return (
      <div>
        <div className="d-flex justify-content-center align-items-center">
          <img
            src={createIcon}
            wdith="40"
            height="40"
            alt=".."
            className="shadow rounded-circle cursor-pointer"
            onClick={this.toggle}
            // onCreate={actions.handleCreateApi}
          />
        </div>
        <Modal
          keyboard={false}
          isOpen={modal}
          toggle={this.toggle}
          className={className}
        >
          <ModalHeader toggle={this.toggle}>API 추가</ModalHeader>
          <ModalBody>
            <GlobalSelectBar
              title="Available API Lists"
              listTitle="API Lists"
              dataList={unusedApiList}
              handleSelectChange={this.handleSelectChange}
              selectedData={selectedApi}
            />
            <GlobalModalInput
              inputTitle="API Name"
              inputPlaceholder="사용할 API 이름을 입력하세요."
              name="apiName"
              handleInputChange={this.handleInputChange}
            />
            <GlobalModalInput
              inputTitle="API Description"
              inputPlaceholder="API의 간단한 설명을 작성해주세요."
              name="additionalDescription"
              handleInputChange={this.handleInputChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.checkInputValue}>
              추가하기
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              취소
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default apiContext(ApiAddModal);
