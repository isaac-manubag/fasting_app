/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { logout } from '../../../../redux/actions/auth';
import { setActiveFast } from '../../../../redux/actions/fasts';
import styles from '../styles';
import FastCards from '../../FastCards';
import fasts from '../../../../utils/fasts';

class FastsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Fasts',
  });

  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.sav}>
        <ScrollView>
          {fasts.map(item => {
            return (
              <FastCards.Container
                containerStyle={{
                  marginVertical: 10,
                  paddingVertical: 36,
                  marginHorizontal: 10,
                }}
                onPress={() =>
                  this.props.navigation.navigate('FastDetailsScreen', item)
                }
              >
                <FastCards.Title text={`${item.time_to_fast} hours`} />
                <FastCards.Title
                  text={item.title}
                  titleStyle={{ fontSize: 28 }}
                />
                <FastCards.Description text={item.description} />
              </FastCards.Container>
            );
          })}
        </ScrollView>
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
)(FastsScreen);
