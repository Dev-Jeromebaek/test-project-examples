import React, { Component, Fragment } from 'react';
import { ListGroup, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import { WettyConsumer } from '../../Store';
import DashboardItem from './DashboardItem';

export default class Sidebar extends Component {
  state = {
    activeDashboard: '',
    activeDashboardName: '',
    isDropdownOpened: false,
  };

  dashboardClick = (id, name) => () => {
    this.setState({
      activeDashboard: id,
      activeDashboardName: name,
    });
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
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
    return (
      <Fragment>
        <WettyConsumer>
          {value => {
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
                  {value.state.dashboardList.map(dashboard => {
                    return (
                      <DashboardItem
                        key={dashboard.dashboardId}
                        name={dashboard.dashboardName}
                        dashboardClick={this.dashboardClick(
                          dashboard.dashboardId,
                          dashboard.dashboardName,
                        )}
                        isActive={
                          dashboard.dashboardId === this.state.activeDashboard
                        }
                        isDropdown={true}
                      />
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
            ) : (
              <ListGroup className="mt-3 shadow-sm">
                {value.state.dashboardList.map(dashboard => {
                  return (
                    <DashboardItem
                      key={dashboard.dashboardId}
                      name={dashboard.dashboardName}
                      dashboardClick={this.dashboardClick(
                        dashboard.dashboardId,
                        dashboard.dashboardName,
                      )}
                      isActive={
                        dashboard.dashboardId === this.state.activeDashboard
                      }
                    />
                  );
                })}
              </ListGroup>
            );
          }}
        </WettyConsumer>
      </Fragment>
    );
  }
}
