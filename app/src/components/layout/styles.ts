import Constants from 'expo-constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    position: 'relative',
    paddingTop: Constants.statusBarHeight
  },
  activityButtonStack: {
    bottom: 0,
    width: '100%',
    display: 'flex',
    position: 'absolute',
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 30
  }
})
