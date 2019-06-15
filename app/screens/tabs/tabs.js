import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import TimerScreen from '../timer/index'
import LocationScreen from '../location/index'
import SettingScreen from '../settings/index'
import EventScreen from '../events/index'

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialUIIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const TabNavigator = createBottomTabNavigator({
  Active: EventScreen,
  Location: LocationScreen,
  Setting: SettingScreen,
  About: TimerScreen,
}, {
    defaultNavigationOptions: ({ navigation }) => ({   
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = MaterialUIIcons;
        let iconName;
        if (routeName === 'About' || routeName === 'Location' || routeName === 'Setting' || routeName === 'Active') {
          iconName = 'dictionary';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'red',
      inactiveBackgroundColor: 'white',
      activeBackgroundColor: 'white'
    }
  });

export default TabNavigator;