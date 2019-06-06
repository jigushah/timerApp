import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import TimerScreen from '../timer/index'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialUIIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const TabNavigator = createBottomTabNavigator({
  Timer: TimerScreen,
}, {
    defaultNavigationOptions: ({ navigation }) => ({   
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = MaterialUIIcons;
        let iconName;
        if (routeName === 'Timer') {
          iconName = 'dictionary';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'gray',
      inactiveTintColor: 'black',
      inactiveBackgroundColor: 'rgb(251,216,84)',
      activeBackgroundColor: 'rgb(251,216,84)'
    }
  });

export default TabNavigator;