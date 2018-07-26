import React from 'react';
import updateIcon from '../../public/icons/update.svg';
import deleteIcon from '../../public/icons/delete.svg';
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
import { WettyConsumer } from '../../Store';

const DashboardCard = ({ card }) => {
  return (
    <WettyConsumer>
      {value => {
        return (
          <Col xs="12" sm="6" md="4" lg="3" className="mt-4">
            <NavLink
              className="text-decoration-hover-none text-dark"
              to="/dashboard"
            >
              <Card
                className="card-hover card cursor-pointer h-100 shadow"
                to="/dashboard"
              >
                <CardHeader className="d-flex">
                  <div className="w-80 mr-auto">{card.dashboardName}</div>
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
                    {card.dashboardDescription}
                  </CardText>
                </CardBody>
                <CardFooter>
                  <DashboardGraphPreviewList
                    dashboardGraphPreviewList={card.graphCollection}
                  />
                </CardFooter>
              </Card>
            </NavLink>
          </Col>
        );
      }}
    </WettyConsumer>
  );
};

export default DashboardCard;
