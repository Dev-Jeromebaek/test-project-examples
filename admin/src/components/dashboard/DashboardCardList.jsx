import React, { Component } from 'react';
import DashboardCard from '../dashboard/DashboardCard';
import { Row, Col, Card, CardBody } from 'reactstrap';
import createIcon from '../../public/icons/create.svg';
import { WettyConsumer } from '../../Store';

export default class DashboardCardList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHover: false,
    };
  }

  mouseEnter = () => {
    this.setState({
      isHover: true,
    });
  };

  mouseLeave = () => {
    this.setState({
      isHover: false,
    });
  };

  render() {
    return (
      <WettyConsumer>
        {value => {
          return (
            <Row>
              <Col xs="12" sm="6" md="4" lg="3" className="mt-4">
                <Card
                  className={
                    this.state.isHover
                      ? 'h-100 bg-light cursor-pointer shadow'
                      : 'h-100 cursor-pointer shadow'
                  }
                  onClick={value.actions.createCard}
                  onMouseLeave={this.mouseLeave}
                  onMouseEnter={this.mouseEnter}
                >
                  <CardBody className="d-flex justify-content-center align-items-center">
                    <img
                      src={createIcon}
                      width="50"
                      height="50"
                      alt="Create icon."
                    />
                  </CardBody>
                </Card>
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
  }
}
