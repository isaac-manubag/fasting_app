import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styles from './styles';

class Container extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
  };

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

export default Container;
