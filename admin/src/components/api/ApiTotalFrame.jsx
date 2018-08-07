import React, { Component, Fragment } from 'react';
import ApiTotalList from './ApiTotalList';
import { apiContext } from '../../store/ApiStore';
import GlobalSpinner from '../global/GlobalSpinner';

class ApiTotalFrame extends Component {
  componentDidMount() {
    this.props.value.actions.getApiList();
  }

  render() {
    return (
      <Fragment>
        <div className="d-flex justify-content-end mb-2">
          <div
            className="btn btn-sm btn-outline-secondary cursor-pointer"
            onClick={() => this.props.value.actions.sortApiList()}
          >
            정렬
          </div>
        </div>
        {this.props.value.state.isApiListLoading ? (
          <GlobalSpinner />
        ) : (
          <Fragment>
            {this.props.value.state.apiList.map(api => (
              <ApiTotalList api={api} key={api.apiId} />
            ))}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default apiContext(ApiTotalFrame);
