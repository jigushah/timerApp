import {} from './index';
import {
  HttpClient
} from "../api/httpClient"
import urlMapper from "../api/urlMapper"
import {
  TIMER_UPDATE, TIMER_UPDATE_LIST
} from './index'
import moment from 'moment'

var Timer = null;
let TotalTimerTime = 2 * 60
let timerCount = 0

export const startTimer = (resume = false) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    let { lastTimeUpdateAt,timeLeft, isTimerOn} = getState().root.timer;
    if (Timer != null) {
      clearInterval(Timer)
    }
    if (resume == true) {
        let secToSkip = moment.duration(moment().diff(moment(getState().root.timer.lastTimeUpdateAt, "DD/MM/YYYY hh:mm:ss"))).seconds();
        console.log("--------sec to skip-------", secToSkip)
          console.log("--------sec to now-------", moment(Date.now()).format("DD/MM/YYYY hh:mm:ss"))
          
        if (timeLeft - secToSkip > 0) {
          timerCount = timeLeft - secToSkip;
          dispatch(timerUpdate("isTimerOn", true))
        } else {
          return dispatch(timerStop());
        }
      } else {
        dispatch(timerUpdate("isTimerOn", true))
        timerCount = TotalTimerTime
      }
      Timer = setInterval(() => {
        timerCount = timerCount - 1
        if (timerCount > 0) {
          if (isTimerOn) {
            dispatch(timerUpdateList({
              timeLeft: timerCount,
              lastTimeUpdateAt: moment(moment.now()).format("DD/MM/YYYY hh:mm:ss")
            }))
            
          }
        } else {
          alert(" time limit is over");
          dispatch(timerStop())
          //dispatch(expireTimerStop())
        }
      }, 1000)
    
  })
}
export const timerStop = () => {
  return (dispatch, getState) => {
    clearInterval(Timer)
    dispatch(timerUpdate("isTimerOn", false))
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