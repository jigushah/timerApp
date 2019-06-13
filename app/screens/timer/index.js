import React from 'react';
import { Text, View, Dimensions, AppState , TouchableOpacity} from 'react-native';
import { startTimer , timerUpdate} from '../../actions/timerAction'
import { connect } from 'react-redux';
import moment from 'moment'
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
      this.setState({appState: nextAppState});
  }

  render() {
    return (
      <View style={{ flex: 1 ,justifyContent:'center', alignItems:'center',padding:10}}>
        <TouchableOpacity onPress={() => {
          this.props.startTimer();
        }}>
         <Text>Start</Text> 
        </TouchableOpacity>
        <Text>{moment.utc(this.props.timeLeft*1000).format('HH:mm:ss')}</Text>
      </View>
    );
  }

}

const mapStateToProps = state => {
  return {
    isTimerOn: state.root.timer.isTimerOn,
    timeLeft : state.root.timer.timeLeft
  }
};

const mapDispatchToProps = {
  startTimer, timerUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(TimerScreen)
  