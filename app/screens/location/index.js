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
      start: this.props.start,
      mid: this.props.mid,
      final: this.props.final,
      startAttachment: false,
      midAttachment: false,
      finalAttachment: false,
      isActive: 1
    })
  }

  clearEventLocation = () => {
    this.setState({ location: '' })
  }

  updateEventList = (eventUpdate, check) => {
    let { eventList } = this.props;

    let updatedEventList = eventList.map(event => {
      if (event.eventLocation === eventUpdate.eventLocation) {
        if (check === 'Start Check') {
          event.isActive = 2;
          event.startAttachment = true;
          return event;
        } else if (check === 'Mid Check') {
          event.isActive = 3;
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
    let { location } = this.state;
    let { isMid, selectedEvent } = this.props;
    let hasSelected = selectedEvent ? true : false;
    

    return (
      <ContainerComponent title="Location Details">
        <View style={{ padding: 20 }}>
          <FormFieldInput placeholder={'Location name'} onChangeTextInput={text => this.setState({ location: text })}
            value={hasSelected ? selectedEvent.eventLocation : location} />
          <TouchableOpacity style={styles.startCircle}
            onPress={() => {
              this.storeNewEvent()
            }}>
            <Title text='Start' customStyle={{ color: 'white' }} />
          </TouchableOpacity>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.circleMinute}>
              <Title text={hasSelected ? selectedEvent.start : this.props.start}
                customStyle={{ color: 'white' }} />
            </TouchableOpacity>
            <View style={styles.checkontainer}>
              <Title text='Start check' customStyle={{ alignSelf: 'flex-start' }} />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.circleMinute}>
              <Title text={hasSelected ? selectedEvent.mid : this.props.mid}
                customStyle={{ color: 'white' }} />
            </TouchableOpacity>
            <View style={styles.checkontainer}>
              <Title text='Mid check' customStyle={{ alignSelf: 'flex-start' }} />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.circleMinute} onPress={this.openImagePicker}>
              <Title text={hasSelected ? selectedEvent.final : this.props.final}
                customStyle={{ color: 'white' }} />
            </TouchableOpacity>
            <View style={styles.checkontainer}>
              <Title text='Final check' customStyle={{ alignSelf: 'flex-start' }} />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={this.clearEventLocation}
              style={{ backgroundColor: '#ED1C24', borderColor: 'black', borderWidth: 0.3, borderRadius: 15 }}>
              <Title text='Cancel' customStyle={{
                alignSelf: 'center',
                padding: 20,
                fontSize: 16,
                color: 'white'
              }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.setState({ location: '' }, () => {
                this.props.eventDetails('selectedEvent', null)
              })
            }}
              style={{ backgroundColor: '#ED1C24', borderColor: 'black', borderWidth: 0.3, borderRadius: 15 }}>
              <Title text='New' customStyle={{
                alignSelf: 'center', padding: 20,fontSize: 16,
                color: 'white'
              }} />
            </TouchableOpacity>
          </View>
        </View>
        {this.props.isPopupShow &&
          <PopupComponent closePopup={() => {
            this.props.eventDetails('isPopupShow', false)
            this.props.eventDetails('isMid', true)
          }} takePicOnly={() => {
            isMid ? this.openMidCheckImage() : this.openImagePicker()
            this.props.startTimer(false, true);
          }}
          />}

      </ContainerComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    start: state.root.event.eventDetails.start,
    mid: state.root.event.eventDetails.mid,
    final: state.root.event.eventDetails.final,
    email: state.root.event.eventDetails.email,
    isPopupShow: state.root.event.isPopupShow,
    isMid: state.root.event.isMid,
    midAttachment: state.root.event.midAttachment,
    selectedEvent: state.root.event.selectedEvent
  }
};

const mapDispatchToProps = {
  startTimer, timerUpdate, setNewEvent, eventDetails
};


const styles = StyleSheet.create({
  rowContainer: { flexDirection: 'row', justifyContent: 'space-around', padding: 10 },
  circleMinute: {
    height: 70, width: 100, borderRadius: 10, borderColor: 'black', borderWidth: 1,
    backgroundColor: '#ED1C24', alignSelf: 'flex-end',color:'white',
    alignItems: 'center', justifyContent: 'center', margin: 20,
  },
  checkontainer: { flex: 4, justifyContent: 'center', alignItems: 'flex-start' },
  startCircle: {
    height: 70,
    width: 200, borderRadius: 10, borderWidth: 1, borderColor: 'black',
    backgroundColor: '#ED1C24', alignSelf: 'center',
    alignItems: 'center', justifyContent: 'center', margin: 20,

  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Location)