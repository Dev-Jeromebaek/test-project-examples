import React, { Component } from 'react';

import { Container, Row, Col } from 'reactstrap';
import ApiMyUseFrame from '../components/api/ApiMyUseFrame';
import { WettyConsumer } from '../Store';
import createIcon from '../public/icons/create.svg';
import ApiRightContainer from '../components/api/ApiRightContainer';

class Api extends Component {
  render() {
    const ContainerStyle = {
      width: '100vw',
      height: '83vh',
    };
    const overScroll = {
      overflowY: 'auto',
    };
    return (
      <WettyConsumer>
        {value => {
          const {
            handleApiModalOpen,
            handleCreateApi,
            handleRemoveApi,
          } = value;
          // const { ApiLists } = value.state;
          const { adminApiList } = value.state;
          return (
            <Container style={ContainerStyle}>
              <Row className="h-100 w-100">
                <Col
                  xs="12"
                  sm="4"
                  md="4"
                  lg="3"
                  className="border bg-secondary h-100 bg-light"
                >
                  <div className="h-10 d-flex justify-content-center align-items-center border-bottom">
                    현재 사용중 API
                  </div>
                  <div className="h-80 pt-3 pb-3" style={overScroll}>
                    <ApiMyUseFrame
                      // apiList={ApiLists}
                      apiList={adminApiList}
                      onCreate={handleCreateApi}
                      onRemove={handleRemoveApi}
                    />
                  </div>
                  <div className="h-10 d-flex justify-content-center align-items-center border-top">
                    <img
                      src={createIcon}
                      wdith="40"
                      height="40"
                      alt=".."
                      className="shadow rounded-circle cursor-pointer"
                      onClick={handleApiModalOpen}
                      // onCreate={this.handleCreateApi}
                    />
                  </div>
                </Col>
                <Col xs="12" sm="8" md="8" lg="9" style={overScroll}>
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
