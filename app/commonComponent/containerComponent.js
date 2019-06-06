import React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import Header from './headerComponent';
class CardComponent extends React.Component {
  render() {
    let { children, title } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={require('../images/image.png')} style={{ width: '100%', height: '100%' }}>
          <Header title={title} />
          <ScrollView style={{ padding: 0, backgroundColor: 'rgba(255,255,255,0.7)' }}>
            {children}
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

export default CardComponent