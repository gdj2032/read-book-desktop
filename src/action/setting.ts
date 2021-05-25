import types from './types';

export const updateSetAction = (value: { [key: string]: any }) => (dispatch: any) => {
  dispatch(types.set(value))
};

export const addBookAction = (book: IBook) => (dispatch: any) => {
  dispatch(types.addBook(book));
};

export const removeBookAction = (ids: string[]) => (dispatch: any) => {
  dispatch(types.removeBook(ids));
};

export const addNovelAction = (novel: INovel) => (dispatch: any) => {
  dispatch(types.addNovel(novel));
};

export const removeNovelAction = (ids: string[]) => (dispatch: any) => {
  dispatch(types.removeNovel(ids));
};
