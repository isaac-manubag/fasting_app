import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, Image } from 'react-native';
import { Icon, Button, Avatar } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { logout } from '../../../redux/actions/auth';
import styles from './styles';
import Colors from '../../../utils/colors';

class ProfileScreen extends React.Component {
  static navigationOptions = () => ({
    tabBarIcon: (
      <Icon name='user' type='font-awesome' color={Colors.light_text2} />
    ),
  });

  static propTypes = {
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    return (
      <SafeAreaView style={styles.sav}>
        <Avatar
          rounded
          overlayContainerStyle={{ backgroundColor: Colors.dark_bg }}
          containerStyle={styles.image}
          avatarStyle={{ borderRadius: 125 }}
          source={{ uri: `${user.user.photoURL}/?height=500` }}
        />
        <Text style={styles.text}>{user.user.displayName}</Text>
        <Text style={styles.text}>{user.user.email}</Text>
        <Button 
          style={styles.logout} 
          title='logout' 
          onPress={() => this.props.logout()} 
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);
