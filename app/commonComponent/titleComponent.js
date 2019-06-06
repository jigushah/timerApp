import React from 'react';
import { Text } from 'react-native';

class TitleComponent extends React.Component {
  render() {
    let { text, customStyle } = this.props;
    return (
      <Text style={[{fontSize:20},customStyle]}>{text}</Text>
    );
  }
}

export default TitleComponent