import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../utils/colors';
import fonts from '../../../utils/fonts';
import globalStyles from '../../../utils/globalStyles';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const { width: viewportWidth } = Dimensions.get('window');

function wp(percentage) {
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
    alignContent: 'center',
  },
  header: {
    color: colors.light_text2,
    fontFamily: fonts.interstate_bold,
    fontSize: 24,
    alignSelf: 'center',
    paddingVertical: 40,
  },
  warnIcon: {
    fontSize: 100,
  },
  editIcon: {
    fontSize: 20,
    margin: 0,
    padding: 0,
  },
  paragraph: {
    ...globalStyles.paragraph,
    paddingTop: 40,
    paddingBottom: 20,
  },
  fastName: {
    ...globalStyles.paragraph,
    marginBottom: 0,
    paddingHorizontal: '4%',
  },
  btn: {
    backgroundColor: colors.dark_bg2,
    width: 200,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: colors.light_text1,
    borderRadius: 20,
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  endFastBtn: {
    backgroundColor: colors.light_text1,
    paddingVertical: 10,
    alignContent: 'center',
    alignItems: 'center',
    width: 200,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderRadius: 20,
    marginTop: 40,
  },
  endFastTitle: {
    ...globalStyles.paragraph,
    marginBottom: 0,
    paddingHorizontal: '4%',
    color: colors.dark_bg2,
  },
  btnTitle: {
    color: colors.light_text2,
  },
  progressCircle: { alignSelf: 'center' },
});
