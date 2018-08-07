import React, { Component, Fragment } from 'react';
import DashboardCard from '../dashboard/DashboardCard';
import { Row, Col } from 'reactstrap';
import { dashboardContext } from '../../store/DashboardStore';
import DashboardModal from '../dashboard/DashboardModal';
import GlobalSpinner from '../global/GlobalSpinner';
import Err from '../../pages/Err';

class DashboardCardList extends Component {
  state = {
    err: 0,
  };

  async componentDidMount() {
    try {
      await this.props.value.actions.getDashboardList();
    } catch (err) {
      this.setState({
        err: err.response.status,
      });
    }
  }

  render() {
    return this.state.err !== 0 ? (
      <Fragment>
        <Err httpCode={this.state.err} />
      </Fragment>
    ) : this.props.value.state.isLoading ? (
      <GlobalSpinner />
    ) : (
      <Row>
        <Col xs="12" sm="6" md="4" lg="3" className="mt-4">
          <DashboardModal />
        </Col>
        {this.props.value.state.dashboardList.map((card, index) => {
          return (
            <DashboardCard key={card.dashboardId} card={card} index={index} />
          );
        })}
      </Row>
    );
  }
}

export default dashboardContext(DashboardCardList);
