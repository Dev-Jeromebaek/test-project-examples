import { createAction } from 'redux-actions';
import { Negative } from 'shared/lib/apis';
import { Message } from 'shared/components/Message';
import * as types from './ActionTypes';

/**
 * * api request
 */
const requestPending = createAction(types.REQUEST_PENDING);
const requestSuccess = createAction(types.REQUEST_SUCCESS);
const requestFail = createAction(types.REQUEST_FAILURE);

/**
 * * list negative candidates for last 7days.
 * @param { camp_id, ad_grp_id, afterwork }
 */
export const getNegativeCandidatePending = createAction(types.GET_NEGATIVE_CANDIDATE_PENDING);
export const getNegativeCandidateSuccess = createAction(types.GET_NEGATIVE_CANDIDATE_SUCCESS);
export const getNegativeCandidateFailure = createAction(types.GET_NEGATIVE_CANDIDATE_FAILURE);

export const initNegativeCandidate = createAction(types.INIT_NEGATIVE_CANDIDATE);
export const getNegativeCandidate = params => dispatch => {
  dispatch(requestPending('negativeCandidate'));
  try {
    // const response = Negative.getNegativeCandidate(params).then(resolve => );
    // console.log(response.then(resolve => resolve));
    Negative.getNegativeCandidate(params).then(resolve =>
      dispatch(requestSuccess({ response: resolve, target: 'negativeCandidate' })),
    );
    // dispatch(requestSuccess({ response: Negative.getNegativeCandidate(params), target: 'negativeCandidate' }));
    // dispatch(createAction(types.GET_NEGATIVE_CANDIDATE, Negative.getNegativeCandidate, payload => payload));
  } catch (error) {
    console.log(error);
    console.log(error.message);
    dispatch(requestFail({ error: error.toString(), target: 'negativeCandidate' }));
  }
};
