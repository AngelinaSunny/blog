import { defaultStore } from '../defaultStore';

export const personReducer = (state = defaultStore.person, action) => {
  switch (action.type) {
    case 'NEW_PERSON':
      return {
        ...state,
        newPerson: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
