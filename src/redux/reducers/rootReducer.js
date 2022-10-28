import { defaultStore } from '../defaultStore';

export const rootReducer = (state = defaultStore, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
