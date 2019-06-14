import React from 'react';
import { View } from 'react-native'
import { Header, Text, Left, Right, Body } from 'native-base';

class HeaderComponent extends React.Component {
  render() {
    let { title } = this.props;
    return (
      <View style={{ height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor:'white' }}>
        <Text style={{ color: 'red', fontSize: 20 }}>{title}</Text>
      </View>
    );
  }
}

export default HeaderComponent