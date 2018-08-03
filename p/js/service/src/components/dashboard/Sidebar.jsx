import React, { Component, Fragment } from 'react';
import { ListGroup, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import { withContext } from '../../Store';
import DashboardItem from './DashboardItem';

class Sidebar extends Component {
  state = {
    activeDashboard: 1010,
    activeDashboardName: '',
    isDropdownOpened: false,
    dashboardList: [],
  };

  dashboardClick = (id, name) => () => {
    this.setState({
      activeDashboard: id,
      activeDashboardName: name,
    });
    this.props.changeDashBoard(id);
  };

  async componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();

    this.setState({
      isLoading: true,
    });

    const dashboardList = await this.props.value.actions.getDashboardList();

    this.setState({
      dashboardList: dashboardList.data.data,
      isLoading: false,
    });
  }

  resize() {
    this.setState({ hideSidebar: window.innerWidth < 576 });
  }

  dropdownToggle = () => {
    this.setState(prevState => ({
      isDropdownOpened: !prevState.isDropdownOpened,
    }));
  };

  render() {
    return this.state.hideSidebar ? (
      <Dropdown
        className="w-100 my-3"
        isOpen={this.state.isDropdownOpened}
        toggle={this.dropdownToggle}
      >
        <DropdownToggle className="btn-outline-secondary w-100" caret>
          {this.state.activeDashboardName
            ? this.state.activeDashboardName
            : '원하시는 대시보드를 선택하세요.'}
        </DropdownToggle>
        <DropdownMenu className="w-100 white-space-normal">
          {this.state.dashboardList.map(dashboard => {
            return (
              <DashboardItem
                key={dashboard.dashboardId}
                name={dashboard.dashboardName}
                dashboardId={dashboard.dashboardId}
                dashboardClick={this.dashboardClick(
                  dashboard.dashboardId,
                  dashboard.dashboardName,
                )}
                isActive={dashboard.dashboardId === this.state.activeDashboard}
                isDropdown={true}
              />
            );
          })}
        </DropdownMenu>
      </Dropdown>
    ) : (
      <ListGroup className="mt-3 shadow-sm">
        {this.state.dashboardList.map(dashboard => {
          return (
            <DashboardItem
              key={dashboard.dashboardId}
              dashboardId={dashboard.dashboardId}
              name={dashboard.dashboardName}
              dashboardClick={this.dashboardClick(
                dashboard.dashboardId,
                dashboard.dashboardName,
              )}
              isActive={dashboard.dashboardId === this.state.activeDashboard}
            />
          );
        })}
      </ListGroup>
    );
  }
}

export default withContext(Sidebar);
