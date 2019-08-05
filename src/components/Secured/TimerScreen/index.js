import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Button } from 'react-native-elements';
import { setActiveFast } from '../../../redux/actions/fasts';
import styles from './styles';
import Colors from '../../../utils/colors';
import ActiveFast from './ActiveFast';
import InactiveFast from './InactiveFast';

class TimerScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: (
      <Icon name='clock-o' type='font-awesome' color={Colors.light_text2} />
    ),
  });

  static propTypes = {
    activeFast: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.activeFast.id ? <ActiveFast /> : <InactiveFast />;
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
)(TimerScreen);
