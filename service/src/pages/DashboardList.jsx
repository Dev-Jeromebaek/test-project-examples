import React from 'react';
import DashboardCard from '../components/dashboard-list/DashboardCard';
import { Row, Container, Jumbotron } from 'reactstrap';
import { WettyConsumer } from '../Store';

const DashboardCardList = () => {
  return (
    <Container>
      <WettyConsumer>
        {value => {
          return (
            <Row>
              {value.state.dashboardList ? (
                value.state.dashboardList.map((card, index) => {
                  return (
                    <DashboardCard
                      key={card.dashboardId}
                      card={card}
                      index={index}
                    />
                  );
                })
              ) : (
                <Jumbotron className="m-auto">
                  <h1 className="display-3">대시보드가 존재하지 않습니다.</h1>
                  <hr />
                  <h1 className="display-5">
                    <a href="#">Admin</a>으로 이동해서 대시보드를 만드세요!
                  </h1>
                </Jumbotron>
              )}
            </Row>
          );
        }}
      </WettyConsumer>
    </Container>
  );
};

export default DashboardCardList;
