import React from 'react';
import '../css/TodoTemplate.css';

const TodoTemplate = ({ title, children }) => {
  return (
    <div className="todolist">
      <div className="title">{title}</div>
      {children}
    </div>
  );
};

export default TodoTemplate;
