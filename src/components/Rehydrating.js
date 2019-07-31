/* eslint-disable */
import React from 'react';
import { View, Text } from 'react-native';

export default class Rehydrate extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'space-around',
          backgroundColor: '#000',
        }}
      >
        <View style={{ height: 10 }} style={{ alignSelf: 'center' }}>
          <Text>sac</Text>
        </View>
      </View>
    );
  }
}
