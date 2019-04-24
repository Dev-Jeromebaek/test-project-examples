import React from 'react';

function Pointer(props) {
  const mouse = props.mouse;
  return <div>{`x: ${mouse.x}, y: ${mouse.y}`}</div>;
}

export default Pointer;
