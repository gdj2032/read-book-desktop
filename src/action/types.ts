import { createAction } from 'redux-act';

const types: { [key: string]: any } = {
  local: createAction('LOCAL'),
  addBook: createAction('ADD_BOOK'),
  removeBook: createAction('REMOVE_BOOK'),
  set: createAction('SET'),
}

export default types;
