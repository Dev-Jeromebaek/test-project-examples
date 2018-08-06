import React from 'react';
import DashboardModalCheckbox from '../dashboard/DashboardModalCheckbox';

export default class DashboardModalSelectCategory extends React.Component {
  state = { cSelected: [] };

  onRadioBtnClick = ({ target }) => {
    const { value } = target;
    this.setState({ rSelected: value });
  };

  getSelectedValue(value) {
    return this.state.rSelected === value;
  }

  render() {
    const { dataList } = this.props;

    return (
      <div className="pl-2 fontSize">
        {dataList.map((data, i) => {
          return (
            <DashboardModalCheckbox
              title={data.title}
              key={i}
              handleCheckbox={this.props.handleCheckbox}
              code={data.code}
            />
          );
        })}
      </div>
    );
  }
}
