import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Col,
  Card,
  CardFooter,
  CardText,
  CardBody,
  CardHeader,
} from 'reactstrap';
import DashboardGraphPreviewList from './DashboardGraphPreviewList';

const DashboardCard = ({ card }) => {
  return (
    <Col xs="12" sm="6" md="4" lg="3" className="mt-4">
      <NavLink
        className="text-decoration-hover-none text-dark"
        to={`/dashboard/${card.dashboardId}`}
      >
        <Card className="hover-bg-light card cursor-pointer h-100 shadow">
          <CardHeader className="font-weight-bold">
            {card.dashboardName}
          </CardHeader>
          <CardBody>
            <CardText className="text-justify">
              {card.dashboardDescription}
            </CardText>
          </CardBody>
          <CardFooter>
            <DashboardGraphPreviewList
              dashboardGraphPreviewList={card.graphCollectionList}
            />
          </CardFooter>
        </Card>
      </NavLink>
    </Col>
  );
};

export default DashboardCard;
