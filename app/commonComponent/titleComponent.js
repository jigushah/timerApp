import React from 'react';
import { Text } from 'react-native';

class TitleComponent extends React.Component {
  render() {
    let { text, customStyle } = this.props;
    return (
      <Text style={[{fontSize:24,fontWeight:600, alignSelf:'center', color:'white'},customStyle]}>{text}</Text>
    );
  }
}

export default TitleComponent