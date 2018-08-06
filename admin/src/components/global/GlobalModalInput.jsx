import React from 'react';

const DashboardModalInput = props => {
  return (
    <form className="p-2">
      <label className="text-muted font-weight-bold font-size w-100">
        {props.inputTitle}
        <input
          maxLength="20"
          className={'input-description w-100'}
          placeholder={props.inputPlaceholder}
          name={props.name}
          onChange={props.handleInputChange}
          value={props.value}
          autoComplete="off"
        />
      </label>
    </form>
  );
};

export default DashboardModalInput;
