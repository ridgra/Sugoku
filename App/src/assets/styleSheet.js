import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textView: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
  },
  inputName: {
    fontSize: 18,
    // color: '#ff9a00',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ff9a00',
    margin: 10,
  },
  buttonPrimary: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 1,
    borderColor: '#ff9a00',
    borderRadius: 5,
    padding: 5,
    margin: 3,
    alignItems: 'center',
    width: 100,
  },
  buttonPrimaryText: {
    color: '#ff9a00',
    fontSize: 18,
  },
});
