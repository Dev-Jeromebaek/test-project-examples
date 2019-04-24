import React from 'react';
import Pointer from './Pointer';
function MouseWithPointer() {
  const [mouse, mouseMove] = React.useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    mouseMove({ x: e.clientX, y: e.clientY });
  }
  return (
    <div style={{ height: '100%' }} onMouseMove={handleMouseMove}>
      {/*
          여기서 <p>를 <Cat>으로 바꿀 수 있습니다. ... 그러나 이 경우
          Mouse 컴포넌트를 사용할 때 마다 별도의 <MouseWithSomethingElse>
          컴포넌트를 만들어야 합니다, 그러므로 <MouseWithCat>는
          아직 정말로 재사용이 가능한게 아닙니다.
        */}
      <Pointer mouse={mouse} />
    </div>
  );
}

export default MouseWithPointer;