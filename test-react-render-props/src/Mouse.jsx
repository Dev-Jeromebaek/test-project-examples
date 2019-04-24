import React from 'react';

function Mouse(props) {
  const [mouse, mouseMove] = React.useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    mouseMove({ x: e.clientX, y: e.clientY });
  }

  return (
    // <div style={{ height: '100%' }} onMouseMove={handleMouseMove}>
    //   {/* ...하지만 <p>가 아닌 다른것을 렌더링하려면 어떻게 해야 할까요? */}
    //   <p>
    //     The current mouse position is ({mouse.x}, {mouse.y})
    //   </p>
    // </div>
    <div style={{ height: '100%' }} onMouseMove={handleMouseMove}>
      {/*
          <Mouse>가 무엇을 렌더링하는지에 대해 명확히 코드로 표기하는 대신,
          `render` prop을 사용하여 무엇을 렌더링할지 동적으로 결정할 수 있습니다.
        */}
      {props.render(mouse)}
    </div>
  );
}

export default Mouse;
