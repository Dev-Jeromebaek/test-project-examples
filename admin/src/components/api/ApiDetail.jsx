import React, { Component } from 'react';
import {
  Button,
  Alert,
  InputGroup,
  InputGroupText,
  Input,
  ButtonGroup,
  Card,
  CardBody,
  InputGroupAddon,
} from 'reactstrap';
import { WettyConsumer } from '../../Store';
import { NavLink } from 'react-router-dom';

export default class ApiDetail extends Component {
  state = {
    isUpdate: false,
    updatedApi: {},
  };

  makeRemovedAdditionalDescription = apiDetail => {
    const {
      additionalDescription,
      ...removedAdditionalDescription
    } = apiDetail;
    return removedAdditionalDescription;
  };

  checkKeyName = key => {
    switch (key) {
      case 'apiId': {
        key = 'API ID';
        break;
      }
      case 'apiName': {
        key = 'API 이름';
        break;
      }
      case 'requestUrl': {
        key = '요청 URL';
        break;
      }
      case 'httpMethod': {
        key = 'HTTP Method';
        break;
      }
      case 'returnType': {
        key = '리턴 타입';
        break;
      }
      case 'defaultDescription': {
        key = '설명';
        break;
      }
      default: {
        key = '추가 설명';
        break;
      }
    }

    return key;
  };

  updateApi = () => {
    this.setState({
      isUpdate: !this.state.isUpdate,
    });
  };

  handleChange = e => {
    this.setState({
      updatedApi: {
        ...this.props.apiDetail,
        additionalDescription: e.target.value,
      },
    });
  };

  render() {
    let { apiDetail } = this.props;

    if (!this.props.isMyApiDetail) {
      apiDetail = this.makeRemovedAdditionalDescription(apiDetail);
    }

    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <h3 className="mb-0">API Information</h3>
            {this.props.isMyApiDetail && (
              <div className="d-flex ml-auto">
                {this.state.isUpdate ? (
                  <WettyConsumer>
                    {value => {
                      return (
                        <div>
                          <NavLink
                            to="/api"
                            className="btn btn-secondary btn-sm mr-2"
                          >
                            목록
                          </NavLink>
                          <ButtonGroup size="sm">
                            <Button color="danger" onClick={this.updateApi}>
                              취소
                            </Button>
                            <Button
                              color="primary"
                              onClick={() => {
                                value.actions.updateApi(this.state.updatedApi);
                                this.updateApi();
                              }}
                            >
                              확인
                            </Button>
                          </ButtonGroup>
                        </div>
                      );
                    }}
                  </WettyConsumer>
                ) : (
                  <div className="d-flex ml-auto">
                    <NavLink
                      to="/api"
                      className="btn btn-secondary btn-sm mr-2"
                    >
                      목록
                    </NavLink>
                    <ButtonGroup size="sm">
                      <Button color="primary" onClick={this.updateApi}>
                        수정
                      </Button>
                      <Button color="danger">삭제</Button>
                    </ButtonGroup>
                  </div>
                )}
              </div>
            )}
          </div>
          <hr />
          {Object.keys(apiDetail).map(key => {
            if (key === 'isUsedApi') {
              return false;
            }

            return (
              <div key={key}>
                {key === 'additionalDescription' && (
                  <Alert color="info" isOpen={this.state.isUpdate}>
                    추가 설명만 변경할 수 있습니다.
                  </Alert>
                )}
                <InputGroup className="mb-3">
                  <InputGroupAddon
                    style={{ width: '150px' }}
                    addonType="prepend"
                  >
                    <InputGroupText className="w-100 bg-white font-weight-bold">
                      {this.checkKeyName(key)}
                    </InputGroupText>
                  </InputGroupAddon>
                  {key === 'additionalDescription' ? (
                    <textarea
                      className="form-control bg-white"
                      rows="6"
                      defaultValue={apiDetail[key]}
                      disabled={this.state.isUpdate ? false : true}
                      onChange={this.handleChange}
                    />
                  ) : (
                    <Input
                      type="text"
                      className="bg-white"
                      defaultValue={apiDetail[key]}
                      disabled
                    />
                  )}
                </InputGroup>
              </div>
            );
          })}
        </CardBody>
      </Card>
    );
  }
}
