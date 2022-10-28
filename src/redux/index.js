import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

import { rootReducer } from './reducers/rootReducer';

const loggerMiddleware = () => (next) => (action) => {
  const result = next(action);
  return result;
};
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(loggerMiddleware, thunk)));
