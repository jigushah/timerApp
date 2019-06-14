import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import ContainerComponent from '../../commonComponent/containerComponent'
import { FormFieldInput } from '../../commonComponent/formFieldTitle'
import Title from '../../commonComponent/titleComponent'

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mid: '',
      final: '',
      email: ''
    }
  }

  render() {
    let { mid, final,email } = this.state;
    return (
      <ContainerComponent title="Settings">
        <View style={{ padding: 10 }}>
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