import React, { Component } from 'react';
import './App.css';

class App extends Component {
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
        <ul className="list" onChange={e => {console.log(e.target.value)}}>
          <li className="list__item">
            <label className="label--radio">
              <input type="radio" className="radio" name="foo" value="1" />
              Item 1
            </label>
          </li>
          <li className="list__item">
            <label className="label--radio">
              <input type="radio" className="radio" name="foo" value="2" />
              Item 2
            </label>
          </li>
          <li className="list__item">
            <label className="label--radio">
              <input type="radio" className="radio" name="foo" value="3" />
              Item 3
            </label>
          </li>
          <li className="list__item">
            <label className="label--radio">
              <input type="radio" className="radio" name="foo" value="4" />
              Item 4
            </label>
          </li>
        </ul>
      </div>
    )
  }
}

export default App;
