import { createReducer } from 'redux-act';
import { types } from '@/action';

const local = {
  local: createReducer({
    [types.local]: (state, payload) => ({ ...state, ...payload.value }),
  }, {
    local: 'local',
  }),
}

export default local;
