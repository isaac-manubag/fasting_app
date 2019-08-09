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

class TimerScreen extends React.Component {
  /**
   * on start fast
   * ✔✔✔ send start and end time to firebase
   * ✔✔✔ set firebase user's activeFastID to the ID of the created fast
   * ✔✔✔ get/receive the created fast record from firebase and use for local storage
   * ✔✔✔ store start and end time to local storage called activeFast with start, end, and id properties
   */

  /**
   * on home screen mount
   * ✔✔✔ get local storage activeFast, if not present fetch users active fast from firebase
   * - if both actions on prev step does not return a value, then show user start a fast message
   * - if you get a value from step 1, calculate things and show user the percentage done, remaining time, etc...
   * ✔✔✔ update the values every sec
   */

  /**
   * on end fast
   * - open new modal with title save your fast
   * - show button to save or delete and commit to firebase
   * - show start time and end time, also allow to edit them
   * - howItFelt field and comments field added to fast document
   * - check if fast is completed
   * - send request to firebase
   * - set firebase user activeFast to false
   * - if fast is completed, increment streak for user
   */

  /**
   * todo-list
   * ✔✔✔ update login page, make it nice :)
   * ✔✔✔ update home screen make it nice
   * - add history screen
   * - add profile screen
   * - add fasts screen, just a list of all fast types
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
        <Text>Timer Screen</Text>
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
          showsText={true}
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
)(TimerScreen);
