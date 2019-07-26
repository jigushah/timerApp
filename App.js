import React from 'react';
import { Text, StatusBar } from 'react-native';
import { createBottomTabNavigator, createAppContainer, SafeAreaView } from 'react-navigation';
import { Provider } from 'react-redux'
import { store } from './app/store/store'
import NavigatorService from './app/screens/navigator';
import RootStack from './app/screens/tabs/tabs'

let Navigation = createAppContainer(RootStack);

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={{flex : 1}}>
            <StatusBar backgroundColor="#ED1C24" barStyle="light-content" />
          <Navigation
              ref={navigatorRef => {
                  NavigatorService.setContainer(navigatorRef);
              }}/>
        </SafeAreaView>
      </Provider>
    );
  }
}