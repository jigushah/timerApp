import React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import Header from './headerComponent';
class CardComponent extends React.Component {
  render() {
    let { children, title } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor:'#ED1C24' }}>
        <Header title={title} />
        <View style={{height:1,backgroundColor:'white'}}/>
          <ScrollView style={{ padding: 0, backgroundColor: '#ED1C24' }}>
            {children}
          </ScrollView>
      </View>
    );
  }
}

export default CardComponent