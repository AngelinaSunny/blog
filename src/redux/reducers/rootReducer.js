import { combineReducers } from 'redux';

import { articlesReducer } from './articlesReducer';
import { personReducer } from './personReducer';
import { personLogInReducer } from './personLogInReducer';

export const rootReducer = combineReducers({
  articles: articlesReducer,
  person: personReducer,
  personLogIn: personLogInReducer,
});
