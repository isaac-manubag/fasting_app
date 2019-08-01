import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './LoginScreen';

const routeConfig = {
  Login: {
    screen: LoginScreen,
  },
  initialRouteName: 'Login',
  headerMode: 'none',
};

const UnsecuredNavigator = createStackNavigator(routeConfig);

export default createAppContainer(UnsecuredNavigator);
