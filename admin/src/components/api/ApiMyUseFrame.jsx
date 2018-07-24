import React, { Component, Fragment } from 'react';

import ApiMyUseList from './ApiMyUseList';

class ApiMyUseFrame extends Component {
  render() {
    const { apiList, onCreate, onRemove } = this.props;
    const list = apiList.map(info => (
      <ApiMyUseList
        key={info.apiId}
        info={info}
        onCreate={onCreate}
        onRemove={onRemove}
      />
    ));
    return <Fragment>{list}</Fragment>;
  }
}

export default ApiMyUseFrame;
