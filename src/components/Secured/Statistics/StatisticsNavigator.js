import { createStackNavigator, createAppContainer } from 'react-navigation';
import StatisticsScreen from './StatisticsScreen';
import StatisticsMonthScreen from './StatisticsMonthScreen';
import { moderateScale } from '../../../utils/scaling';

const StatisticsNavigator = createStackNavigator(
  {
    StatisticsScreen: {
      screen: StatisticsScreen,
    },
    StatisticsMonthScreen: {
      screen: StatisticsMonthScreen,
    },
    
  },
  {
    initialRouteName: 'StatisticsScreen',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#000',
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: moderateScale(18, 0.3),
        fontWeight: 'bold',
        color: '#fff',
      },
    },
  },
);

export default createAppContainer(StatisticsNavigator);
