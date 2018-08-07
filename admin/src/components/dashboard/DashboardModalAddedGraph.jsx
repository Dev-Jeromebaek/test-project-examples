import React from 'react';
import deleteIcon from '../../public/icons/delete.svg';
import { DashboardConsumer } from '../../store/DashboardStore';

const DashboardModalAddedGraph = props => {
  return (
    <DashboardConsumer>
      {value => {
        return (
          <div
            className="w-100 px-3 py-1"
            index={props.index}
            id={props.graphId}
          >
            <img
              src={deleteIcon}
              width="8"
              height="8"
              alt="Delete icon."
              className="d-inline cursor-pointer"
              onClick={() =>
                props.graphId === undefined
                  ? value.actions.deleteGraph(props.index)
                  : value.actions.deleteGraphByGraphId(props.graphId)
              }
            />
            <div className="d-inline px-2 font-size">{props.graphName}</div>
          </div>
        );
      }}
    </DashboardConsumer>
  );
};

export default DashboardModalAddedGraph;
