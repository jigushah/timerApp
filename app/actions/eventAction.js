import {} from './index';
import {
  HttpClient
} from "../api/httpClient"
import urlMapper from "../api/urlMapper"
import _ from 'lodash';
import {
  EVENT_DETAILS
} from './index'
import moment from 'moment'
import {
  showAlert,
  confirmLogout
} from '../utils/commonFunction'

export const setEventDetails = (values) => {
    return (dispatch, getState) => {
      dispatch(eventDetails("eventDetails", values))
      
    }
  }

export const setNewEvent = (values) => {
return (dispatch, getState) => {
    currentList = _.cloneDeep(getState().root.event.eventList);
    currentList.push(values)
    dispatch(eventDetails("eventList", currentList))
    
}
}


export const eventDetails = (key, value) => {
return {
    type: EVENT_DETAILS,
    key,
    value
}
}