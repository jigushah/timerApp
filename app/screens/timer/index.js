import React from 'react';
import { Alert, Text, View, Dimensions, AppState, TouchableOpacity } from 'react-native';
import { startTimer, timerUpdate } from '../../actions/timerAction'
import { connect } from 'react-redux';
import moment from 'moment'
import Mailer from 'react-native-mail';
import ImagePicker from 'react-native-image-picker';
import ContainerComponent from "../../commonComponent/containerComponent";

class TimerScreen extends React.Component {

  
  
  render() {
    return (
        <ContainerComponent title="About Us">
          <View style={{ flex: 1, justifyContent: 'center', padding: 10, backgroundColor: '#ED1C24' }}>
            <Text style={{fontSize:16,fontWeight:'200', alignSelf:'center', color:'white',}}>
              This app is designed to assist in ensuring that checks are completed after hot works have taken place in particular work areas. The provision to take photographs and emailed reports allows evidence to be collated with regards to these safety checks being carried out.
            </Text>
            <Text style={{fontSize:16,fontWeight:'600', color:'white',marginTop: 50}}>
              Developed by: JN&F Innovations
            </Text>
            <Text style={{fontSize:16,fontWeight:'600', color:'white',marginTop: 10}}>
              Version: 1.01
            </Text>
            <Text style={{fontSize:16,fontWeight:'600', color:'white',marginTop: 10}}>
              Date: 2019
            </Text>

          </View>
        </ContainerComponent>
    );
  }

}

const mapStateToProps = state => {
  return {
    
  }
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(TimerScreen)
