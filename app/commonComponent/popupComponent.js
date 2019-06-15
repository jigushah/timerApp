import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import React from 'react';
import { View } from 'react-native';
import Title from './titleComponent'

class PopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          visible: true
        }
      }
    render(){
       return( <View >
  <Dialog
    visible={this.state.visible}
    width={0.8}
    footer={
        <DialogFooter>
        <DialogButton
          text="Take Photo"
          onPress={() => {this.setState({visible:false})}}
          style={{backgroundColor:"yellow"}}
          textStyle={{color:"black"}}
          />
        <DialogButton
          text="Confirm"
          onPress={() => {this.setState({visible:false})}}
          style={{backgroundColor:"green"}}
          textStyle={{color:"black"}}
          />

      </DialogFooter>
    }
    >
    <DialogContent>
        <View>
            <Title text="Notification" customStyle={{ padding: 10,color:"black" }} />
            <Title text="location:" customStyle={{ padding: 10,color:"black" }} />
            <Title text="Mid Check, Confirm area checked?" customStyle={{ padding: 10,color:"black" }} />
        </View>
    </DialogContent>
  </Dialog>
</View>)
}
}
export default PopupComponent;