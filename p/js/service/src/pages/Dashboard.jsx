import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardGraphSection from '../pages/DashboardGraphSection';

class Dashboard extends Component {
  state = {
    dashboardId: this.props.match.params.dashboardId,
    cycleTime: 1,
  };

  changeDashBoard = id => {
    this.setState({
      dashboardId: id,
      cycleTime: 1,
    });
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.match.params.dashboardId !== nextProps.match.params.dashboardId
    ) {
      this.setState({
        dashboardId: nextProps.match.params.dashboardId,
        cycleTime: 1,
      });
    }
  }
  initialCycle = () => {
    this.setState({
      cycleTime: 1,
    });
  };

  cycleTimmer = () => {
    this.setState({
      cycleTime: this.state.cycleTime - 1,
    });
  };

  setCycleTime = time => {
    this.setState({
      cycleTime: time,
    });
  };

  render() {
    console.log('Dashboard.jsx');
    console.log(this.props.match.params.dashboardId);
    return (
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
              <Sidebar changeDashBoard={this.changeDashBoard} />
            </Col>
            <Col sm="7" md="8" lg="9" xl="10" className="ml-auto">
              <DashboardGraphSection
                dashboardId={this.state.dashboardId}
                cycleTime={this.state.cycleTime}
                initialCycle={this.initialCycle}
                cycleTimmer={this.cycleTimmer}
                setCycleTime={this.setCycleTime}
              />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Dashboard;
