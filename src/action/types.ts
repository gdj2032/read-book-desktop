import { createAction } from 'redux-act';

const types: { [key: string]: any } = {
  local: createAction('LOCAL'),
  addBook: createAction('ADD_BOOK'),
  removeBook: createAction('REMOVE_BOOK'),
  set: createAction('SET'),
  addNovel: createAction('ADD_NOVEL'),
  removeNovel: createAction('REMOVE_NOVEL'),
}

export default types;
