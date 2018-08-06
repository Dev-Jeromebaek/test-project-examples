import React, { Component } from 'react';
import DashboardEditModal from '../dashboard/DashboardEditModal';
import GlobalConfirmModal from '../global/GlobalConfirmModal';

import {
  Col,
  Card,
  CardFooter,
  CardText,
  CardBody,
  CardHeader,
} from 'reactstrap';
import DashboardGraphPreviewList from './DashboardGraphPreviewList';
import { dashboardContext } from '../../store/DashboardStore';

class DashboardCard extends Component {
  render() {
    const { card } = this.props;
    const { deleteDashboard } = this.props.value.actions;

    return (
      <Col xs="12" sm="6" md="4" lg="3" className="mt-4">
        <Card className="card-hover cursor-pointer h-100 shadow">
          <CardHeader className="d-flex align-items-center">
            <div className="mr-auto font-weight-bold w-75 word-break-all">
              {card.dashboardName}
            </div>
            <div className="mr-2 cursor-pointer">
              <DashboardEditModal dashboardData={card} />
            </div>
            <div className="cursor-pointer">
              <GlobalConfirmModal
                isCard={true}
                deleteDashboard={() => {
                  deleteDashboard(card.dashboardId);
                }}
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
              dashboardGraphPreviewList={card.graphCollectionList}
            />
          </CardFooter>
        </Card>
      </Col>
    );
  }
}

export default dashboardContext(DashboardCard);
