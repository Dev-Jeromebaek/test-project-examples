import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardGraphSection from '../pages/DashboardGraphSection';

class Dashboard extends Component {
  state = {
    dashboardId: parseInt(this.props.match.params.dashboardId, 10),
    isLoadPage: false,
    isSidebarHidden: false,
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

  async componentDidMount() {
    await window.addEventListener('resize', this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({ isSidebarHidden: window.innerWidth < 578 });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.match.params.dashboardId !== nextProps.match.params.dashboardId
    ) {
      this.setState({
        dashboardId: parseInt(nextProps.match.params.dashboardId, 10),
      });
    }
  }
  render() {
    return (
      <Fragment>
        <Container fluid>
          <Row>
            <Col
              sm="5"
              md="4"
              lg="3"
              xl="2"
              className={
                this.state.isSidebarHidden
                  ? 'overflow-y bg-light sidebar'
                  : 'overflow-y bg-light sidebar mt-56px'
              }
            >
              <Sidebar
                dashboardId={this.state.dashboardId}
                changeDashBoard={this.changeDashBoard}
              />
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
