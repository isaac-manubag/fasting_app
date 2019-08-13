import { StyleSheet } from 'react-native';
import Colors from '../../../utils/colors';

export default StyleSheet.create({
  sav: {
    alignItems: 'center',
    height: '100%',
    backgroundColor: Colors.dark_bg,
  },
  image: { width: 250, height: 250, marginVertical: 40 },
  text: {
    color: Colors.light_text2,
    fontSize: 18,
    marginVertical: 10
  },
  logout: {
    backgroundColor: 'red'
  }
});
