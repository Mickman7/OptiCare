import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'


const CustomDrawerContent = (props) => {

    const drawConfig = [
        { name: 'Main', icon: 'phone-portrait', label: 'Main' },
        { name: 'Settings', icon: 'settings', label: 'Search' },
        { name: 'Notifications', icon: 'notifications', label: 'Notifications' },
        { name: 'Privacy', icon: 'lock', label: 'Notifications' },
        { name: 'Help', icon: 'help-circle', label: 'Profile' },
        { name: 'LogOut', icon: 'log-out', label: 'Profile' },
      ];

    return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
            <TouchableOpacity  style={styles.profileItem} onPress={() => console.log('Open profile')}>
                <Text>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItems} onPress={() => console.log('Open profile')}>
                <Ionicons name='phone-portrait' size={20}/>
                <Text>Main</Text>
                <Ionicons name='chevron-forward' size={20} style={{}}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItems} onPress={() => console.log('Open profile')}>
            <Ionicons name='settings' size={20}/>
                <Text>Settings</Text>
                <Ionicons name='chevron-forward' size={20}/>

            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItems} onPress={() => console.log('Open profile')}>
            <Ionicons name='notifications' size={20}/>
                <Text>Notifications</Text>
                <Ionicons name='chevron-forward' size={20}/>

            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItems} onPress={() => console.log('Open profile')}>
            <Ionicons name='lock-closed' size={20}/>
                <Text>Privacy & Security</Text>
                <Ionicons name='chevron-forward' size={20}/>

            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItems} onPress={() => console.log('Open profile')}>
            <Ionicons name='help-circle' size={20}/>
                <Text>Help & Support</Text>
                <Ionicons name='chevron-forward' size={20}/>

            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItems} onPress={() => console.log('Open profile')}>
            <Ionicons name='log-out' size={20}/>
                <Text>Log Out</Text>
                <Ionicons name='chevron-forward' size={20}/>

            </TouchableOpacity>
        </DrawerContentScrollView>
      );
}

export default CustomDrawerContent

const styles = StyleSheet.create({
    drawerItems: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    profileItem: {
        borderWidth: 1,
        height: 200,
        alignItems: 'center'
    },
})