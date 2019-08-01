import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { SafeAreaView } from 'react-navigation';
import moment from 'moment';
import { logout } from '../../../redux/actions/auth';
 

class HomeScreen extends React.Component {
  static propTypes = {
    logout: PropTypes.func,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.firestoreRef = firebase.firestore().collection('fasts');
    this.firebaseUser = firebase.auth().currentUser;
  }

  render() {
    return (
      <SafeAreaView forceInset={{ bottom: 'never' }}>
        <Text>Home Screen</Text>
        <Button onPress={this.props.logout} title="out" />
        <Button onPress={() => {
          this.firestoreRef.add({
            title: 'sac test 1',
            start: moment().unix(),
            end: moment().add(1, 'days').unix(),
            completed: false,
            user: this.firebaseUser.uid
          });
        }} title="test" />
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