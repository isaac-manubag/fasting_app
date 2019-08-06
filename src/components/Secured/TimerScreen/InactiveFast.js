import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, Alert } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { SafeAreaView, withNavigation } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import firebase from 'react-native-firebase';
import moment from 'moment';
import FastCards from '../FastCards';
import { setActiveFast } from '../../../redux/actions/fasts';
import styles, { sliderWidth, itemWidth } from './styles';
import Colors from '../../../utils/colors';
import fastItems from '../../../utils/fasts';

class InactiveFast extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.firestoreRef = firebase.firestore().collection('fasts');
    this.firebaseUser = firebase.auth().currentUser;

    this._promptUser = this._promptUser.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._startFast = this._startFast.bind(this);
  }

  _startFast(item) {
    const start = moment().unix();
    const end = moment()
      // .add(item.time_to_fast, 'hours')
      .add(5, 'minutes')
      .unix();
    this.firestoreRef
      .add({
        title: item.title,
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
  }

  _promptUser(item) {
    Alert.alert(
      `Start ${item.title} Fast?`,
      `${item.description} Lasts for ${item.time_to_fast} hours`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Start Fasting',
          onPress: () => this._startFast(item),
        },
      ],
      { cancelable: false }
    );
  }

  _renderItem({ item }) {
    return (
      <FastCards.Container key={item.id} onPress={() => this._promptUser(item)}>
        <FastCards.Title text={item.title} />
        <FastCards.Description text={`${item.time_to_fast} hours`} />
      </FastCards.Container>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.sav}>
        <Text style={styles.header}>You are not fasting</Text>
        <Icon
          iconStyle={styles.warnIcon}
          name="exclamation-triangle"
          type="font-awesome"
          color={Colors.light_text2}
        />
        <Text style={styles.paragraph}>
          Choose a fast from the Quick picker below or tap the button to read
          abouth our fasts
        </Text>
        <Button
          title="See all fasts"
          buttonStyle={styles.btn}
          titleStyle={styles.btnTitle}
          onPress={() => this.props.navigation.navigate('Fasts')}
        />
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={fastItems}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = {
  setActiveFast,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(InactiveFast));
