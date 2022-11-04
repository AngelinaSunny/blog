export const setNotAuthorized = () => ({ type: 'SET_NOT_AUTHORIZED' });
export const setIsAuthorized = () => ({ type: 'SET_IS_AUTHORIZED' });

export const setError = (error) => ({ type: 'SET_ERROR', payload: error });

export const setNewPassword = (data) => ({ type: 'SET_NEW_PASSWORD', payload: data });
export const setNewUsername = (data) => ({ type: 'SET_NEW_USERNAME', payload: data });
export const setNewEmail = (data) => ({ type: 'SET_NEW_EMAIL', payload: data });
export const setNewImg = (data) => ({ type: 'SET_NEW_IMG', payload: data });
export const setToken = (data) => ({ type: 'SET_TOKEN', payload: data });
