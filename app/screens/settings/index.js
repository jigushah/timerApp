import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import ContainerComponent from '../../commonComponent/containerComponent'
import { FormFieldInput } from '../../commonComponent/formFieldTitle'
import Title from '../../commonComponent/titleComponent'
import {setEventDetails} from '../../actions/eventAction';
import { connect } from 'react-redux';

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start:'',
      mid: '',
      final: '',
      email: ''
    }
  }

  saveDetails = () =>{
    this.props.setEventDetails({"start":this.state.start,"mid":this.state.mid,"final":this.state.final,"email":this.state.email})
  }


  render() {
    let { start, mid, final,email } = this.state;
    return (
      <ContainerComponent title="Settings">
        <View style={{ padding: 10 }}>
        <View style={styles.rowContainer}>
            <View style={{ flex: 3, justifyContent: 'center' }}>
              <Title text="Start timer  " />
            </View>
            <View style={{ flex: 3 }}>
              <FormFieldInput keyboardType={'number-pad'} onChangeTextInput={text => this.setState({ start: text })} value={start} />
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
              <Title text='min' />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={{ flex: 3, justifyContent: 'center' }}>
              <Title text="Mid timer  " />
            </View>
            <View style={{ flex: 3 }}>
              <FormFieldInput keyboardType={'number-pad'} onChangeTextInput={text => this.setState({ mid: text })} value={mid} />
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
              <Title text='min' />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={{ flex: 3, justifyContent: 'center' }}>
              <Title text="Final timer" />
            </View>
            <View style={{ flex: 3 }}>
              <FormFieldInput keyboardType={'number-pad'} onChangeTextInput={text => this.setState({ final: text })} value={final} />
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
              <Title text='min' />
            </View>
          </View>
          <View style={{padding:10}}>
          <Title text="Email Address" customStyle={{ alignSelf: 'flex-start' }} />
          <FormFieldInput keyboardType={'email-address'} onChangeTextInput={text => this.setState({ email: text })} value={email} />
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={this.saveDetails} style={{ backgroundColor: 'white', borderColor: 'green', borderWidth: 2, borderRadius: 25 }}>
              <Title text='Save' customStyle={{
                alignSelf: 'center', padding: 10,
                color: 'black'
              }} />
            </TouchableOpacity>
          </View>
        </View>
      </ContainerComponent>
    );
  }
}

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

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = {
  setEventDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting)
