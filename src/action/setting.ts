import types from './types';

export const updateLocal = (value: any) => (dispatch: any) => {
  dispatch(types.local(value))
};
