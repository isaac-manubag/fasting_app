import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { setActiveFast } from '../../../redux/actions/fasts';
import colors from '../../../utils/colors';
import ActiveFast from './ActiveFast';
import InactiveFast from './InactiveFast';

class TimerScreen extends React.Component {
  static navigationOptions = () => ({
    tabBarIcon: (
      <Icon name="clock-o" type="font-awesome" color={colors.light_text2} />
    ),
  });

  static propTypes = {
    activeFast: PropTypes.object,
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
  mapDispatchToProps
)(TimerScreen);
