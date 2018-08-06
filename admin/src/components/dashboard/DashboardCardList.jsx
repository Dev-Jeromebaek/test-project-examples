import React, { Component } from 'react';
import DashboardCard from '../dashboard/DashboardCard';
import { Row, Col } from 'reactstrap';
import { dashboardContext } from '../../store/DashboardStore';
import DashboardModal from '../dashboard/DashboardModal';
import GlobalSpinner from '../global/GlobalSpinner';

class DashboardCardList extends Component {
  async componentDidMount() {
    await this.props.value.actions.getDashboardList();
  }

  render() {
    return this.props.value.state.isLoading ? (
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
