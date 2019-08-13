// react dotenv version 1551921186
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  Text,
  Image,
} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { fbLogin, googleLogin } from '../../../redux/actions/auth';
import styles from './styles';

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
      <SafeAreaView style={styles.sav}>
        <Image
          source={require('../../../assets/images/app-logo.png')}
          style={styles.appLogo}
        />
        <Text style={styles.title}>Signin to your account</Text>
        <Text style={styles.paragraph}>
          Automatically sync your fasting history to the cloud, sleect form a
          range of fasts, view stats and save your progress.
        </Text>

        {this.props.authenticating ? (
          <View>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <React.Fragment>
            <SocialIcon
              title="Sign In With Facebook"
              button
              type="facebook"
              onPress={this.props.fbLogin}
            />
            <SocialIcon
              title="Sign In With Google"
              button
              type="google"
              onPress={this.props.googleLogin}
              style={styles.google}
            />
          </React.Fragment>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  authenticating: state.auth.authenticating,
});

const mapDispatchToProps = {
  fbLogin,
  googleLogin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
