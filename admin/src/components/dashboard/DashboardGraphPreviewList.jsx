import React from 'react';
import DashboardGraphPreview from './DashboardGraphPreview';

const DashboardGraphPreviewList = ({ dashboardGraphPreviewList }) => {
  if (dashboardGraphPreviewList === undefined) {
    return <div className="graph-preview-list d-flex flex-wrap" />;
  } else {
    return (
      <div className="graph-preview-list d-flex flex-wrap">
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
  }
};

export default DashboardGraphPreviewList;
