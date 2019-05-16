import React, { Component } from 'react';
import './App.css';
import TestComponent from './components/TestComponent';
import TestGetSnapshotBeforeUpdate from './components/TestGetSnapshotBeforeUpdate';
import TestDidCatch from './components/TestDidCatch';

class App extends Component {
  state = {
    counter: 1,
  };
  constructor(props) {
    super(props);

    console.log('--constructor');
    this.divRef = React.createRef();
  }

  componentDidMount() {
    console.log('--componentDidMount');
    console.log(this.divRef);
    this.divRef.current.click();
  }

  handleClick = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };

  render() {
    return (
      <div>
        <h2>learn react lifecycle</h2>
        {/* example 1과 2를 같이 실행시키지 말것! */}
        <h4>Test ref</h4>
        <button ref={this.divRef} onClick={() => console.log('--divRef Click')}>
          test ref Click
        </button>
        <br />
        <hr />
        {/* example 1 */}
        <h4>Test Simple Counter</h4>
        <TestComponent value={this.state.counter} />
        <button onClick={this.handleClick}>Plus Counter</button>
        <br />
        <hr />
        {/* example 2 */}
        {/* <h4>Test Snapshot and DidCatch</h4>
        <TestGetSnapshotBeforeUpdate />
        <br />
        <hr />
        <TestDidCatch /> */}
      </div>
    );
  }
}

export default App;
