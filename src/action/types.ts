import { createAction } from 'redux-act';

const types: { [key: string]: any } = {
  local: createAction('LOCAL'),
}

export default types;
