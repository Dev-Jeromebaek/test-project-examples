import React from 'react';
import createIcon from '../../public/icons/create.svg';
import { DashboardConsumer } from '../../store/DashboardStore';

export default class DashboardModalAddGraphInput extends React.Component {
  render() {
    return (
      <DashboardConsumer>
        {value => {
          return (
            <div className="w-100 px-3 py-1">
              <img
                src={createIcon}
                width="8"
                height="8"
                alt="Create icon."
                className="d-inline cursor-pointer"
                onClick={() => {
                  if (value.actions.createGraph()) {
                    this.props.clearPlaceholder();
                  }
                }}
              />
              <input
                maxLength="10"
                className="d-inline px-2 font-size input-description"
                placeholder="그래프 이름을 입력하세요."
                name="graphName"
                onChange={this.props.handleInputChange}
                autoComplete="off"
                value={this.props.value}
              />
            </div>
          );
        }}
      </DashboardConsumer>
    );
  }
}
