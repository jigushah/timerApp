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
  Location: LocationScreen,
  Active: EventScreen,
  Setting: SettingScreen,
  About: TimerScreen,
}, {
    defaultNavigationOptions: ({ navigation }) => ({   
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = MaterialUIIcons;
        let iconName;
        if (routeName === 'About') {
            iconName = 'account';
        } else if (routeName === 'Location') {
            iconName = 'camera-timer';
        } else if (routeName === 'Setting') {
            iconName = 'settings';
        } else if (routeName === 'Active' ) {
            iconName = 'alpha-a-circle-outline';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#ED1C24',
      inactiveTintColor: '#ED1C24',
      inactiveBackgroundColor: 'white',
      activeBackgroundColor: 'white'
    }
  });

export default TabNavigator;