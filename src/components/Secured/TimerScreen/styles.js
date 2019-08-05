import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';
import fonts from '../../../utils/fonts';
import globalStyles from '../../../utils/globalStyles';

export default StyleSheet.create({
  sav: {
    height: '100%',
    backgroundColor: colors.dark_bg,
  },
  header: {
    color: colors.light_text2,
    fontSize: 20,
    fontFamily: fonts.interstate_bold,
    fontSize: 24,
    alignSelf: 'center',
    paddingVertical: 40,
  },
  warnIcon: {
    fontSize: 100
  },
  paragraph: {
    ...globalStyles.paragraph,
    paddingVertical: 40
  }
});
