// EVENT_DETAILS
import _ from 'lodash';
import {EVENT_DETAILS} from '../actions/index';
import moment from 'moment';

const initialState = {
  eventDetails:{
    start: 30,
    mid: 30,
    final: 30,
    email:'test@gmail.com'
  },
  eventList:[],
  isPopupShow: false,
  midAttachment:{},
  isMid : true,
  selectedEvent: null
};

export function EventReducer(state = initialState, action) {
  switch (action.type) {
    case EVENT_DETAILS:
        return{...state,[action.key]: action.value};
    default:
      return state
  }
}