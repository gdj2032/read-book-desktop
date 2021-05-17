import { createReducer } from 'redux-act';
import { types } from 'action';

const local = {
  local: createReducer({
    [types.local]: (state, payload: any) => ({ ...state, ...payload }),
    [types.addBook]: (state: any, payload: any) => {
      const books = state.books;
      books.push(payload);
      return {
        ...state,
        books,
      }
    },
    [types.removeBook]: (state, payload) => {
      const books = state.books.filter((e: IBook) => e.name !== payload.name);
      return {
        ...state,
        books,
      }
    },
  }, {
    books: [], //书籍列表
    texts: [], //小说列表
  }),
  set: createReducer({
    [types.set]: (state, payload) => ({ ...state, ...payload }),
  }, {
    fontSize: 14,
    lineHeight: 30,
    fontColor: '#000000',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  }),
}

export default local;
