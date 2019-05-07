/* NegativeCandidate reducer */
import { handleActions } from 'redux-actions';
import { Map, merge, fromJS } from 'immutable';

import * as types from 'main/NegativeCandidate/actions/test/ActionTypes';

const initialState = Map({
  /**
   *  DATA SET
   */
  pending: Map({}),
  negativeCandidate: Map({}),
  error: null,
});

export default handleActions(
  {
    /**
     *  DATA SET
     */
    /* about negative list */
    [types.GET_NEGATIVE_CANDIDATE_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      return state.set('negative', fromJS(data)).setIn(['pending', 'negativeCandidate'], false);
    },
    [types.REQUEST_PENDING]: (state, action) => {
      return state.set('pending', merge(state.get('pending'), fromJS({ [action.payload]: true })));
    },
    [types.REQUEST_SUCCESS]: (state, action) => {
      const { response, target } = action.payload;
      console.log(response);
      console.log(target);
      return state.set(target, response.data);
    },
    [types.REQUEST_FAILURE]: (state, action) => {
      console.log(action.payload);
      const { error, target } = action.payload;
      return state.set('error', error).setIn(['pending', target], false);
    },
  },
  initialState,
);
