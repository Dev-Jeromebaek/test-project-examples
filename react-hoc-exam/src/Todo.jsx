import React from 'react';
import withLoading from './hocs/withLoading';

const Todo = (props) => {
  return (
    <div>
      Todo
    </div>
  );
};

export default withLoading({ type: 'circle' })(Todo);