import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import moment from 'moment';
import CircularProgress from './CircularProgress';
import { removeActiveFast } from '../../../redux/actions/fasts';
import styles from './styles';
import Colors from '../../../utils/colors';

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
    const {start, end} = this.props.activeFast;
    const {now} = this.state;
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

        <CircularProgress start={start} end={end} now={now} />

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
