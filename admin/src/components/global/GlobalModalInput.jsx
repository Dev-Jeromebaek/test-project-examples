import React from 'react';

export default class DashboardModalInput extends React.Component {
  render() {
    return (
      <form className="p-2">
        <label className="text-muted font-weight-bold fontSize w-100">
          {this.props.inputTitle}
          <input
            className={'input-description w-100'}
            placeholder={this.props.inputPlaceholder}
            name={this.props.name}
            onChange={this.props.handleInputChange}
          />
        </label>
      </form>
    );
  }
}
