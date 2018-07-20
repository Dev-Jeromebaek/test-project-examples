import React, { Component } from 'react';
import { NavLink as RouteLink } from 'react-router-dom';

class ApiMyUseList extends Component {
  state = {
    path: '/api/' + this.props.info.apiId,
  };

  handleRemoveApi = () => {
    const { info, onRemove } = this.props;
    console.log(info);
    onRemove(info.apiId);
  };

  render() {
    const { info } = this.props;
    return (
      <RouteLink to={this.state.path} className="nav-link btn btn-outline-tmon">
        {/* <button onClick={this.handleRemoveApi}>X</button> */}
        <img
          src="http://img1.tmon.kr/static/common/gnb_slim_logo.png"
          alt="티몬로고"
          wdith="20"
          height="20"
        />
        &nbsp; {info.apiName} &nbsp;
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={this.handleRemoveApi}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </RouteLink>
    );
  }
}

export default ApiMyUseList;
