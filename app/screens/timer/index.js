import React from 'react';
import { Alert, Text, View, Dimensions, AppState, TouchableOpacity } from 'react-native';
import { startTimer, timerUpdate } from '../../actions/timerAction'
import { connect } from 'react-redux';
import moment from 'moment'
import Mailer from 'react-native-mail';
import ImagePicker from 'react-native-image-picker';

class TimerScreen extends React.Component {

  state = {
    appState: AppState.currentState,
  };

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

  }
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
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
        <TouchableOpacity onPress={() => {
          this.props.startTimer();
        }}>
          <Text>Start</Text>
        </TouchableOpacity>
        <Text>{moment.utc(this.props.timeLeft * 1000).format('HH:mm:ss')}</Text>
        <TouchableOpacity onPress={this.openImagePicker}>
          <Text>
            send mail
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const mapStateToProps = state => {
  return {
    isTimerOn: state.root.timer.isTimerOn,
    timeLeft: state.root.timer.timeLeft
  }
};

const mapDispatchToProps = {
  startTimer, timerUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(TimerScreen)
