import { combineReducers } from 'redux';

import repos from './repos-reducer';
import details from './details-reducer';
import user from './user-reducer';

const reducers = combineReducers({
  repos,
  details,
  user
});

export default reducers;