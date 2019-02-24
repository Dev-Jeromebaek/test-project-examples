import React from 'react';
import '../css/Form.css';

const Form = ({ value, onChange, onCreate }) => {
  return (
    <div className="form-wrapper">
      <form>
        <label>목록 추가</label>
        <input type="text" name="input" value={value} onChange={onChange} />
        <button type="submit" onClick={onCreate}>
          추가하기
        </button>
      </form>
    </div>
  );
};

export default Form;
