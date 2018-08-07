import React, { Component, Fragment } from 'react';

import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import ApiMyUseFrame from '../components/api/ApiMyUseFrame';
import { apiContext } from '../store/ApiStore';
import ApiRightContainer from '../components/api/ApiRightContainer';
import ApiAddModal from '../components/api/ApiAddModal';
import ApiDetailFrame from '../components/api/ApiDetailFrame';
import ApiTotalFrame from '../components/api/ApiTotalFrame';
import { Route } from 'react-router-dom';
import Err from '../pages/Err';

class Api extends Component {
  state = {
    isSidebarHidden: false,
    isMyApi: true,
    isApiList: false,
    err: 0,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({ isSidebarHidden: window.innerWidth < 768 });
  }

  changeMyApiTab = () => {
    this.setState({
      isMyApi: true,
      isApiList: false,
    });
  };

  changeApiListTab = () => {
    this.setState({
      isMyApi: false,
      isApiList: true,
    });
  };

  makeRightViewWhenResponsive = () => {
    let rightView = null;

    if (this.state.isSidebarHidden && this.state.isMyApi) {
      rightView = (
        <Route
          path="/api/:id"
          render={props => (
            <ApiDetailFrame
              {...props}
              isResponsive={true}
              useApiId={this.state.myApiId}
              checkErr={this.checkErr}
            />
          )}
        />
      );
    } else if (this.state.isSidebarHidden && this.state.isApiList) {
      rightView = <div />;
    } else {
      rightView = (
        <ApiRightContainer
          useApiId={this.state.myApiId}
          checkErr={this.checkErr}
        />
      );
    }

    return rightView;
  };

  makeLeftViewWhenResponsive = (myApiList, { createApi, deleteApi }) => {
    let leftView = null;

    if (this.state.isSidebarHidden && this.state.isMyApi) {
      leftView = (
        <Fragment>
          <div className="mb-3 d-flex align-items-center">
            <div className="mr-2 w-100">
              {
                <ApiMyUseFrame
                  history={this.props.history}
                  myApiList={myApiList}
                  onCreate={createApi}
                  onRemove={deleteApi}
                  isResponsive={true}
                  onChangeId={this.onMyApiClickFunction}
                />
              }
            </div>
            <ApiAddModal />
          </div>
        </Fragment>
      );
    } else if (this.state.isSidebarHidden && this.state.isApiList) {
      leftView = (
        <Fragment>
          <ApiTotalFrame />
        </Fragment>
      );
    } else {
      leftView = (
        <Fragment>
          {
            <ApiMyUseFrame
              history={this.props.history}
              myApiList={myApiList}
              onCreate={createApi}
              onRemove={deleteApi}
              onChangeId={this.onMyApiClickFunction}
            />
          }
        </Fragment>
      );
    }
    return leftView;
  };

  checkErr = httpCode => {
    this.setState({
      err: httpCode,
    });
  };

  render() {
    return (
      <Container>
        {this.state.isSidebarHidden && (
          <Nav className="mb-3 d-flex justify-content-end" tabs>
            <NavItem>
              <NavLink
                onClick={this.changeMyApiTab}
                className={
                  this.state.isMyApi
                    ? 'cursor-pointer active'
                    : 'cursor-pointer'
                }
              >
                My API
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={this.changeApiListTab}
                className={
                  this.state.isApiList
                    ? 'cursor-pointer active'
                    : 'cursor-pointer'
                }
              >
                API List
              </NavLink>
            </NavItem>
          </Nav>
        )}
        {this.state.err !== 0 ? (
          <Err httpCode={this.state.err} />
        ) : (
          <Row>
            <Col md="4" lg="3">
              {this.makeLeftViewWhenResponsive(
                this.state.myApiList,
                this.props.value.actions,
              )}
              {!this.state.isSidebarHidden && (
                <div className="p-4 d-flex align-items-center justify-content-center">
                  <ApiAddModal />
                </div>
              )}
            </Col>
            <Col md="8" lg="9">
              {this.makeRightViewWhenResponsive()}
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

export default apiContext(Api);
