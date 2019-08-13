import { createStackNavigator, createAppContainer } from 'react-navigation';
import FastsScreen from './FastsScreen';
import FastDetailsScreen from './FastDetailsScreen';
import colors from '../../../utils/colors';

const FastsScreenNavigator = createStackNavigator(
  {
    FastsScreen: {
      screen: FastsScreen,
    },
    FastDetailsScreen: {
      screen: FastDetailsScreen,
    },
  },
  {
    initialRouteName: 'FastsScreen',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.dark_bg,
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.light_text2,
      },
    },
  }
);

export default createAppContainer(FastsScreenNavigator);
