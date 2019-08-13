import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { logout } from '../../../../redux/actions/auth';
import { setActiveFast } from '../../../../redux/actions/fasts';
import styles from './styles';

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
    const description = this.props.navigation.getParam('description', '');
    const details = this.props.navigation.getParam('details', '');
    return (
      <SafeAreaView style={styles.sav}>
        <ScrollView contentContainerStyle={styles.sv}>
          <Image
            source={require('../../../../assets/images/intermittent-fasting.png')}
            style={styles.icon}
          />
          <Text style={styles.text}>{description}</Text>
          <Text style={styles.text}>{details}</Text>
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
