import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';
import fonts from '../../../utils/fonts';

export default StyleSheet.create({
  sav: {
    height: '100%',
    backgroundColor: colors.dark_bg,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.light_text2,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  sv: { justifyContent: 'center', alignItems: 'center' },
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  item_container: {
    width: '100%',
    backgroundColor: colors.light_text2,
    borderRadius: 20,
    padding: 20,
  },
  header_container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-around',
  },
  title: {
    fontFamily: fonts.interstate_regular,
    fontSize: 20,
    color: colors.dark_bg2,
    flex: 1,
  },
  meta_container: {
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    marginTop: 10,
  },
  meta_text: {
    flex: 1,
    fontFamily: fonts.interstate_light,
    fontSize: 12,
    color: colors.dark_bg2,
  }
});
