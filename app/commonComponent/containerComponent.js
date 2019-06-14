import React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import Header from './headerComponent';
class CardComponent extends React.Component {
  render() {
    let { children, title } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor:'red' }}>
        <Header title={title} />
          <ScrollView style={{ padding: 0, backgroundColor: 'red' }}>
            {children}
          </ScrollView>
      </View>
    );
  }
}

export default CardComponent