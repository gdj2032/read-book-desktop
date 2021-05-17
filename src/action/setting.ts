import types from './types';

export const updateSetAction = (value: { [key: string]: any }) => (dispatch: any) => {
  dispatch(types.set(value))
};

export const addBookAction = (info: IBook) => (dispatch: any) => {
  dispatch(types.addBook(info));
};
