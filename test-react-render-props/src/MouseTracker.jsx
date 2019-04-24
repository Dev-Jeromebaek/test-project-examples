import React from 'react';
import Mouse from './Mouse';
import Pointer from './Pointer';
// import MouseWithPointer from './MouseWithPointer';

function MouseTracker() {
  return (
    <div>
      <h1>Move the mouse around!</h1>
      {/* <Mouse /> */}
      {/* <MouseWithPointer /> */}
      <Mouse render={(mouse) => <Pointer mouse={mouse} />} />
    </div>
  );
}

export default MouseTracker;
