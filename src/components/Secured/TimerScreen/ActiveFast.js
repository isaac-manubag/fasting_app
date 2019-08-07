import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import moment, { min } from 'moment';
import { removeActiveFast } from '../../../redux/actions/fasts';
import styles from './styles';
import Colors from '../../../utils/colors';

class ActiveFast extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    removeActiveFast: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      now: moment().unix(),
    };

    this._getProgress = this._getProgress.bind(this);
    this._tick = this._tick.bind(this);
    this._getFormattedTime = this._getFormattedTime.bind(this);
  }

  pad(num, size) {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }

  _getFormattedTime(type) {
    const { start, end } = this.props.activeFast;
    let delta;
    
    if (type === 'remaining') {
      delta = end - this.state.now;
    } else if (type === 'elapsed') {
      delta = this.state.now - start;
    }

    const days = Math.floor(delta / 86400);
    delta -= days * 86400;

    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    const seconds = delta % 60;
    return `${this.pad(hours, 2)}:${this.pad(minutes, 2)}:${this.pad(seconds, 2)}`;
  }

  _tick() {
    this.setState({
      now: moment().unix(),
    });
  }

  _getProgress() {
    const { end, start } = this.props.activeFast;
    const elapsed_time = this.state.now - start;
    return elapsed_time / (end - start);
  }

  componentDidMount() {
    this.interval = setInterval(() => this._tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <SafeAreaView style={styles.sav}>
        <Text style={styles.header}>You are fasting!</Text>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.fastName}>{this.props.activeFast.title}</Text>
          <Icon
            iconStyle={styles.editIcon}
            name='edit'
            type='font-awesome'
            color={Colors.light_text2}
          />
        </TouchableOpacity>

        <AnimatedCircularProgress
          style={styles.progressCircle}
          size={300}
          width={23}
          backgroundWidth={10}
          fill={this._getProgress() * 100}
          tintColor={Colors.light_text2}
          backgroundColor={Colors.contrast1}
          rotation={0}
          linecap='round'
          capWidth='5'
        >
          {fill => {
            return (
              <React.Fragment>
                <Text
                  style={{
                    marginTop: 20,
                    color: Colors.light_text2,
                    fontFamily: 'Interstate-Regular',
                  }}
                >
                  Remaining ({100 - parseFloat(fill).toFixed(0)}%)
                </Text>
                <Text
                  style={{
                    fontSize: 40,
                    paddingVertical: 14,
                    color: Colors.light_text2,
                    fontFamily: 'Interstate-Regular',
                  }}
                >
                  {this._getFormattedTime('remaining')}
                </Text>
                <Text
                  style={{
                    color: Colors.light_text2,
                    fontSize: 10,
                    fontFamily: 'Interstate-Regular',
                  }}
                >
                  Elapsed Time ({parseFloat(fill).toFixed(0)}%)
                </Text>

                <Text
                  style={{
                    fontSize: 10,
                    paddingVertical: 10,
                    color: Colors.light_text2,
                    fontFamily: 'Interstate-Regular',
                  }}
                >
                  {this._getFormattedTime('elapsed')}
                </Text>
              </React.Fragment>
            );
          }}
        </AnimatedCircularProgress>

        <TouchableOpacity
          style={styles.endFastBtn}
          onPress={() => this.props.removeActiveFast()}
        >
          <Text style={styles.endFastTitle}>End Fast</Text>
        </TouchableOpacity>
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
