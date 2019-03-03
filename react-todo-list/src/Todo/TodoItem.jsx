import React, { Component } from 'react';
import '../css/TodoItem.css';

class TodoItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.checked !== nextProps.checked;
  }

  render() {
    const { text, checked, id, onToggle, onRemove } = this.props;

    console.log(id);

    return (
      <div
        className={`todo-item${checked ? ' checked' : ''}`}
        onClick={
          // console.log('toggle checked', id)
          onToggle.bind(this, id)
        }
      >
        {checked && <div className="checkbox">&#10003;</div>}
        <div className="todo-text">
          {/*(``) Template literals*/}
          {text}
        </div>
        <div className="edit">&#9998;</div>
        <div
          className="remove"
          onClick={(e) => {
            e.stopPropagation(); // 이벤트 버블링 현상으로 onToggle 이 실행되지 않도록 함.
            // console.log('remove', id);
            onRemove(id);
          }}
        >
          &#10006;
        </div>
      </div>
    );
  }
}

export default TodoItem;
