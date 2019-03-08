import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todos !== nextProps.todos;
  }
  
  render() {
    const { todos, onToggle, onRemove } = this.props;
    const todoList = todos.map((todo) => (
      <TodoItem
        key={todo.id}
        {...todo}
        onToggle={onToggle}
        onRemove={onRemove}
      />
    ));
    return (
      <div className="todos-wrapper">
        {todoList.length !== 0 ? (
          todoList
        ) : (
          <div className="noneList">할일 목록을 추가해 주세요</div>
        )}
      </div>
    );
  }
}

export default TodoItemList;
