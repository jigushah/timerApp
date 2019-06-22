import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AppState } from 'react-native'
import ContainerComponent from '../../commonComponent/containerComponent'
import { FormFieldInput } from '../../commonComponent/formFieldTitle'
import Title from '../../commonComponent/titleComponent'
import { startTimer, timerUpdate } from '../../actions/timerAction'
import { setNewEvent, eventDetails } from '../../actions/eventAction';
import { connect } from 'react-redux';
import moment from 'moment'
import Mailer from 'react-native-mail';
import ImagePicker from 'react-native-image-picker';
import PopupComponent from '../../commonComponent/popupComponent';
import {Dimensions } from "react-native"; 

class EventScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      isPopupShow: false,
      selectedEventIndex: ''
    }
  }

  updateEventList = (eventUpdate, check) => {
    let {eventList} = this.props;
    
    let updatedEventList = eventList.map(event => {
      if(event.eventLocation === eventUpdate.eventLocation){
      if(check === 'Mid Check') {
        event.isActive = 2;
        event.midAttachment = true;
        return event;
      } else if(check === 'Final Check') {
        event.isActive = 0;
        event.finalAttachment = true;
        return event;
      }
    } else {
      return event;
    }}).filter(e => e.isActive !== 0)
    this.props.eventDetails('eventList', updatedEventList)
  }

  openImagePicker = (check, event) => {
    
    const options = {
      title: `Confirm area checked ? than Select IMAGE  for ${check}`,
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
        this.setState({
          selectedEventIndex:'',
          isPopupShow:false
        })
      }
    });

  }
  sendEmail = (uri, type, event, check) => {
    Mailer.mail({
      subject: `${event.eventLocation} ${check} Attachment`,
      recipients: [this.props.email],
      body: `<p>Dear Sir/Madam, Please check attachment for ${check} on Location : ${event.eventLocation}</p>`,
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
  render() {
    let { eventList } = this.props;
    let eventPopup = this.state.selectedEventIndex !== "" ? eventList[this.state.selectedEventIndex] : {};
    return (
      <ContainerComponent title="Active locations">
        <View style={{ padding: 20 , flex:1, height: Dimensions.get('window').height}}>
          {/* <Title text="Event List" customStyle={{ padding: 10 }} /> */}
          <View style={styles.rowContainer}>
            <Title text={"Location"} customStyle={{ alignSelf: 'flex-start', padding: 10 }} />
            <Title text={"Mid"} customStyle={{ alignSelf: 'flex-start', padding: 10 }} />
            <Title text={"Final"} customStyle={{ alignSelf: 'flex-start', padding: 10 }} />
          </View>
          {eventList.map((event, index) => {
            let isActionRequired = (event.isActive === 1 && event.mid == 0 && !event.midAttachment) ||
              (event.isActive === 2 && event.final == 0 && !event.finalAttachment)
            return (<TouchableOpacity
              style={[styles.rowContainer, {
                backgroundColor: isActionRequired ? 'rgba(0, 255, 0 , 0.2)' : 'red'
              }]}
              onPress={() => {
                if(isActionRequired){
                  this.setState({
                    isPopupShow: true,
                    selectedEventIndex: index
                  })
                } else {
                this.props.eventDetails('selectedEvent', event)
                this.props.navigation.navigate('Location')
                }
              }}
              >
              <Title text={event.eventLocation} customStyle={{ alignSelf: 'flex-start', padding: 10 }} />
              <Title text={moment.utc(event.mid*1000).format('mm:ss')} customStyle={{ alignSelf: 'flex-start', padding: 10 }} />
              <Title text={moment.utc(event.final*1000).format('mm:ss')} customStyle={{ alignSelf: 'flex-start', padding: 10 }} />
            </TouchableOpacity>)
          })
          }
          {this.state.isPopupShow &&
          <PopupComponent event={eventPopup} closePopup={() => {
            this.setState({isPopupShow : false})
          }} takePicOnly={() => {
              let event = eventList[this.state.selectedEventIndex];
              if(event.isActive === 1 && event.mid == 0 && !event.midAttachment){
                this.openImagePicker('Mid Check', event)
              } else if(event.isActive === 2 && event.final == 0 && !event.finalAttachment){
                this.openImagePicker('Final Check', event)
              }
          }}
          />}
        </View>
        
      </ContainerComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    isTimerOn: state.root.timer.isTimerOn,
    timeLeft: state.root.timer.timeLeft,
    eventList: state.root.event.eventList,
    email: state.root.event.eventDetails.email
  }
};

const mapDispatchToProps = {
  startTimer, timerUpdate, setNewEvent, eventDetails
};


const styles = StyleSheet.create({
  rowContainer: { flexDirection: 'row', justifyContent: 'space-around', padding: 10 },
  circleMinute: {
    height: 70, width: 70, borderRadius: 35, borderColor: 'green', borderWidth: 5,
    backgroundColor: 'white', alignSelf: 'flex-end',
    alignItems: 'center', justifyContent: 'center', margin: 20,
  },
  checkontainer: { flex: 4, justifyContent: 'center', alignItems: 'flex-start' },
  startCircle: {
    height: 100,
    width: 100, borderRadius: 50, borderWidth: 5, borderColor: 'orange',
    backgroundColor: 'white', alignSelf: 'center',
    alignItems: 'center', justifyContent: 'center', margin: 20
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen)