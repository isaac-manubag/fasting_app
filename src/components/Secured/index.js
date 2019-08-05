import {
  createAppContainer,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import TimerScreen from './TimerScreen';
import FastsScreen from './FastsScreen';
import HistoryScreen from './HistoryScreen';
import ProfileScreen from './ProfileScreen';
import Colors from '../../utils/colors';

const RouteConfigs = {
  Timer: {
    screen: TimerScreen,
  },
  Fasts: {
    screen: FastsScreen,
  },
  History: {
    screen: HistoryScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
};

const BottomTabNavigatorConfig = {
  swipeEnabled: false,
  tabBarPosition: 'bottom',
  lazy: true,
  initialRouteName: 'Timer',
  tabBarOptions: {
    showIcon: true,
    upperCaseLabel: false,
    activeTintColor: Colors.light_text1,
    inactiveTintColor: Colors.contrast2,
    labelStyle: {
      fontSize: 12,
      margin: 0,
    },
    renderIndicator: () => false,
    style: {
      backgroundColor: Colors.dark_bg2,
    },
    pressColor: Colors.light_text1,
  },
};

const TabNavigatorMaterial = createMaterialTopTabNavigator(
  RouteConfigs,
  BottomTabNavigatorConfig
);

export default createAppContainer(TabNavigatorMaterial);
