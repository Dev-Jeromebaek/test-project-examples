import React from 'react';

const DashboardModalCheckbox = props => {
  return (
    <form className="px-2">
      <label className="text-muted font-weight-bold font-size">
        <input
          type="checkbox"
          className={'input-description mr-2'}
          value={props.title}
          onChange={props.handleCheckbox}
          data-code={props.code}
        />
        {props.title}
      </label>
    </form>
  );
};

export default DashboardModalCheckbox;
