import { combineReducers } from 'redux';
import counter from './counter';

const reducers = combineReducers({
  counter,
  // ...새로운 리듀서
})

export default reducers;