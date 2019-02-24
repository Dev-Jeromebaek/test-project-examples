import React, { Component } from 'react';
import TodoTemplate from './Todo/TodoTemplate';
import Form from './Todo/Form';
import TodoItemList from './Todo/TodoItemList';

class App extends Component {
  id = 3;

  state = {
    input: '',
    todos: [
      { text: 'Todo List 만들기', checked: true, id: 0 },
      { text: '리액트 공부', checked: false, id: 1 },
      { text: 'Toy Project', checked: false, id: 2 },
    ],
  };

  inputChange = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createTodoOne = (e) => {
    // 페이지 리로딩 방지
    e.preventDefault();

    const { input, todos } = this.state;
    this.setState({
      input: '', // 입력 후 input 값 초기화 작업 진행
      todos: todos.concat({
        text: input,
        checked: false,
        id: this.id++,
      }),
    });
  };

  toggleChecked = (id) => {
    console.log('toggleChecked', id);
    const { todos } = this.state;
    const index = todos.findIndex((todo) => todo.id === id);
    const selected = todos[index]; // 선택한 객체 확인
    const nextTodos = [...todos]; // 배열을 복사해서 nextTodos 라는 새로운 배열을 만듬.

    // 기존 값들을 복사한뒤, checked 값만 덮어씌워 변경
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked,
    };

    this.setState({
      todos: nextTodos,
    });
  };

  removeTodoOne = (id) => {
    console.log('removeTodoOne', id);
    const { todos } = this.state;
    this.setState({
      todos: todos.filter((todo) => todo.id !== id),
    });
  };

  render() {
    const { input, todos } = this.state;
    const { inputChange, createTodoOne, toggleChecked, removeTodoOne } = this;
    return (
      <div className="App">
        <TodoTemplate title="Todo List">
          <Form value={input} onChange={inputChange} onCreate={createTodoOne} />
          <TodoItemList todos={todos} onToggle={toggleChecked} onRemove={removeTodoOne} />
        </TodoTemplate>
      </div>
    );
  }
}

export default App;
