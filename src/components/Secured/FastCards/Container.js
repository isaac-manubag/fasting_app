import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styles from './styles';

class Container extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    containerStyle: PropTypes.object,
  };

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={this.props.onPress}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

export default Container;
