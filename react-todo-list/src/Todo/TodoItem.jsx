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
        <div className="todo-text">
          {/*(``) Template literals*/}
          <div>{text}</div>
        </div>
        <div className="checkbox">{checked && <div>&#10003;</div>}</div>
        <div
          className="remove"
          onClick={(e) => {
            e.stopPropagation(); // 이벤트 버블링 현상으로 onToggle 이 실행되지 않도록 함.
            // console.log('remove', id);
            onRemove(id);
          }}
        >
          <div>&#10006;</div>
        </div>
      </div>
    );
  }
}

export default TodoItem;
