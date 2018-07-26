import React, { Component } from 'react';
import updateIcon from '../../public/icons/update.svg';
import deleteIcon from '../../public/icons/delete.svg';

import {
  Col,
  Card,
  CardFooter,
  CardText,
  CardBody,
  CardHeader,
} from 'reactstrap';
import DashboardGraphPreviewList from './DashboardGraphPreviewList';
import { WettyConsumer } from '../../Store';

export default class DashboardCard extends Component {
  state = {
    isHovered: false,
  };

  mouseEnter = () => {
    this.setState({
      isHovered: true,
    });
  };

  mouseLeave = () => {
    this.setState({
      isHovered: false,
    });
  };

  render() {
    return (
      <WettyConsumer>
        {value => {
          return (
            <Col xs="12" sm="6" md="4" lg="3" className="mt-4">
              <Card
                className={
                  this.state.isHovered
                    ? 'cursor-pointer bg-light action h-100 shadow'
                    : 'cursor-pointer h-100 shadow'
                }
                onMouseLeave={this.mouseLeave}
                onMouseEnter={this.mouseEnter}
                onClick={value.actions.readCard}
              >
                <CardHeader className="d-flex">
                  <div className="mr-auto font-weight-bold">
                    {this.props.card.dashboardName}
                  </div>
                  <div
                    className="mr-2 cursor-pointer"
                    onClick={value.actions.updateCard}
                  >
                    <img
                      src={updateIcon}
                      width="15"
                      height="15"
                      alt="Update icon."
                    />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={value.actions.deleteCard}
                  >
                    <img
                      src={deleteIcon}
                      width="15"
                      height="15"
                      alt="Delete icon."
                    />
                  </div>
                </CardHeader>
                <CardBody>
                  <CardText className="text-justify">
                    {this.props.card.dashboardDescription}
                  </CardText>
                </CardBody>
                <CardFooter>
                  <DashboardGraphPreviewList
                    dashboardGraphPreviewList={this.props.card.graphCollection}
                  />
                </CardFooter>
              </Card>
            </Col>
          );
        }}
      </WettyConsumer>
    );
  }
}
