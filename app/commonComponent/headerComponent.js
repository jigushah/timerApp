import React from 'react';
import { View } from 'react-native'
import { Header, Text, Left, Right, Body } from 'native-base';

class HeaderComponent extends React.Component {
  render() {
    let { title } = this.props;
    return (
      <View style={{ height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor:'#ED1C24' }}>
        <Text style={{ color: 'white', fontSize: 20 }}>{title}</Text>
      </View>
    );
  }
}

export default HeaderComponent