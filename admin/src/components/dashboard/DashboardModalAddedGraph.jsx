import React from 'react';
import deleteIcon from '../../public/icons/delete.svg';
import { WettyConsumer } from '../../Store';

const DashboardModalAddedGraph = props => {
  return (
    <WettyConsumer>
      {value => {
        return (
          <div className="w-100 px-3 py-1">
            <img
              src={deleteIcon}
              width="8"
              height="8"
              alt="Delete icon."
              className="d-inline cursor-pointer"
              onClick={value.actions.deleteGraph}
            />
            <div className="d-inline px-2 fontSize">{props.graphName}</div>
          </div>
        );
      }}
    </WettyConsumer>
  );
};

export default DashboardModalAddedGraph;
