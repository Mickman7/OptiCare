import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'
import { FIREBASE_AUTH } from '../../FirebaseConfig';


const CustomDrawerContent = (props) => {

      const handleSignOut = () => {
        FIREBASE_AUTH.signOut()
          .then(() => {
            props.navigation.navigate('Login')
            Alert.alert('Signed out successfully');
          })
          .catch((error) => {
            Alert.alert('Error signing out', error.message);
          });
      };

    return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
            <TouchableOpacity  style={styles.profileItem} onPress={() => console.log('Open profile')}>
                <Text>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItems} onPress={() => props.navigation.navigate('Patients')}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name='phone-portrait-outline' size={20} style={{marginRight: 8}}/>
                    <Text>Patient List</Text>
                </View>
                <Ionicons name='chevron-forward' size={20} style={{}}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItems} onPress={() => Alert.alert('Open Settings')}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name='settings-outline' size={20} style={{marginRight: 8}}/>
                    <Text>Settings</Text>
                </View>
                <Ionicons name='chevron-forward' size={20}/>

            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItems} onPress={() => Alert.alert('Open Notifications')}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name='notifications-outline' size={20} style={{marginRight: 8}}/>
                    <Text>Notifications</Text>
                </View>
                <Ionicons name='chevron-forward' size={20}/>

            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItems} onPress={() => Alert.alert('Open Privacy & Security')}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name='lock-closed-outline' size={20} style={{marginRight: 8}}/>
                    <Text>Privacy & Security</Text>
                </View>
                <Ionicons name='chevron-forward' size={20}/>

            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItems} onPress={() => Alert.alert('Open Help & Support')}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name='help-circle-outline' size={20} style={{marginRight: 8}}/>
                    <Text>Help & Support</Text>
                </View>
                <Ionicons name='chevron-forward' size={20}/>

            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItems} onPress={handleSignOut}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name='log-out-outline' size={20} style={{marginRight: 8}}/>
                    <Text>Log Out</Text>
                </View>
                <Ionicons name='chevron-forward' size={20}/>

            </TouchableOpacity>
        </DrawerContentScrollView>
      );
}

export default CustomDrawerContent

const styles = StyleSheet.create({
    drawerItems: {
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profileItem: {
        borderWidth: 1,
        height: 200,
        alignItems: 'center',
        marginTop: 10
    },
})