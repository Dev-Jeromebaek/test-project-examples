import React from 'react';
import DashboardGraphPreview from './DashboardGraphPreview';

export default function DashboardGraphPreviewList({
  dashboardGraphPreviewList,
}) {
  return (
    <div className="graph-preview-list d-flex flex-wrap">
      {dashboardGraphPreviewList.map(dashboardGraphPreview => {
        return (
          <DashboardGraphPreview
            dashboardGraphPreview={dashboardGraphPreview.graphDetailType}
            key={dashboardGraphPreview.graphId}
          />
        );
      })}
    </div>
  );
}
