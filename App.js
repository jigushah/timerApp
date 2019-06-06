import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer, SafeAreaView } from 'react-navigation';
import { Provider } from 'react-redux'
import { store } from './app/store/store'

import RootStack from './app/screens/tabs/tabs'

let Navigation = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={{flex : 1}}>
          <Navigation />
        </SafeAreaView>
      </Provider>
    );
  }
}