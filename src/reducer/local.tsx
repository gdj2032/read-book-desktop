import { createReducer } from 'redux-act';
import { types } from '@/action';
import { themes } from '@/style';

const local = {
  local: createReducer({
    [types.local]: (state, payload: any) => ({ ...state, ...payload }),
    [types.addBook]: (state: any, payload: IBook) => {
      const books = [...state.books];
      books.push(payload);
      return {
        ...state,
        books,
      }
    },
    [types.removeBook]: (state, payload: string[]) => {
      const books = [...state.books].filter((e: IBook) => !payload.includes(e.id));
      return {
        ...state,
        books,
      }
    },
    [types.addNovel]: (state: any, payload: INovel) => {
      const novels = [...state.novels];
      novels.push(payload);
      return {
        ...state,
        novels,
      }
    },
    [types.removeNovel]: (state, payload: string[]) => {
      const novels = [...state.novels].filter((e: INovel) => !payload.includes(e.id));
      return {
        ...state,
        novels,
      }
    },
  }, {
    books: [], //书籍列表
    novels: [], //小说列表
  }),
  set: createReducer({
    [types.set]: (state, payload) => ({ ...state, ...payload }),
  }, {
    fontSize: 14,
    lineHeight: 30,
    fontColor: themes.color.black,
    backgroundColor: themes.color.white,
  }),
}

export default local;
