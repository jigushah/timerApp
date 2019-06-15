import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AppState } from 'react-native'
import ContainerComponent from '../../commonComponent/containerComponent'
import { FormFieldInput } from '../../commonComponent/formFieldTitle'
import Title from '../../commonComponent/titleComponent'
import { startTimer, timerUpdate } from '../../actions/timerAction'
import { setNewEvent } from '../../actions/eventAction';
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
    this.props.setNewEvent({ eventLocation: this.state.location, mid: this.props.mid, final: this.props.final,midAttachment:'',finalAttachment:'', isActive: false })
  }

  clearEventLocation = () => {
    this.setState({ location: '' })
  }

  openImagePicker = () => {
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

  };
  sendEmail = (uri, type) => {
    Mailer.mail({
      subject: 'test attachments',
      recipients: ['support@example.com'],
      ccRecipients: ['supportCC@example.com'],
      bccRecipients: ['supportBCC@example.com'],
      body: '<p>Dear Sir/Madam,</p>',
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
    return (
      <ContainerComponent title="Location">
        <View style={{ padding: 20 }}>
          <Title text="Location Details" customStyle={{ padding: 10 }} />
          <FormFieldInput onChangeTextInput={text => this.setState({ location: text })} value={location} />
          <TouchableOpacity style={styles.startCircle}
            onPress={() => {
              this.props.startTimer();
            }}>
            <Title text='Start' customStyle={{ color: 'black' }} />
          </TouchableOpacity>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.circleMinute}>
              <Title text={moment.utc(this.props.timeLeft * 1000).format('ss')} customStyle={{ color: 'black' }} />
            </TouchableOpacity>
            <View style={styles.checkontainer}>
              <Title text='Mid check' customStyle={{ alignSelf: 'flex-start' }} />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.circleMinute} onPress={this.openImagePicker}>
              <Title text={this.props.final} customStyle={{ color: 'black' }} />
            </TouchableOpacity>
            <View style={styles.checkontainer}>
              <Title text='Final check' customStyle={{ alignSelf: 'flex-start' }} />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={this.clearEventLocation} style={{ backgroundColor: 'white', borderColor: 'black', borderWidth: 2, borderRadius: 25 }}>
              <Title text='Cancel' customStyle={{
                alignSelf: 'center',
                padding: 10,
                color: 'black'
              }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.storeNewEvent} style={{ backgroundColor: 'white', borderColor: 'green', borderWidth: 2, borderRadius: 25 }}>
              <Title text='New' customStyle={{
                alignSelf: 'center', padding: 10,
                color: 'black'
              }} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <PopupComponent /> */}
      </ContainerComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    isTimerOn: state.root.timer.isTimerOn,
    timeLeft: state.root.timer.timeLeft,
    mid: state.root.event.eventDetails.mid,
    final: state.root.event.eventDetails.final
  }
};

const mapDispatchToProps = {
  startTimer, timerUpdate, setNewEvent
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

export default connect(mapStateToProps, mapDispatchToProps)(Location)