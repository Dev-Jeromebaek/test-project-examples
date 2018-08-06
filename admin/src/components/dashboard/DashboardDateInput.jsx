import React from 'react';

const DashboardDateInput = props => {
  return (
    <form className="px-2">
      <label className="text-muted font-weight-bold font-size mr-2">
        {props.title} :
        <input
          className={'input-description text-center'}
          name={props.name}
          onChange={props.handleInputChange}
          value={props.value}
          autoComplete="off"
          type="date"
          data-code={props.code}
        />
      </label>
    </form>
  );
};

export default DashboardDateInput;
