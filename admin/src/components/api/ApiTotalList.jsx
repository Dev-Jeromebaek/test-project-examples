import React, { Component } from 'react';
import {
  UncontrolledCollapse,
  Button,
  CardBody,
  Card,
  Badge,
  Row,
  Col,
} from 'reactstrap';

class ApiTotalList extends Component {
  state = {
    toggelr: 'toggler' + this.props.api.apiId,
    matchToggler: '#toggler' + this.props.api.apiId,
  };
  render() {
    const { api } = this.props;
    return (
      <div className="mb-3">
        <Button
          id={this.state.toggelr}
          className="mb-1 w-100 text-left container shadow btn-light"
        >
          <Row className="m-0">
            <Col xs="1" sm="1" md="1" lg="1">
              {api.isUsedApi ? 'Use ' : 'Not '}
            </Col>
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
          toggler={this.state.matchToggler}
          className="shadow"
        >
          <Card>
            <CardBody>{api.apiName}</CardBody>
          </Card>
        </UncontrolledCollapse>
      </div>
    );
  }
}
export default ApiTotalList;
