import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { SafeAreaView } from 'react-navigation';
import moment from 'moment';
import { logout } from '../../../redux/actions/auth';
import * as Progress from 'react-native-progress';
 

class HomeScreen extends React.Component {
  static propTypes = {
    logout: PropTypes.func,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.firestoreRef = firebase.firestore().collection('fasts');
    this.firebaseUser = firebase.auth().currentUser;

    this.state = {
      progress: 10
    }
  }

  tick() {
    this.setState(prevState => ({
      progress: prevState.progress + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <SafeAreaView forceInset={{ bottom: 'never' }}>
        <Text>Home Screen</Text>
        <Button onPress={this.props.logout} title="out" />
        <Button onPress={() => {
          this.firestoreRef.add({
            title: Date(),
            start: moment().unix(),
            end: moment().add(1, 'days').unix(),
            completed: false,
            user: this.firebaseUser.uid
          });
        }} title="test" />
        <Button onPress={() => {
          this.setState({
            progress: this.state.progress + 10
          })
        }} title="grow" />
      <Progress.Circle 
        progress={this.state.progress / 100} 
        size={300} 
        borderWidth={0} 
        thickness={20} 
        showsText={false} 
        animated={true} 
        formatText={(progress) => <Text>Sac ${progress}</Text>} 
        strokeCap={'round'} 
      />
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