import React from 'react';
import createIcon from '../../public/icons/create.svg';
import { WettyConsumer } from '../../Store';

export default class DashboardModalAddGraphInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <WettyConsumer>
        {value => {
          return (
            <div className="w-100 px-3 py-1">
              <img
                src={createIcon}
                width="8"
                height="8"
                alt="Delete icon."
                className="d-inline cursor-pointer"
                onClick={value.actions.createGraph}
              />
              <input
                className="d-inline px-2 fontSize input-description"
                placeholder="그래프 이름을 입력하세요."
              />
            </div>
          );
        }}
      </WettyConsumer>
    );
  }
}
