import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import GlobalModalInput from '../global/GlobalModalInput';
import GlobalSelectBar from '../global/GlobalSelectBar';
import { WettyConsumer } from '../../Store';
import createIcon from '../../public/icons/create.svg';

export default class ApiAddModal extends React.Component {
  state = {
    modal: false,
    inputValue: {},
    selectedApi: 'Api를 선택하세요.',
  };

  toggle = () => {
    this.setState({
      inputValue: {},
      selectedApi: 'Api를 선택하세요.',
      modal: !this.state.modal,
    });
  };

  handleInputChange = ({ target }) => {
    const { name, type, checked, value } = target;
    const inputData = type === 'checkbox' ? checked : value;

    if (inputData.length > 40) {
      alert('너무 길어.');
    } else {
      this.setState({
        inputValue: { ...this.state.inputValue, [name]: inputData },
      });
    }
  };

  handleSelectChange = ({ target }) => {
    const { innerText } = target;
    this.setState({
      inputValue: { ...this.state.inputValue, selectApi: innerText },
      selectedApi: innerText,
    });
  };

  render() {
    return (
      <WettyConsumer>
        {value => {
          return (
            <div>
              <img
                src={createIcon}
                wdith="40"
                height="40"
                alt=".."
                className="shadow rounded-circle cursor-pointer"
                onClick={this.toggle}
                // onCreate={actions.handleCreateApi}
              />
              <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.toggle}>API 추가</ModalHeader>
                <ModalBody>
                  <GlobalSelectBar
                    title="Available API Lists"
                    listTitle="API Lists"
                    dataList={value.state.adminApiList}
                    handleSelectChange={this.handleSelectChange}
                    selectedData={this.state.selectedApi}
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
                    name="apiDesc"
                    handleInputChange={this.handleInputChange}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() =>
                      value.actions.saveAvailableApi(this.state.inputValue)
                    }
                  >
                    추가하기
                  </Button>
                  <Button color="secondary" onClick={this.toggle}>
                    취소
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
