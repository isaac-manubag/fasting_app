// react dotenv version 1551921186
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { SocialIcon, Text } from 'react-native-elements';
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
      <ImageBackground
        source={require('../../../assets/images/nutrition_bg.jpeg')}
        style={styles.bgImage}
      >
        <SafeAreaView style={styles.sav}>
          <Text h2 h2Style={styles.title}>
            Fasting App
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
      </ImageBackground>
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
