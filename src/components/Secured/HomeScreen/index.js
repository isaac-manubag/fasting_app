import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { logout } from '../../../redux/actions/auth';
 

class HomeScreen extends React.Component {
  static propTypes = {
    logout: PropTypes.func,
    user: PropTypes.object,
  };

  render() {
    return (
      <SafeAreaView forceInset={{ bottom: 'never' }}>
        <Text>Home Screen</Text>
        <Button onPress={this.props.logout} title="out" />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = {
  logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);