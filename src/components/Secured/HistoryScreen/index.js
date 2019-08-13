import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { logout } from '../../../redux/actions/auth';
import { setActiveFast } from '../../../redux/actions/fasts';
import styles from './styles';
import colors from '../../../utils/colors';

class HistoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'History',
  });

  static propTypes = {
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.sav}>
        <ScrollView contentContainerStyle={styles.sv}>
          <Text style={styles.text}>asd</Text>
          <Text style={styles.text}>123}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  activeFast: state.fasts.activeFast,
});

const mapDispatchToProps = {
  logout,
  setActiveFast,
};

const HistoryScreenNavigator = createStackNavigator(
  {
    HistoryScreen: {
      screen: connect(
        mapStateToProps,
        mapDispatchToProps,
      )(HistoryScreen),
    },
  },
  {
    initialRouteName: 'HistoryScreen',
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
  },
);

export default createAppContainer(HistoryScreenNavigator);
