import React from 'react';
import DashboardModal from '../components/dashboard/DashboardModal';
import ApiAddModal from '../components/api/ApiAddModal';

export default class Test extends React.Component {
  render() {
    return (
      <div>
        <DashboardModal buttonLabel={'dashboard추가하기'} />
        <ApiAddModal buttonLabel={'API추가하기'} />
      </div>
    );
  }
}
