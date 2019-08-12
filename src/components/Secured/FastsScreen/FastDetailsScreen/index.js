import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { logout } from '../../../../redux/actions/auth';
import { setActiveFast } from '../../../../redux/actions/fasts';
import styles from '../styles';

class FastDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'fast'),
    };
  };

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
          <Text>{this.props.navigation.getParam('title', 'fast')}</Text>
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
)(FastDetailsScreen);
