import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardGraphSection from '../pages/DashboardGraphSection';

class Dashboard extends Component {
  state = {
    dashboardId: this.props.match.params.dashboardId,
    isLoadPage: true,
  };

  changeDashBoard = id => {
    this.setState({
      isLoadPage: false,
    });
    this.setState({
      dashboardId: id,
      isLoadPage: true,
    });
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.match.params.dashboardId !== nextProps.match.params.dashboardId
    ) {
      this.setState({
        dashboardId: nextProps.match.params.dashboardId,
      });
    }
  }
  render() {
    console.log(this.props.match.params.dashboardId);
    return (
      this.state.isLoadPage && (
        <Fragment>
          <Container fluid>
            <Row>
              <Col
                style={{ marginTop: '56px' }}
                sm="5"
                md="4"
                lg="3"
                xl="2"
                className="overflow-y bg-light sidebar"
              >
                <Sidebar
                  dashboardId={this.state.dashboardId}
                  changeDashBoard={this.changeDashBoard}
                />
              </Col>
              <Col sm="7" md="8" lg="9" xl="10" className="ml-auto">
                <DashboardGraphSection
                  dashboardId={this.props.match.params.dashboardId}
                />
              </Col>
            </Row>
          </Container>
        </Fragment>
      )
    );
  }
}

export default Dashboard;
