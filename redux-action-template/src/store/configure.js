import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import modules from './modules';

const configure = reducer => {
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = devTools || compose;

  const middleware = [ReduxThunk];
  const store = createStore(reducer || modules, composeEnhancers(applyMiddleware(...middleware)));

  return store;
};

export default configure;
