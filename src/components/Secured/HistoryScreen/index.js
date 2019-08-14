import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {
  Text,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
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
      <View
        key={item.start}
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 20,

        }}
      >
        <View style={{width: '100%'}}>
          <Text
            style={{
              fontFamily: fonts.interstate_regular,
              fontSize: 20,
              color: colors.light_text2,
            }}
          >
            {item.title}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              display: 'flex',
              marginTop: 10
            }}
          >
            <Text
              style={{
                flex: 1,
                fontFamily: fonts.interstate_light,
                fontSize: 12,
                color: colors.light_text2,
              }}
            >
              Start Time: {"\n"}{moment(moment.unix(item.start)).format('LLL')}
            </Text>
            <Text
              style={{
                flex: 1,
                fontFamily: fonts.interstate_light,
                fontSize: 12,
                color: colors.light_text2,
              }}
            >
              Target End Time: {"\n"}{moment(moment.unix(item.end)).format('LLL')}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              display: 'flex',
              marginTop: 10
            }}
          >
            <Text
              style={{
                flex: 1,
                fontFamily: fonts.interstate_light,
                fontSize: 12,
                color: colors.light_text2,
              }}
            >
              Actual End Time: {"\n"}{moment(moment.unix(item.end_time)).format('LLL')}
            </Text>
            <Text
              style={{
                flex: 1,
                fontFamily: fonts.interstate_light,
                fontSize: 12,
                color: colors.light_text2,
              }}
            >
              Total Fast: {"\n"}{this.getTotalHours(item.end_time, item.start)} hours
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
