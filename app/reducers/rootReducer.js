import {combineReducers} from 'redux';
import { TimerReducer} from './timerReducer';
import {EventReducer} from './eventReducer';

const root = combineReducers({
  timer: TimerReducer,
  event: EventReducer
})

export default {
  root
};