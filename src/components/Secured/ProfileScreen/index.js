import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { logout } from '../../../redux/actions/auth';
import { setActiveFast } from '../../../redux/actions/fasts';
import styles from './styles';
import Colors from '../../../utils/colors';

class ProfileScree extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: (
      <Icon name='user' type='font-awesome' color={Colors.light_text2} />
    ),
  });

  static propTypes = {
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.sav}>
        <Text>ProfileScreen</Text>
        <Button title='logout' onPress={() => this.props.logout()} />
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
  mapDispatchToProps,
)(ProfileScree);
