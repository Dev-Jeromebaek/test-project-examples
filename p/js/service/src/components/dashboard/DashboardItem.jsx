import React from 'react';
import { DropdownItem, Badge, ListGroupItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const DashboardItem = ({
  name,
  isActive,
  dashboardClick,
  isDropdown,
  dashboardId,
}) => {
  if (isDropdown) {
    return (
      <NavLink to={`/dashboard/${dashboardId}`}>
        <DropdownItem
          onClick={dashboardClick}
          className="white-space-normal d-flex align-items-center cursor-pointer"
        >
          <div className="w-80">{name}</div>
          <Badge className="ml-auto" color="danger">
            N
          </Badge>
        </DropdownItem>
      </NavLink>
    );
  } else {
    return (
      <NavLink to={`/dashboard/${dashboardId}`}>
        <ListGroupItem
          className={
            isActive
              ? 'cursor-pointer text-white bg-dark d-flex justify-content-between align-items-center'
              : 'hover-bg-dark cursor-pointer d-flex justify-content-between align-items-center'
          }
          onClick={dashboardClick}
        >
          <div className="w-80 text-justify">{name}</div>
          <Badge color="danger" className="d-flex align-items-center">
            N
          </Badge>
        </ListGroupItem>
      </NavLink>
    );
  }
};

export default DashboardItem;
