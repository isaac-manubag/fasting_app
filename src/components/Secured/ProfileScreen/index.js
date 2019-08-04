import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { logout } from '../../../redux/actions/auth';
import { setActiveFast } from '../../../redux/actions/fasts';
import styles from './styles';

class ProfileScree extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.sav}>
        <Text>ProfileScree</Text>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  activeFast: state.fasts.activeFast,
});

const mapDispatchToProps = {
  logout,
  setActiveFast,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScree);
