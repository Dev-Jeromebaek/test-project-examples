import React, { Component } from 'react';

import DropDown from '../dropdown/Dropdown';
import refreshIcon from '../../../public/icons/history-solid.svg';

export class Card extends Component {
  handleRefresh = () => {
    alert('refresh');
  };
  render() {
    return (
      <div className={'card' + (this.props.plain ? ' card-plain' : '')}>
        <div className={'header' + (this.props.hCenter ? ' text-center' : '')}>
          <h4 className="title state d-flex justify-content-between">
            {this.props.title}
            <div className="d-flex">
              <DropDown />
              <img
                src={refreshIcon}
                width="20"
                height="30"
                alt="refresh"
                style={{ cursor: 'pointer' }}
                onClick={this.handleRefresh}
              />
            </div>
          </h4>
          <p className="category">{this.props.category}</p>
        </div>
        <div className="content">
          {this.props.content}

          <div className="footer">
            {this.props.legend}
            {this.props.stats != null ? <hr /> : ''}
            <div className="stats">
              <img
                src={refreshIcon}
                width="17"
                height="17"
                alt="refresh"
                style={{ opacity: '0.3' }}
              />{' '}
              {this.props.stats}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
