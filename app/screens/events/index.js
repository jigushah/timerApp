import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AppState } from 'react-native'
import ContainerComponent from '../../commonComponent/containerComponent'
import { FormFieldInput } from '../../commonComponent/formFieldTitle'
import Title from '../../commonComponent/titleComponent'
import { startTimer, timerUpdate } from '../../actions/timerAction'
import {setNewEvent} from '../../actions/eventAction';
import { connect } from 'react-redux';
import moment from 'moment'
import Mailer from 'react-native-mail';
import ImagePicker from 'react-native-image-picker';

class EventScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    }
  }

  
  render() {
    let {eventList} = this.props;
    return (
      <ContainerComponent title="Active locations">
        <View style={{ padding: 20 }}>
          {/* <Title text="Event List" customStyle={{ padding: 10 }} /> */}
          {eventList.map(event=>{
              return(<View style={styles.rowContainer}>
            {/* <TouchableOpacity style={styles.circleMinute}>
              <Title text={moment.utc(event.mid * 1000).format('ss')} customStyle={{ color: 'black' }} />
            </TouchableOpacity> */}
            <View style={styles.rowContainer}>
              <Title text={event.eventLocation} customStyle={{ alignSelf: 'flex-start',padding:10 }} />
              <Title text={event.mid} customStyle={{ alignSelf: 'flex-start',padding:10 }} />
              <Title text={event.final} customStyle={{ alignSelf: 'flex-start',padding:10 }} />
            </View>
          </View>)
            })
        }
        </View>
      </ContainerComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    isTimerOn: state.root.timer.isTimerOn,
    timeLeft: state.root.timer.timeLeft,
    eventList: state.root.event.eventList
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

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen)