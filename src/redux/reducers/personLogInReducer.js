import { defaultStore } from '../defaultStore';

export const personLogInReducer = (state = defaultStore.personLogIn, action) => {
  switch (action.type) {
    case 'SET_NOT_AUTHORIZED':
      return {
        ...state,
        isAuthorized: false,
      };
    case 'SET_IS_AUTHORIZED':
      return {
        ...state,
        isAuthorized: true,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'SET_NEW_PASSWORD':
      return {
        ...state,
        password: action.payload,
      };
    case 'SET_NEW_USERNAME':
      return {
        ...state,
        username: action.payload,
      };
    case 'SET_NEW_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    case 'SET_NEW_IMG':
      return {
        ...state,
        avatar: action.payload,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};
