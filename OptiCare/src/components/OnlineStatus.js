import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig';

const OnlineStatus = ({label}) => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setIsOnline(true);
      } else {
        // User is signed out
        setIsOnline(false);
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);


  return (
    <View style={[styles.stausContainer, { backgroundColor: isOnline ? 'lightgreen' : 'red' },]}>
      <Text>{isOnline ? label='Online' : label='Offline'}</Text>
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
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    }
})