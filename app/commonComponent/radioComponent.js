import React from 'react';
import { View, TouchableOpacity } from 'react-native'
import { Radio, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'
// const list = [
//     {label:'પ્રથમ',value='1'},
//     {label:'હ્રિતીય',value='2'},
//     {label:'તૃતીય',value='3'},
//     {label:'અઢારીયુ',value='4'},
// ]

class RadioSingle extends React.Component {
  render() {
    let { label, value, currentSelected, onSelect } = this.props;
    return (
      <TouchableOpacity onPress={() => { onSelect(value) }} style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-around' }}>
        <Icon name={currentSelected == value ? 'ios-radio-button-on' : 'ios-radio-button-off'} color='gray' size={20} />
        <Text style={{ color: 'rgb(83,83,83)', paddingLeft: 5 }}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

class RadioComponent extends React.Component {
  render() {
    let { onSelect, currentSelected } = this.props;
    return (
      <View style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
        <RadioSingle label={'પ્રથમ'} value={'1'} currentSelected={currentSelected} onSelect={onSelect} />
        <RadioSingle label={'હ્રિતીય'} value={'2'} currentSelected={currentSelected} onSelect={onSelect} />
        <RadioSingle label={'તૃતીય'} value={'3'} currentSelected={currentSelected} onSelect={onSelect} />
        <RadioSingle label={'અઢારીયુ'} value={'4'} currentSelected={currentSelected} onSelect={onSelect} />
      </View>
    );
  }
}

export default RadioComponent