import { defaultStore } from '../defaultStore';

export const personReducer = (store = defaultStore.person, action) => {
  switch (action.type) {
    default:
      return store;
  }
};
