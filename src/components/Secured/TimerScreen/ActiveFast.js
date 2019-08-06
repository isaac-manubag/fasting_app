import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import * as Progress from 'react-native-progress';
import moment from 'moment';
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
            name="edit"
            type="font-awesome"
            color={Colors.light_text2}
          />
        </TouchableOpacity>

        <Progress.Circle
          style={styles.progressCircle}
          progress={this._getProgress()}
          size={300}
          borderWidth={0}
          thickness={20}
          showsText={true}
          animated={true}
          strokeCap={'round'}
          color={Colors.light_text2}
          unfilledColor={Colors.contrast1}
        />

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
  mapDispatchToProps
)(ActiveFast);
