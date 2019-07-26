import React from 'react';
import { Text } from 'react-native';

class TitleComponent extends React.Component {
  render() {
    let { text, customStyle, numberOfLines,ellipsizeMode } = this.props;
    return (
      <Text style={[{fontSize:14,fontWeight:'600', alignSelf:'center', color:'white'},customStyle]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{text}</Text>
    );
  }
}

export default TitleComponent