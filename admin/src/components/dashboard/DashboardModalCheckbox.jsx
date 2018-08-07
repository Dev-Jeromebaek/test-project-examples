import React from 'react';

const DashboardModalCheckbox = ({ title, handleCheckbox, code }) => {
  return (
    <form className="px-2">
      <label className="text-muted font-weight-bold font-size">
        <input
          type="checkbox"
          className={'input-description mr-2'}
          value={title}
          onChange={handleCheckbox}
          data-code={code}
        />
        {title}
      </label>
    </form>
  );
};

export default DashboardModalCheckbox;
