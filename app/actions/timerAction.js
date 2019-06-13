import {} from './index';
import {
  HttpClient
} from "../api/httpClient"
import urlMapper from "../api/urlMapper"
import {
  TIMER_UPDATE,
  TIMER_UPDATE_LIST
} from './index'
import moment from 'moment'
import {
  showAlert,
  confirmLogout
} from '../utils/commonFunction'

let Timer = null;
let TotalTimerTime = 0.5 * 60;
let TotalTimerTimeNext = 1 * 60;
let timerCount = 0

export const startTimer = (resume = false,next = false) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    let {
      lastTimeUpdateAt,
      timeLeft,
      isTimerOn
    } = getState().root.timer;
    if (Timer != null) {
      clearInterval(Timer)
    }
    if (resume == true) {
      let secToSkip = moment.duration(moment().diff(moment(lastTimeUpdateAt, "DD/MM/YYYY hh:mm:ss"))).seconds();
      if (timeLeft - secToSkip > 0) {
        timerCount = timeLeft - secToSkip;
        dispatch(timerUpdate("isTimerOn", true))
      } else {
        return dispatch(timerStop());
      }
    } else {
      dispatch(timerUpdate("isTimerOn", true))
      timerCount = next ? TotalTimerTimeNext : TotalTimerTime
    }
    Timer = setInterval(() => {
      timerCount = timerCount - 1
      if (timerCount > 0) {
        dispatch(timerUpdateList({
          timeLeft: timerCount,
          lastTimeUpdateAt: moment(moment.now()).format("DD/MM/YYYY hh:mm:ss")
        }))
      } else {
        dispatch(timerStop())
      }
    }, 1000)

  })
}
export const timerStop = () => {
  return (dispatch, getState) => {
    clearInterval(Timer)
    dispatch(timerUpdate("isTimerOn", false))
    confirmLogout('nxt timer will be for 1 min', () => {
      dispatch(startTimer(false,true));
    }, () => {})
  }
}
export const timerUpdate = (key, value) => {
  return {
    type: TIMER_UPDATE,
    key,
    value
  }
}

export const timerUpdateList = (list) => {
  return {
    type: TIMER_UPDATE_LIST,
    list
  }
}