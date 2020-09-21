import { combineReducers } from "redux";

import evaluatorReducer from './redux/evaluator/duck';
import groupReducer from './redux/group/duck';
import basicReducer from './redux/basic/duck';

const reducer = combineReducers({
  evaluatorData: evaluatorReducer,
  groupData: groupReducer,
  basicData: basicReducer
})


const rootReducer = reducer ;

export default rootReducer;

