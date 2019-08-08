import React from 'react';
import { Text, View } from 'react-native';
import colors from '../../../utils/colors';
import moment from 'moment';

export default function MetaDetails({ end, start }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignContent: 'space-around',
        marginVertical: 24,
      }}
    >
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Text style={{ color: colors.light_text2 }}>Started Fasting</Text>
        <Text style={{ color: colors.light_text2 }}>
          {moment(moment.unix(start)).calendar()}
        </Text>
      </View>
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Text style={{ color: colors.light_text2 }}>Fast Ending</Text>
        <Text style={{ color: colors.light_text2 }}>
          {moment(moment.unix(end)).calendar()}
        </Text>
      </View>
    </View>
  );
}
