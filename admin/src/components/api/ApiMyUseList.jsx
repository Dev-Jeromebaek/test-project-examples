import React, { Component } from 'react';
import { NavLink as RouteLink } from 'react-router-dom';

class ApiMyUseList extends Component {
  state = {
    path: '/api/' + this.props.info.apiId,
    mouseOn: false,
  };

  handleRemoveApi = () => {
    const { info, onRemove } = this.props;
    console.log(info);
    this.setState({
      mouseOn: false,
    });
    onRemove(info.apiId);
  };

  onMouseEnterHandler = () => {
    this.setState({
      mouseOn: true,
    });
  };

  onMouseLeaveHandler = e => {
    // if (e.target.className.indexOf('active') === -1) {
    this.setState({
      mouseOn: false,
    });
    // }
  };

  // handleClick = e => {
  //   console.log(e.target.parentNode.children);
  //   let btns = e.target.parentNode.children;
  //   for
  //   // console.log('click');
  //   // console.log(this.state.mouseOn);
  //   this.setState({
  //     mouseOn: true,
  //   });
  //   // console.log(this.state.mouseOn);
  // };

  render() {
    const { info } = this.props;
    return (
      <RouteLink
        to={this.state.path}
        className="nav-link btn btn-outline-tmon"
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
        // onClick={this.handleClick}
      >
        {/* <button onClick={this.handleRemoveApi}>X</button> */}
        <img
          src="http://img1.tmon.kr/static/common/gnb_slim_logo.png"
          alt="티몬로고"
          wdith="20"
          height="20"
        />
        &nbsp; {info.apiName} &nbsp;
        {this.state.mouseOn && (
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.handleRemoveApi}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        )}
      </RouteLink>
    );
  }
}

export default ApiMyUseList;
