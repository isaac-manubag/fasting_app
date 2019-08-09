import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import moment from 'moment';
import CircularProgress from './CircularProgress';
import MetaDetails from './MetaDetails';
import FastCards from '../FastCards';
import { removeActiveFast } from '../../../redux/actions/fasts';
import styles from './styles';
import colors from '../../../utils/colors';
import fasts from '../../../utils/fasts';

class ActiveFast extends React.Component {
  static propTypes = {
    removeActiveFast: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      now: moment().unix(),
    };

    this._tick = this._tick.bind(this);
  }

  _tick() {
    this.setState({
      now: moment().unix(),
    });
  }

  componentDidMount() {
    this.interval = setInterval(() => this._tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { start, end } = this.props.activeFast;
    const { now } = this.state;
    return (
      <SafeAreaView style={styles.sav}>
        <ScrollView>
          <Overlay
            isVisible={true}
            windowBackgroundColor='rgba(255, 255, 255, .2)'
            overlayBackgroundColor='rgba(255, 255, 255, 0.0)'
          >
            <View>
              {fasts.map(item => {
                return (
                  <FastCards.Container key={item.id} onPress={() => alert('s')}>
                    <FastCards.Title text={item.title} />
                    <FastCards.Description
                      text={`${item.time_to_fast} hours`}
                    />
                  </FastCards.Container>
                );
              })}
            </View>
          </Overlay>
          <Text style={styles.header}>You are fasting!</Text>
          <TouchableOpacity style={styles.btn}>
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
            onPress={() => this.props.removeActiveFast()}
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
  removeActiveFast,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveFast);
