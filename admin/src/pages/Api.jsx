import React, { Component } from 'react';

import { Container, Row, Col } from 'reactstrap';
import ApiMyUseFrame from '../components/api/ApiMyUseFrame';
import { WettyConsumer } from '../Store';
import ApiRightContainer from '../components/api/ApiRightContainer';
import ApiAddModal from '../components/api/ApiAddModal';

class Api extends Component {
  render() {
    return (
      <WettyConsumer>
        {value => {
          const {
            actions,
            state: { adminApiList },
          } = value;
          return (
            <Container className="container-size">
              <Row className="h-100 w-100">
                <Col
                  xs="12"
                  sm="4"
                  md="4"
                  lg="3"
                  className="border bg-secondary h-100 bg-light rounded"
                >
                  <div className="h-10 d-flex justify-content-center align-items-center border-bottom">
                    <h4>현재 사용중 API</h4>
                  </div>
                  <div className="h-80 pt-3 pb-3 over-scroll">
                    <ApiMyUseFrame
                      apiList={adminApiList}
                      onCreate={actions.handleCreateApi}
                      onRemove={actions.handleRemoveApi}
                    />
                  </div>
                  <div className="h-10 d-flex justify-content-center align-items-center border-top">
                    <ApiAddModal />
                  </div>
                </Col>
                <Col xs="12" sm="8" md="8" lg="9" className="over-scroll">
                  <ApiRightContainer />
                </Col>
              </Row>
            </Container>
          );
        }}
      </WettyConsumer>
    );
  }
}

export default Api;
