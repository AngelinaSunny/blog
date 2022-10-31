import { combineReducers } from 'redux';

import { articlesReducer } from './articlesReducer';
import { personReducer } from './personReducer';
import { slugArticleReducer } from './slugArticleReducer';

export const rootReducer = combineReducers({
  articles: articlesReducer,
  person: personReducer,
  article: slugArticleReducer,
});
