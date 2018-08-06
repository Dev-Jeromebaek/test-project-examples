import React from 'react';
import DashboardGraphPreview from './DashboardGraphPreview';

const DashboardGraphPreviewList = ({ dashboardGraphPreviewList }) => {
  return (
    <div className="d-flex flex-wrap">
      {dashboardGraphPreviewList.map(dashboardGraphPreview => {
        return (
          <DashboardGraphPreview
            dashboardGraphPreview={dashboardGraphPreview.graphSubType}
            key={dashboardGraphPreview.graphId}
          />
        );
      })}
    </div>
  );
};

export default DashboardGraphPreviewList;
