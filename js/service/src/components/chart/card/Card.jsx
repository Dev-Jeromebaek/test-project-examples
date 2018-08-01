import React, { Component } from 'react';

import DropDown from '../dropdown/Dropdown';

export class Card extends Component {
  handleRefresh = () => {
    const { onRefresh } = this.props;
    onRefresh();
  };
  render() {
    // console.log(this.props);
    const { setCycle } = this.props;
    return (
      <div className={'card' + (this.props.plain ? ' card-plain' : '')}>
        <div className={'header' + (this.props.hCenter ? ' text-center' : '')}>
          <h5 className="title state d-flex justify-content-between">
            {this.props.title}
            <div className="d-flex">
              <DropDown
                setCycle={setCycle}
                cycleTitle={this.props.cycleTitle}
              />
              <i
                className={this.props.statsIcon}
                style={{ cursor: 'pointer' }}
                onClick={this.handleRefresh}
              />
            </div>
          </h5>
          <p className="category">{this.props.category}</p>
        </div>
        <div className="content">
          {this.props.content}

          <div className="footer">
            <div className="legend">{this.props.legend}</div>
            <hr />
            <div className="stats">
              <i className={this.props.statsIcon} />&nbsp; Updated{' '}
              {this.props.minutes} minutes ago
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
