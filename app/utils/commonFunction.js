import moment from 'moment';
import {Alert} from 'react-native'

export const validateEmail = (email) => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const validatePassword = (password) => {
  let re = /^.{8,}$/;
  return re.test(String(password));
}

export const isDateInFuture = (date) => {
  return moment(date).isAfter()
}

export const showAlert = (text) => {
  Alert.alert('Stripe App',text,[
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ])
}

export const confirmLogout = (text,okPress,cancelPress) => {
  Alert.alert('Stripe App',text,[
    {text: 'OK', onPress: () => okPress()},
    {text: 'Cancel', onPress: () => cancelPress()},
  ])
}

export const confirmWarningLogout = (text,okPress,cancelPress) => {
  Alert.alert('Stripe App',text,[
    {text: 'Yes. I will logout', onPress: () => okPress()},
    {text: 'No. I will continue shopping', onPress: () => cancelPress()},
  ])
}
