import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import * as Progress from 'react-native-progress';
import moment from 'moment';
import { setActiveFast } from '../../../redux/actions/fasts';
import styles from './styles';
import Colors from '../../../utils/colors';

class ActiveFast extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    setActiveFast: PropTypes.func,
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
    const {end, start} = this.props.activeFast;
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
        <Text>You are FASTING</Text>
        <Button title="end fast" onPress={() => this.props.setActiveFast(null, null, null)}/>
        <Progress.Circle
          progress={this._getProgress()}
          size={300}
          borderWidth={0}
          thickness={20}
          showsText={true}
          animated={true}
          strokeCap={'round'}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  activeFast: state.fasts.activeFast,
});

const mapDispatchToProps = {
  setActiveFast,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveFast);
