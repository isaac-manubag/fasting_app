import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import StatisticsNavigator from './Statistics/StatisticsNavigator';

const RouteConfigs = {
  HOME: {
    screen: HomeScreen,
  },
  STATISTICS: {
    screen: StatisticsNavigator,
  },
};

/* eslint-disable */
const BottomTabNavigatorConfig = {
  swipeEnabled: true,
  tabBarPosition: 'bottom',
  initialRouteName: 'HOME',
};
/* eslint-enable */

const TabNavigatorMaterial = createMaterialTopTabNavigator(RouteConfigs, BottomTabNavigatorConfig);

export default createAppContainer(TabNavigatorMaterial);
