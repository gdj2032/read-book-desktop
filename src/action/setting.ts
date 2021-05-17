import types from './types';

export const updateSetAction = (value: { [key: string]: any }) => (dispatch: any) => {
  dispatch(types.set(value))
};

export const addBookAction = (book: IBook) => (dispatch: any) => {
  dispatch(types.addBook(book));
};

export const removeBookAction = (book: IBook) => (dispatch: any) => {
  dispatch(types.removeBook(book));
};
