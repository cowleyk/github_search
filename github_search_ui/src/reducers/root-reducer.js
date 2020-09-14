import { combineReducers } from 'redux';

import repos from './repos-reducer';
import details from './details-reducer';

const reducers = combineReducers({
  repos,
  details
});

export default reducers;