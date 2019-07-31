import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SafeAreaView, Text } from 'react-native';
import {  Icon } from 'react-native-elements';

class StatisticsMonthScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Test`,
      headerRight: (
        <Icon
          name="home"
          type="font-awesome"
          color="#fff"
          onPress={() => navigation.navigate('HOME')}
          containerStyle={{
            paddingRight: 20,
          }}
        />
      ),
    };
  };

  static propTypes = {
    navigation: PropTypes.object,
  };

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <SafeAreaView>
        <Text>Stat Month Screen</Text>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatisticsMonthScreen);
