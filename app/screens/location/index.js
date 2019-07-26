import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AppState, PushNotificationIOS } from 'react-native'
import ContainerComponent from '../../commonComponent/containerComponent'
import { FormFieldInput } from '../../commonComponent/formFieldTitle'
import Title from '../../commonComponent/titleComponent'
import { startTimer, timerUpdate } from '../../actions/timerAction'
import { setNewEvent, eventDetails, deleteSelectedEvent } from '../../actions/eventAction';
import { connect } from 'react-redux';
import moment from 'moment'
import Mailer from 'react-native-mail';
import ImagePicker from 'react-native-image-picker';
let PushNotification = require('react-native-push-notification');



class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      appState: AppState.currentState,
    }
  }

  componentDidMount() {
    this.props.startTimer(true)
    AppState.addEventListener('change', (nextAppState) => this._handleAppStateChange(nextAppState));
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', (nextAppState) => this._handleAppStateChange(nextAppState));
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active') {
      this.props.startTimer(true)
    }
    this.setState({ appState: nextAppState });
  }

  storeNewEvent = () => {
    this.props.setNewEvent({
      eventLocation: this.state.location,
      mid: this.props.mid,
      final: this.props.final,
      isMidAlarmDone : false,
      isFinalAlarmDone : false, 
      midAttachment: false,
      finalAttachment: false,
      isActive: 1
    })
  }

  clearEventLocation = () => {
    this.setState({ location: '' })
    this.props.deleteSelectedEvent()
  }

  updateEventList = (eventUpdate, check) => {
    let { eventList } = this.props;

    let updatedEventList = eventList.map(event => {
      if (event.eventLocation === eventUpdate.eventLocation) {
        if (check === 'Mid Check') {
          event.isActive = 2;
          event.midAttachment = true;
          return event;
        } else if (check === 'Final Check') {
          event.isActive = 0;
          event.finalAttachment = true;
          return event;
        }
      } else {
        return event;
      }
    }).filter(e => e.isActive !== 0)
    this.props.eventDetails('eventList', updatedEventList)
  }

  openImagePicker = (check, event) => {

    const options = {
      title: `Select IMAGE  for ${check}`,
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
        this.sendEmail(path, type, event, check);
        this.updateEventList(event, check)
      }
    });

  }
  sendEmail = (uri, type, event, check) => {
    Mailer.mail({
      subject: `${event.eventLocation} ${check} Attachment`,
      recipients: [this.props.email],
      body: `<p>Dear Sir/Madam, Please check attachment for ${check} on Location : ${event.eventLocation}</p><p>***Note: If you can't see attached image, then please attach it manually.</p>`,
      isHTML: true,
      attachment: {
        path: uri,  // The absolute path of the file from which to read data.
        type: type,   // Mime Type: jpg, png, doc, ppt, html, pdf
        name: ' Note',   // Optional: Custom filename for attachment
      }
    }, (error, event) => {
      if (error) {
        console.log('Error', 'Could not send mail. Please send a mail to support@example.com');
      }

    });
  };

  sendStartEmail = () => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
      +'  '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    Mailer.mail({
      subject: `${this.state.location} work started`,
      recipients: [this.props.email],
      body: `<p>Dear Sir/Madam, Work is started  on Location : ${this.state.location} at ${date}</p>`,
      isHTML: true,
    }, (error, event) => {
      if (error) {
        console.log('Error', 'Could not send mail. Please send a mail to support@example.com');
      }

    });
  };

  render() {
    let { location } = this.state;
    let { isMid, selectedEvent,timerCount, email } = this.props;
    let hasSelected = selectedEvent ? true : false;


    return (
      <ContainerComponent title="Location Details">
        <View style={{ padding: 20 }}>
          <FormFieldInput placeholder={'Location name'} onChangeTextInput={text => this.setState({ location: text })}
            value={hasSelected ? selectedEvent.eventLocation : location} />
          <TouchableOpacity style={styles.startCircle}
            onPress={() => {
              if(email === ''){
                alert('Please fill email address in settings.')

              } else if(location === '') {
                alert('Please fill location.')
              } else {
                PushNotification.localNotificationSchedule({
                  largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
                  smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
                  bigText: `${location} mid check is completed.`, // (optional) default: "message" prop
                  subText: `${location} mid check is completed.`, // (optional) default: none
                  color: "red", // (optional) default: system default
                  vibrate: true, // (optional) default: true
                  vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                  tag: 'check', // (optional) add tag to message
                  priority: "high", // (optional) set notification priority, default: high
                  visibility: "private", // (optional) set notification visibility, default: private
                  importance: "high", // (optional) set notification importance, default: high
                  title: `${this.state.location}`, // (optional)
                  message: `Mid check is completed for ${location}`, // (required)
                  playSound: true, // (optional) default: true
                  soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
                  date: new Date(Date.now() + (this.props.mid * 1000))  // (Android only) See the doc for notification actions to know more
              });
                this.storeNewEvent();
              this.sendStartEmail(selectedEvent)
              }
            }}>
            <Title text='Start' customStyle={{ color: 'white' }} />
          </TouchableOpacity>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.circleMinute}>
              <Title text={hasSelected ? moment.utc(selectedEvent.mid*1000).format('mm:ss') : moment.utc(this.props.mid*1000).format('mm:ss')}
                customStyle={{ color: 'white' }} />
            </TouchableOpacity>
            <View style={styles.checkontainer}>
              <Title text='Mid check' customStyle={{ alignSelf: 'flex-start' }} />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.circleMinute}>
              <Title text={hasSelected ? moment.utc(selectedEvent.final*1000).format('mm:ss') : moment.utc(this.props.final*1000).format('mm:ss')}
                customStyle={{ color: 'white' }} />
            </TouchableOpacity>
            <View style={styles.checkontainer}>
              <Title text='Final check' customStyle={{ alignSelf: 'flex-start' }} />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={this.clearEventLocation}
              style={{ marginTop: 20 }}>
              <Title text='Cancel' customStyle={{
                alignSelf: 'center',
                padding: 20,
                fontSize: 12,
                color: 'white'
              }} />
            </TouchableOpacity>






            <TouchableOpacity onPress={() => {
              this.setState({ location: '' }, () => {
                this.props.eventDetails('selectedEvent', null)
              })
            }}
              >
              <Title text='+' customStyle={{
                alignSelf: 'center', padding: 20,fontSize: 50,marginLeft:50,
                color: 'white'
              }} />
            </TouchableOpacity>
          </View>
        </View>

      </ContainerComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    mid: state.root.event.eventDetails.mid,
    final: state.root.event.eventDetails.final,
    email: state.root.event.eventDetails.email,
    isPopupShow: state.root.event.isPopupShow,
    isMid: state.root.event.isMid,
    midAttachment: state.root.event.midAttachment,
    selectedEvent: state.root.event.selectedEvent,
    eventList: state.root.event.eventList,
    timerCount : state.root.timer.timerCount
  }
};

const mapDispatchToProps = {
  startTimer, timerUpdate, setNewEvent, eventDetails, deleteSelectedEvent
};


const styles = StyleSheet.create({
  rowContainer: { flexDirection: 'row', justifyContent: 'space-around', padding: 10 },
  circleMinute: {
    height: 70, width: 100, borderRadius: 10, borderColor: 'black', borderWidth: 1,
    backgroundColor: '#ED1C24', alignSelf: 'flex-end',color:'white',
    alignItems: 'center', justifyContent: 'center', margin: 20,
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 8,
    shadowRadius: 4,
    elevation: 20,
  },
  checkontainer: { flex: 4, justifyContent: 'center', alignItems: 'flex-start' },
  startCircle: {
    height: 70,
    width: 200, borderRadius: 10, borderWidth: 1, borderColor: 'black',
    backgroundColor: '#ED1C24', alignSelf: 'center',
    alignItems: 'center', justifyContent: 'center', margin: 20,
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 8,
    shadowRadius: 4,
    elevation: 20,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Location)