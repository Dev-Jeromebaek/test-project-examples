import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import GlobalModalInput from '../global/GlobalModalInput';
import GlobalSelectBar from '../global/GlobalSelectBar';
import { WettyConsumer } from '../../Store';

export default class ApiAddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      inputValue: {},
      selectedApi: 'Api를 선택하세요.',
    };

    this.toggle = this.toggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  toggle() {
    this.setState({
      inputValue: {},
      selectedApi: 'Api를 선택하세요.',
      modal: !this.state.modal,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    if (value.length > 40) {
      alert('너무 길어.');
    } else {
      this.setState({
        inputValue: { ...this.state.inputValue, [name]: value },
      });
    }
  }

  handleSelectChange(event) {
    const target = event.target;
    const value = target.innerText;

    this.setState({
      inputValue: { ...this.state.inputValue, selectApi: value },
      selectedApi: value,
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
                <ModalHeader toggle={this.toggle}>API 추가</ModalHeader>
                <ModalBody>
                  <GlobalSelectBar
                    title="Available API Lists"
                    listTitle="API Lists"
                    apiList={value.state.adminApiList}
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
