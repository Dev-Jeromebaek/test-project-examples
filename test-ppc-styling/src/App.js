import React, { Component } from 'react';
import './App.css';
import { Modal, Button } from 'antd';

class App extends Component {
  countDown = () => {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: 'This is a notification message',
      content: `This modal will be destroyed after ${secondsToGo} second.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `This modal will be destroyed after ${secondsToGo} second.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  };
  render() {
    return (
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>Server FQDN</th>
              <th>Type</th>
              <th>OS</th>
              <th>Memory</th>
              <th>CPU</th>
              <th>Bind Type</th>
            </tr>
          </thead>
          <tbody>
            <tr draggable>
              <td>filler</td>
              <td>AWS</td>
              <td>Ubuntu</td>
              <td>3840 MB</td>
              <td>2.60 GHz</td>
              <td>master</td>
            </tr>
            <tr draggable>
              <td>filler</td>
              <td>AWS</td>
              <td>Ubuntu</td>
              <td>3840 MB</td>
              <td>2.60 GHz</td>
              <td>master</td>
            </tr>
          </tbody>
        </table>
        <ul
          className="list"
          onChange={(e) => {
            console.log(e.target.value);
          }}>
          <li className="list__item">
            <span className="label--radio">
              <input type="radio" className="radio" name="foo" value="1" />
              Item 1
            </span>
          </li>
          <li className="list__item">
            <span className="label--radio">
              <input type="radio" className="radio" name="foo" value="2" />
              Item 2
            </span>
          </li>
          <li className="list__item">
            <span className="label--radio">
              <input type="radio" className="radio" name="foo" value="3" />
              Item 3
            </span>
          </li>
          <li className="list__item">
            <span className="label--radio">
              <input type="radio" className="radio" name="foo" value="4" />
              Item 4
            </span>
          </li>
        </ul>
        <div className="arrow">
          {/* <div className="bar" /> */}
          {/* <div className="triangle" /> */}
        </div>
        <Button onClick={this.countDown}>Open modal to close in 5s</Button>
      </div>
    );
  }
}

export default App;
