import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import React from 'react';
import { View,TouchableOpacity } from 'react-native';
import Title from './titleComponent'

class PopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          visible: true
        }
      }
    render(){
       return( <View style={{position:"absolute",top:0,bottom:0,left:0,right:0 ,padding:20}}>
         <View style={{backgroundColor:'white'}}>
            <Title text="Notification" customStyle={{ padding: 10,color:"black" }} />
            <Title text="location:" customStyle={{ padding: 10,color:"black" }} />
            <Title text="Mid Check, Confirm area checked?" customStyle={{ padding: 10,color:"black" }} />
            <TouchableOpacity onPress={() => {
              this.props.takePicOnly()
            }}>
              <Title text={'take photo'} customStyle={{ padding: 10,color:"black" }}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              this.props.closePopup()
            }}>
              <Title text={'confirm'} customStyle={{ padding: 10,color:"black" }}/>
            </TouchableOpacity>
        </View>

  {/* <Dialog
    visible={this.state.visible}
    width={0.8}
    footer={
        <DialogFooter>
        <DialogButton
          text="Take Photo"
          onPress={() => {this.props.takePicOnly()}}
          style={{backgroundColor:"yellow"}}
          textStyle={{color:"black"}}
          />
        <DialogButton
          text="Confirm"
          onPress={() => {
            this.setState({visible: false}, () =>{

              this.props.closePopup()
            })
          }}
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
  </Dialog> */}
</View>)
}
}
export default PopupComponent;