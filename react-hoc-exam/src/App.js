import React, { Component } from 'react';
import Todo from './Todo';

class App extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 2000);
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div style={{ position: 'absolute', top: '10%', left: '10%', transform: 'translate(-10%, -10%)' }}>
        <Todo isLoading={isLoading} />
      </div>
    );
  }
}

export default App;
