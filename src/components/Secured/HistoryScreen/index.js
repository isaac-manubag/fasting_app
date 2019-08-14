import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Text, View, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { getHistory, clearHistory } from '../../../redux/actions/history';
import styles from './styles';
import colors from '../../../utils/colors';
import fonts from '../../../utils/fonts';

class HistoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'History',
  });

  static propTypes = {
    getHistory: PropTypes.func,
    clearHistory: PropTypes.func,
    history: PropTypes.array,
    processing: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      history: [],
    };

    this.renderItem = this.renderItem.bind(this);
    this.getTotalHours = this.getTotalHours.bind(this);
  }

  componentDidMount() {
    this.props.getHistory();
  }

  getTotalHours = (end, start) => {
    let delta;
    delta = end - start;

    const hours = Math.floor(delta / 3600);
    delta -= hours * 3600;

    return hours;
  };

  renderItem = ({ item }) => {
    return (
      <View key={item.start} style={styles.container}>
        <View style={styles.item_container}>
          <View style={styles.header_container}>
            <Text style={styles.title}>{item.title}</Text>
            <Icon
              name={item.completed ? 'smile-o' : 'frown-o'}
              type='font-awesome'
              color={colors.dark_bg2}
              style={{ flex: 1, alignSelf: 'flex-end' }}
            />
          </View>
          <View style={styles.meta_container}>
            <Text style={styles.meta_text}>
              Start Time: {'\n'}
              {moment(moment.unix(item.start)).format('LLL')}
            </Text>
            <Text style={styles.meta_text}>
              Target End Time: {'\n'}
              {moment(moment.unix(item.end)).format('LLL')}
            </Text>
          </View>
          <View style={styles.meta_container}>
            <Text style={styles.meta_text}>
              Actual End Time: {'\n'}
              {moment(moment.unix(item.end_time)).format('LLL')}
            </Text>
            <Text style={styles.meta_text}>
              Total Fast: {'\n'}
              {this.getTotalHours(item.end_time, item.start)} hours
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.sav}>
        <FlatList
          keyExtractor={item => item.id}
          data={this.props.history}
          renderItem={this.renderItem}
          refreshControl={
            <RefreshControl
              refreshing={this.props.processing}
              onRefresh={this.props.getHistory}
            />
          }
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  history: state.history.history,
  processing: state.history.processing,
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
