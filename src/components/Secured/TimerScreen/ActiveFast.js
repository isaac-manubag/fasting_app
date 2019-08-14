/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, Alert, TouchableOpacity, ScrollView, View } from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import moment from 'moment';
import CircularProgress from './CircularProgress';
import MetaDetails from './MetaDetails';
import FastCards from '../FastCards';
import { endFast, updateActiveFast } from '../../../redux/actions/fasts';
import styles from './styles';
import colors from '../../../utils/colors';
import fasts from '../../../utils/fasts';

class ActiveFast extends React.Component {
  static propTypes = {
    endFast: PropTypes.func,
    updateActiveFast: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      now: moment().unix(),
      overlayVisible: false,
    };

    this._tick = this._tick.bind(this);
    this._setSelectedUpdate = this._setSelectedUpdate.bind(this);
  }

  _tick() {
    this.setState({
      now: moment().unix(),
    });
  }

  _setSelectedUpdate(item) {
    const { start, end, title } = this.props.activeFast;

    Alert.alert(
      'Change Fast?',
      `Change ${title} to ${item.title}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            this.setState({
              overlayVisible: false,
            });
          },
        },
        {
          text: 'Change',
          onPress: () => {
            this.setState({
              overlayVisible: false,
            });

            this.props.updateActiveFast(this.props.activeFast.id, {
              start,
              end,
              title: item.title,
              time_to_fast: item.time_to_fast,
            });
          },
        },
      ],
      { cancelable: false },
    );
  }

  componentDidMount() {
    this.interval = setInterval(() => this._tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { start, end, title } = this.props.activeFast;
    const { now, overlayVisible } = this.state;
    return (
      <SafeAreaView style={styles.sav}>
        <ScrollView>
          <Overlay
            isVisible={overlayVisible}
            windowBackgroundColor='rgba(255, 255, 255, .2)'
            overlayBackgroundColor={colors.dark_bg}
            overlayStyle={{ borderRadius: 20 }}
            onBackdropPress={() => this.setState({ overlayVisible: false })}
          >
            <ScrollView>
              {fasts.map(item => {
                return (
                  <View style={{ paddingVertical: 10 }} key={item.id}>
                    <FastCards.Container
                      key={item.id}
                      onPress={() => this._setSelectedUpdate(item)}
                    >
                      <FastCards.Title text={item.title} />
                      <FastCards.Description
                        text={`${item.time_to_fast} hours`}
                      />
                    </FastCards.Container>
                  </View>
                );
              })}
            </ScrollView>
          </Overlay>
          <Text style={styles.header}>You are fasting!</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.setState({
                overlayVisible: true,
              });
            }}
          >
            <Text style={styles.fastName}>{this.props.activeFast.title}</Text>
            <Icon
              iconStyle={styles.editIcon}
              name='edit'
              type='font-awesome'
              color={colors.light_text2}
            />
          </TouchableOpacity>
          <CircularProgress start={start} end={end} now={now} />
          <TouchableOpacity
            style={styles.endFastBtn}
            onPress={() => {
              Alert.alert(
                'End Fast?',
                `End ${title}`,
                [
                  {
                    text: 'Not Now',
                    style: 'cancel',
                  },
                  {
                    text: 'End Fast',
                    onPress: () => {
                      this.props.endFast(this.props.activeFast)
                    },
                  },
                ],
                { cancelable: false }
              );
              ;
            }}
          >
            <Text style={styles.endFastTitle}>End Fast</Text>
          </TouchableOpacity>
          <MetaDetails start={start} end={end} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  activeFast: state.fasts.activeFast,
});

const mapDispatchToProps = {
  endFast,
  updateActiveFast,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveFast);
