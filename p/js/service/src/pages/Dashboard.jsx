import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardGraphSection from '../pages/DashboardGraphSection';

class Dashboard extends Component {
  state = {
    dashboardId: 1010,
  };

  // componentDidMount() {
  //   this.setState({
  //     dashboardId: this.props.match.params.dashboardId,
  //   });
  // }
  // selectDashBoard = id => {
  //   this.setState({
  //     dashboardId: id,
  //   });
  // };
  render() {
    // console.log(this.props.match.params.dashboardId);
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
              <Sidebar dashboardId={this.state.dashboardId} />
            </Col>
            <Col sm="7" md="8" lg="9" xl="10" className="ml-auto">
              <DashboardGraphSection dashboardId={this.state.dashboardId} />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Dashboard;
