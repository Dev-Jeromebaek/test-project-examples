import React from 'react';
import { DropdownItem, Badge, ListGroupItem } from 'reactstrap';

const DashboardItem = ({ name, isActive, dashboardClick, isDropdown }) => {
  if (isDropdown) {
    return (
      <DropdownItem
        onClick={dashboardClick}
        className="white-space-normal d-flex align-items-center cursor-pointer"
      >
        <div className="w-80">{name}</div>
        <Badge className="ml-auto" color="danger">
          N
        </Badge>
      </DropdownItem>
    );
  } else {
    return (
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
    );
  }
};

export default DashboardItem;
