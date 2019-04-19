import React from 'react';

/**
 * option 없는 일반 loading hoc
 */
// const withLoading = (WrappedComponent) => (props) =>
//   props.isLoading ? <div>Loading...</div> : <WrappedComponent {...props} />;

/**
 * option 있는 loading hoc
 */
const withLoading = (options) => (WrappedComponent) => (props) => {
  if (props.isLoading) {
    if (options.type === 'circle') {
      return <div>Circle Loading...</div>;
    }
    return <div>Line Loading...</div>;
  }
  return <WrappedComponent {...props} />;
};

export default withLoading;
