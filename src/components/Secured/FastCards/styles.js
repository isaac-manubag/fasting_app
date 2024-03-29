import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';
import fonts from '../../../utils/fonts';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.light_text2,
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  title: {
    fontFamily: fonts.interstate_regular,
    fontSize: 18,
    paddingTop: 4,
    paddingBottom: 10,
    color: colors.dark_bg,
    textAlign: 'center',
  },
  description: {
    fontFamily: fonts.interstate_light,
    fontSize: 14,
    color: colors.dark_bg2,
    textAlign: 'center',
  },
});
