import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import styles from './styles';
import Colors from '../../../utils/colors';

class ActiveFast extends React.Component {

  static propTypes = {
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.sav}>
        <Text>You are FASTING</Text>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveFast);
