import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import styles from './styles';
import Colors from '../../../utils/colors';

class InactiveFast extends React.Component {

  static propTypes = {
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.sav}>
        <Text style={styles.header}>You are not fasting</Text>
        <Icon iconStyle={styles.warnIcon} name='exclamation-triangle' type='font-awesome' color={Colors.light_text2} />
        <Text style={styles.paragraph}>
          Choose a fast from the Quick picker below or tap the button to read
          abouth our fasts
        </Text>
        <Button title="See all fasts" />
        
      </SafeAreaView>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InactiveFast);
