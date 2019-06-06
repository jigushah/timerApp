import React from 'react';
import { View, TextInput } from 'react-native'
import { Header, Text, Left, Right, Body } from 'native-base';


class FormFieldTitle extends React.Component {
  render() {
    let { title } = this.props;
    return (
      <View style={{ justifyContent: 'center' }}>
        <Text style={{color:'rgb(83,83,83)', fontWeight:"400"}}>{title}</Text>
      </View>
    );
  }
}

class FormFieldError extends React.Component {
  render() {
    let { error, touched } = this.props;
    return (
      <View style={{ justifyContent: 'center' }}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }
}

class FormFieldInput extends React.Component {
  render() {
    let { onChangeTextInput, keyboardType, value } = this.props;
    return (
      <TextInput
      value={value}
      keyboardType={keyboardType || 'default'}
                  style={{
                    borderWidth: 1,
                    borderColor: 'rgb(223,223,223)',
                    padding: 10,
                    marginBottom: 3,
                    borderRadius:5,
                    backgroundColor:'rgb(246,246,246)'
                  }}
                  onChangeText={(text) => onChangeTextInput(text)}
                />
    );
  }
}

export { FormFieldError, FormFieldTitle, FormFieldInput }