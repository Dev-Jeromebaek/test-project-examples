import React, { Component } from 'react';
import ApiDetail from './ApiDetail';
import { WettyConsumer } from '../../Store';

import {
  UncontrolledCollapse,
  CardBody,
  Button,
  Card,
  Badge,
  Row,
  Col,
} from 'reactstrap';

class ApiTotalList extends Component {
  state = {
    isActive: false,
  };

  handleBtnActive = () => {
    // console.log('click');
    this.setState({
      isActive: !this.state.isActive,
    });
  };

  render() {
    const { api } = this.props;
    return (
      <div className="mb-3">
        <Button
          id={'toggler' + this.props.api.apiId}
          color="light"
          className={
            this.state.isActive
              ? 'mb-1 w-100 text-left container shadow active'
              : 'mb-1 w-100 text-left container shadow'
          }
          onClick={this.handleBtnActive}
        >
          <Row className="m-0">
            <Col>
              {api.httpMethod === 'GET' ? (
                <Badge color="primary" pill xs="12" sm="4" md="4" lg="3">
                  {api.httpMethod}
                </Badge>
              ) : (
                <Badge color="success" pill>
                  {api.httpMethod}
                </Badge>
              )}
            </Col>
            <Col xs="9" sm="9" md="9" lg="9">
              {api.requestUrl}
            </Col>
          </Row>
        </Button>

        <UncontrolledCollapse
          toggler={'#toggler' + this.props.api.apiId}
          className="shadow"
        >
          <Card>
            <CardBody>
              <WettyConsumer>
                {value => {
                  return <ApiDetail apiDetail={value.state.apiDetail} />;
                }}
              </WettyConsumer>
            </CardBody>
          </Card>
        </UncontrolledCollapse>
      </div>
    );
  }
}
export default ApiTotalList;
