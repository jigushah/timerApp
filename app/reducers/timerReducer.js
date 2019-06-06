import _ from 'lodash';
import {TIMER_UPDATE, TIMER_UPDATE_LIST} from '../actions/index';
import moment from 'moment';

const initialState = {
  timers:[],
  currentIndex : 0,
  timeLeft:'',
  lastTimeUpdateAt: moment(moment.now()).format("DD/MM/YYYY hh:mm:ss"),
  isTimerOn:false,
};

export function TimerReducer(state = initialState, action) {
  switch (action.type) {
    case TIMER_UPDATE:
        return{...state,[action.key]: action.value};
    case TIMER_UPDATE_LIST:
        return{...state, ...action.list}
    default:
      return state
  }
}