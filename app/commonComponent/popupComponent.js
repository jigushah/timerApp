import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Title from './titleComponent'

class PopupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }
  render() {
    let { event } = this.props;
    let check = '';
    if(event) {
      if(event.isActive === 1 && event.mid == 0 && !event.midAttachment){
        check = 'Mid Check'
      } else if(event.isActive === 2 && event.final == 0 && !event.finalAttachment){
        check = 'Final Check'
      }
    }
    
    return (<View style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, padding: 20, flex: 1 }}>
      <View style={{ backgroundColor: 'white' }}>
        <Title text="Notification" customStyle={{ padding: 10, color: "black"}} />
        {event && <Title text={`Location: ${event.eventLocation}`} customStyle={{ padding: 10, color: "black" }} />}
        <Title text={`${check}, Confirm area checked?`} customStyle={{ padding: 10, color: "black" }} />
        <View style={{flexDirection:'row', justifyContent:'space-around', padding :10}}>
        <TouchableOpacity onPress={() => {
          this.props.takePicOnly()
        }}>
          <Title text={'Take photo'} customStyle={{ padding: 10, color: "black", backgroundColor:'yellow' }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.props.closePopup()
        }}>
          <Title text={'Cancel'} customStyle={{ padding: 10, color: "black" , backgroundColor:'green'}} />
        </TouchableOpacity>
        </View>
      </View>
    </View>)
  }
}
export default PopupComponent;