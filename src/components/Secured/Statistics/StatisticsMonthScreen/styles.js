import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  editMode: {
    paddingBottom: 105,
  },
  action: {
    backgroundColor: 'transparent',
  },
  chevronRight: {
    width: 10,
    height: 10,
    marginTop: 7,
    marginLeft: 5,
    marginRight: 8,
    borderColor: '#ccc',
    borderTopWidth: 1,
    borderRightWidth: 1,
    transform: [
      {
        rotate: '45deg',
      },
    ],
  },
  btnHide: {
    display: 'none',
  },
  btnEdit: {
    position: 'absolute',
    top: -60,
    right: 10,
    width: 45,
    height: 45,
    backgroundColor: '#5cc5c6',
    borderRadius: 45 / 2,
  },
});
