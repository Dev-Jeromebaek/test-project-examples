import React from 'react';
import DashboardCard from '../components/dashboard-list/DashboardCard';
import { Row, Container, Jumbotron } from 'reactstrap';
import { WettyConsumer } from '../Store';

const DashboardCardList = () => {
  return (
    <Container style={{ marginTop: '56px' }}>
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
                <Jumbotron>
                  <h2>대시보드 리스트가 존재하지 않습니다.</h2>
                  <h3>Admin으로 이동하여 대시보드를 생성해주세요.</h3>
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
