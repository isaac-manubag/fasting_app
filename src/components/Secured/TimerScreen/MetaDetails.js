import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../../utils/colors';
import fonts from '../../../utils/fonts';
import moment from 'moment';

export default class MetaDetails extends React.Component {
  render() {
    const { start, end } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-around',
          marginVertical: 32,
        }}
      >
        <TouchableHighlight style={{ flex: 1 }} onPress={() => alert('sac')}>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                color: colors.light_text2,
                fontFamily: fonts.interstate_regular,
              }}
            >
              Started Fasting
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: colors.light_text2,
                  fontFamily: fonts.interstate_light,
                  marginTop: 10,
                }}
              >
                {moment(moment.unix(start)).calendar()}
              </Text>

              <Icon
                iconStyle={{
                  marginLeft: 8,
                  fontSize: 16,
                  marginTop: 6,
                }}
                name='edit'
                type='font-awesome'
                color={colors.light_text2}
              />
            </View>
          </View>
        </TouchableHighlight>

        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text
            style={{
              color: colors.light_text2,
              fontFamily: fonts.interstate_regular,
            }}
          >
            Fast Ending
          </Text>
          <Text
            style={{
              color: colors.light_text2,
              fontFamily: fonts.interstate_light,
              marginTop: 10,
            }}
          >
            {moment(moment.unix(end)).calendar()}
          </Text>
        </View>
      </View>
    );
  }
}
