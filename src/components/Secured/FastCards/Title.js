import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import styles from './styles';

class Title extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    titleStyle: PropTypes.any,
  };

  render() {
    return (
      <Text style={[styles.title, this.props.titleStyle]}>
        {this.props.text}
      </Text>
    );
  }
}

export default Title;
