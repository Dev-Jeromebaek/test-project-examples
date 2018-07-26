import React from 'react';

const DashboardModalInput = props => {
  return (
    <form className="p-2">
      <label className="text-muted font-weight-bold fontSize w-100">
        {props.inputTitle}
        <input
          className={'input-description w-100'}
          placeholder={props.inputPlaceholder}
          name={props.name}
          onChange={props.handleInputChange}
        />
      </label>
    </form>
  );
};

export default DashboardModalInput;
