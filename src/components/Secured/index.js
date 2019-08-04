import {
  createAppContainer,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import TimerScreen from './TimerScreen';
import FastsScreen from './FastsScreen';
import HistoryScreen from './HistoryScreen';
import ProfileScreen from './ProfileScreen';

const RouteConfigs = {
  TIMER: {
    screen: TimerScreen,
  },
  FASTS: {
    screen: FastsScreen,
  },
  HISTORY: {
    screen: HistoryScreen,
  },
  PROFILE: {
    screen: ProfileScreen,
  },
};

const BottomTabNavigatorConfig = {
  swipeEnabled: true,
  tabBarPosition: 'bottom',
  initialRouteName: 'TIMER',
};

const TabNavigatorMaterial = createMaterialTopTabNavigator(
  RouteConfigs,
  BottomTabNavigatorConfig
);

export default createAppContainer(TabNavigatorMaterial);
