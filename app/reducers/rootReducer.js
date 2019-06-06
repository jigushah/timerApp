import {combineReducers} from 'redux';
import { TimerReducer} from './timerReducer';

const root = combineReducers({
  timer: TimerReducer
})

export default {
  root
};