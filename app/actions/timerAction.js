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
import Mailer from 'react-native-mail';
import ImagePicker from 'react-native-image-picker';
import {eventDetails, updateEventDetail} from '../actions/eventAction';
import _ from 'lodash';

let Timer = null;
let TotalTimerTime =  15;
let TotalTimerTimeNext = 30;



export const startTimer = (resume = false,next = false) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    let {
      lastTimeUpdateAt,
      timerCount,
    } = getState().root.timer;
    if (Timer != null) {
      clearInterval(Timer)
    }
    let secToSkip = moment.duration(moment().diff(moment(lastTimeUpdateAt, "DD/MM/YYYY hh:mm:ss"))).seconds();
    timerCount = timerCount + secToSkip
    Timer = setInterval(() => {
      var { selectedEvent, eventList } = getState().root.event;
      timerCount = timerCount + 1;
      let sec = secToSkip > 0 ? secToSkip : 1
      secToSkip = 0;
      if(eventList.length > 0) {
        let list = updatelistbySeconds(eventList, sec);
        if(selectedEvent && selectedEvent.eventLocation) {
          let updatedSelectedEvent = list.filter(event => event.eventLocation === selectedEvent.eventLocation)
          dispatch(updateEventDetail('selectedEvent',updatedSelectedEvent[0]))
        }
        
        dispatch(updateEventDetail('eventList',list))
      }
      dispatch(timerUpdateList({
          timerCount: timerCount,
          lastTimeUpdateAt: moment(moment.now()).format("DD/MM/YYYY hh:mm:ss")
        }))
    }, 1000)
  })
}

export const updatelistbySeconds = (eventList, sec) => {
  let events = _.cloneDeep(eventList).map(event => {
    if(event.isActive == 1) {
      event.start = event.start - sec;
      if(event.start <= 0) {
        event.start = 0;
      }
    } else if (event.isActive == 2 && event.startAttachment) {
      event.mid = event.mid - sec;
      if(event.mid <= 0) {
        event.mid = 0;
        // showAlert("Mid check complete");
      }
    } else if (event.isActive == 3 && event.midAttachment) {
      event.final = event.final - sec;
      if(event.final <= 0) { event.final = 0;
        //showAlert("Final check complete");
      }
    }
    return event;
  });
  return events
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

export const openImagePicker = () => {
  const options = {
    title: 'Select IMAGE',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const { uri, path, type } = response;
      this.sendEmail(path, type);
    }
  });

}