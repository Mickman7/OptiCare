import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OnlineStatus = ({label}) => {
  return (
    <View style={styles.stausContainer}>
      <Text>{label}</Text>
    </View>
  )
}

export default OnlineStatus

const styles = StyleSheet.create({
    stausContainer: {
        borderRadius: 20,
        padding: 2,
        width: 50,
        height: 20,
        backgroundColor: 'lightgreen',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    }
})