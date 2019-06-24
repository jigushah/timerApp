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
      dispatch(updateEventDetail("eventDetails", values))
      
    }
  }

export const setNewEvent = (values) => {
return (dispatch, getState) => {
    currentList = _.cloneDeep(getState().root.event.eventList);
    currentList.push(values)
    dispatch(updateEventDetail("eventList", currentList))
    dispatch(updateEventDetail('selectedEvent',values))
    
}
}

export const deleteSelectedEvent = () => {
  return (dispatch, getState) => {
    let eventList = getState().root.event.eventList;
    let selectedEvent = getState().root.event.selectedEvent;
    let updatedEventList = eventList.filter(e => e.eventLocation !== selectedEvent.eventLocation)
    dispatch(updateEventDetail("eventList", updatedEventList))
    dispatch(updateEventDetail('selectedEvent',null))
  }
}

export const updateEventDetail = (key, value) => {
  return {
    type: EVENT_DETAILS,
    key,
    value
}
}

export const eventDetails = (key, value) => {
  return (dispatch, getState) => {
    dispatch(updateEventDetail(key, value))
  }
}