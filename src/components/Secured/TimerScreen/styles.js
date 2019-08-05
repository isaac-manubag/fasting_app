import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../utils/colors';
import fonts from '../../../utils/fonts';
import globalStyles from '../../../utils/globalStyles';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const { width: viewportWidth } = Dimensions.get('window');

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

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
    paddingTop: 40,
    paddingBottom: 20,
  },
  btn: {
    backgroundColor: colors.dark_bg2,
    width: 200,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: colors.light_text1,
    borderRadius: 20,
    marginBottom: 40
  },
  btnTitle: {
    color: colors.light_text2
  }
});
