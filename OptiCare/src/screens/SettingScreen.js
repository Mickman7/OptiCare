import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { FIREBASE_AUTH } from '../../FirebaseConfig';


const SettingScreen = ({navigation}) => {

    const handleSignOut = () => {
        FIREBASE_AUTH.signOut()
          .then(() => {
            navigation.navigate('Login')
            Alert.alert('Signed out successfully');
          })
          .catch((error) => {
            Alert.alert('Error signing out', error.message);
          });
      };

  return (
    <View style={styles.settingContainer}>
      <Text>SettingScreen</Text>
      <TouchableOpacity style={styles.signOutButton}><Text style={styles.signOutText}>Setting 1</Text></TouchableOpacity>
      <TouchableOpacity style={styles.signOutButton}><Text style={styles.signOutText}>Setting 2</Text></TouchableOpacity>
      <TouchableOpacity style={styles.signOutButton}><Text style={styles.signOutText}>Setting 3 </Text></TouchableOpacity>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
    settingContainer: {
        padding: 10,
    },
    signOutButton: {
        height: 50,
        borderBottomWidth: 1,
        textAlign: 'left',
        justifyContent: 'center',
        padding: 3,
        width: 'auto',
        elevation: 1
      },
      signOutText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'semibold',
        marginLeft: 10
      },
})