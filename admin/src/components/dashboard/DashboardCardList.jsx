import React, { Component } from 'react';
import DashboardCard from '../dashboard/DashboardCard';
import { Row, Col } from 'reactstrap';
import { WettyConsumer } from '../../Store';
import DashboardModal from '../dashboard/DashboardModal';

const DashboardCardList = () => {
  return (
    <WettyConsumer>
      {value => {
        return (
          <Row>
            <Col xs="12" sm="6" md="4" lg="3" className="mt-4">
              <DashboardModal />
            </Col>
            {value.state.adminDashboardList.map((card, index) => {
              return (
                <DashboardCard
                  key={card.dashboardId}
                  card={card}
                  index={index}
                />
              );
            })}
          </Row>
        );
      }}
    </WettyConsumer>
  );
};

export default DashboardCardList;
