import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AppState } from 'react-native'
import ContainerComponent from '../../commonComponent/containerComponent'
import { FormFieldInput } from '../../commonComponent/formFieldTitle'
import Title from '../../commonComponent/titleComponent'
import { startTimer, timerUpdate } from '../../actions/timerAction'
import { setNewEvent,eventDetails } from '../../actions/eventAction';
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
      startAttachment:'',
      midAttachment:'',
      finalAttachment:'', 
      isActive: 1 
    })
  }

  clearEventLocation = () => {
    this.setState({ location: '' })
  }
 
  openMidCheckImage = () => {
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
        // this.sendEmail(path, type);
        // this.props.startTimer(false,true);
        this.props.eventDetails('midAttachment', {path : path, type: type})
        this.props.eventDetails('isMid',false)
        this.props.eventDetails('isPopupShow',false)
      }
    });
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
        let {midAttachment} = this.props;
        let pathList = [midAttachment.path , path];
        let typeList = [midAttachment.type, type];
        this.sendEmail(path, type);
      }
    });

  };
  sendEmail = (uri, type) => {
    Mailer.mail({
      subject: 'test attachments',
      recipients: [this.props.email],
      body: '<p>Dear Sir/Madam, Please find attachment for location</p>',
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
    let { isMid } = this.props;
    return (
      <ContainerComponent title="Location">
        <View style={{ padding: 20 }}>
          <Title text="Location Details" customStyle={{ padding: 10 }} />
          <FormFieldInput onChangeTextInput={text => this.setState({ location: text })} value={location} />
          <TouchableOpacity style={styles.startCircle}
            onPress={() => {
              this.storeNewEvent()
              this.props.startTimer();
            }}>
            <Title text='Start' customStyle={{ color: 'black' }} />
          </TouchableOpacity>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.circleMinute}>
              <Title text={isMid ? moment.utc(this.props.timeLeft * 1000).format('ss') : this.props.start} 
                customStyle={{ color: 'black' }} />
            </TouchableOpacity>
            <View style={styles.checkontainer}>
              <Title text='Start check' customStyle={{ alignSelf: 'flex-start' }} />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.circleMinute}>
              <Title text={isMid ? moment.utc(this.props.timeLeft * 1000).format('ss') : this.props.mid} 
                customStyle={{ color: 'black' }} />
            </TouchableOpacity>
            <View style={styles.checkontainer}>
              <Title text='Mid check' customStyle={{ alignSelf: 'flex-start' }} />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.circleMinute} onPress={this.openImagePicker}>
              <Title text={!isMid ? moment.utc(this.props.timeLeft * 1000).format('ss') : this.props.final} 
                customStyle={{ color: 'black' }} />
            </TouchableOpacity>
            <View style={styles.checkontainer}>
              <Title text='Final check' customStyle={{ alignSelf: 'flex-start' }} />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={this.clearEventLocation} 
              style={{ backgroundColor: 'white', borderColor: 'black', borderWidth: 2, borderRadius: 25 }}>
              <Title text='Cancel' customStyle={{
                alignSelf: 'center',
                padding: 10,
                color: 'black'
              }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.setState({location:''})}} 
              style={{ backgroundColor: 'white', borderColor: 'green', borderWidth: 2, borderRadius: 25 }}>
              <Title text='New' customStyle={{
                alignSelf: 'center', padding: 10,
                color: 'black'
              }} />
            </TouchableOpacity>
          </View>
        </View>
        {this.props.isPopupShow && 
        <PopupComponent closePopup={() => {
          this.props.eventDetails('isPopupShow',false)
          this.props.eventDetails('isMid',true)
        }} takePicOnly={() => {
          isMid ? this.openMidCheckImage() : this.openImagePicker()
          this.props.startTimer(false,true);
        }}
        />}
        
      </ContainerComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    isTimerOn: state.root.timer.isTimerOn,
    timeLeft: state.root.timer.timeLeft,
    start: state.root.event.eventDetails.start,
    mid: state.root.event.eventDetails.mid,
    final: state.root.event.eventDetails.final,
    email: state.root.event.eventDetails.email,
    isPopupShow: state.root.event.isPopupShow,
    isMid: state.root.event.isMid,
    midAttachment: state.root.event.midAttachment
  }
};

const mapDispatchToProps = {
  startTimer, timerUpdate, setNewEvent,eventDetails
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