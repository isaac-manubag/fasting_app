import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Text, ScrollView, View, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { getHistory, clearHistory } from '../../../redux/actions/history';
import styles from './styles';
import colors from '../../../utils/colors';

class HistoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'History',
  });

  static propTypes = {
    getHistory: PropTypes.func,
    clearHistory: PropTypes.func,
    history: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      history: [],
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.sav}>
        <Button title="get" onPress={this.props.getHistory} />
        <Button title="clear" onPress={this.props.clearHistory} />
        <ScrollView contentContainerStyle={styles.sv}>
          {this.props.history.map(item => {
            return (
              <View key={item.start}>
                <Text style={styles.text}>title: {item.title}</Text>
                <Text style={styles.text}>start: {item.start}</Text>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  history: state.history.history,
});

const mapDispatchToProps = {
  getHistory,
  clearHistory,
};

const HistoryScreenNavigator = createStackNavigator(
  {
    HistoryScreen: {
      screen: connect(
        mapStateToProps,
        mapDispatchToProps
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
  }
);

export default createAppContainer(HistoryScreenNavigator);
