import React from 'react';
import { View } from 'react-native';
import styles from './styles';

class Container extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    );
  }
}


export default Container;
