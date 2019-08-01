// react dotenv version 1551921186
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { fbLogin, googleLogin } from '../../../redux/actions/auth';

class Login extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object,
    fbLogin: PropTypes.func,
    googleLogin: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView>
        <Button title='fb' onPress={this.props.fbLogin}/>
        <Button title='gg' onPress={this.props.googleLogin}/>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  fbLogin,
  googleLogin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
