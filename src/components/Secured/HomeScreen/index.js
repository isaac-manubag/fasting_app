import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { SafeAreaView } from 'react-navigation';
import moment from 'moment';
import { logout } from '../../../redux/actions/auth';
import { setActiveFast } from '../../../redux/actions/fasts';
import * as Progress from 'react-native-progress';

class HomeScreen extends React.Component {
  /**
   * on start fast
   * ✔✔✔ 1.1 send start and end time to firebase
   * ✔✔✔ 1.2 set firebase user's activeFastID to the ID of the created fast
   * 1.3 get/receive the created fast record from firebase and use for local storage
   * 2.1 store start and end time to local storage called activeFast with start, end, and id properties
   */

  /**
   * on home screen mount
   * 1.1 get local storage activeFast, if not present fetch users active fast from firebase
   * 1.2 if both actions on 1.1 does not return a value, then show user start a fast message
   * 1.3 if you get a value from 1.1, calculate things and show user the percentage done, remaining time, etc...
   * 1.4 update the values every 30seconds
   */

  /**
   * on end fast
   * 1.1 send request to firebase
   * 1.2 check if fast is completed or not on firestore functions
   * 1.3 set firebase user activeFast to false
   */
  static propTypes = {
    logout: PropTypes.func,
    setActiveFast: PropTypes.func,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.firestoreRef = firebase.firestore().collection('fasts');
    this.firebaseUser = firebase.auth().currentUser;

    this.state = {
      progress: 10,
    };
  }

  tick() {
    this.setState(prevState => ({
      progress: prevState.progress + 1,
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
        <Text>${JSON.stringify(this.props.activeFast)}</Text>
        <Button onPress={this.props.logout} title="out" />
        <Button
          onPress={() => {
            const start = moment().unix();
            const end = moment()
              .add(1, 'days')
              .unix();
            this.firestoreRef
              .add({
                title: Date(),
                start,
                end,
                completed: false,
                user: this.firebaseUser.uid,
              })
              .then(fast => {
                this.props.setActiveFast(fast.id, start, end);
              })
              .catch(error => {
                console.log('fast add err: ', error);
              });
          }}
          title="test"
        />
        <Button
          onPress={() => {
            this.setState({
              progress: this.state.progress + 10,
            });
          }}
          title="grow"
        />
        <Progress.Circle
          progress={this.state.progress / 100}
          size={300}
          borderWidth={0}
          thickness={20}
          showsText={false}
          animated={true}
          formatText={progress => <Text>Sac ${progress}</Text>}
          strokeCap={'round'}
        />
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
)(HomeScreen);
