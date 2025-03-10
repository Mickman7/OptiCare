import React, { useActionState, useEffect, useState, navigate } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useAuthState } from 'react-firebase-hooks/auth'
import 'firebase/firestore'

// import auth from '@react-native-firebase/auth';



//Screens
import Login from './src/screens/AuthenticationScreen'
import Home from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import ChatScreen from './src/screens/ChatScreen';
import SettingScreen from './src/screens/SettingScreen';
import ChatListScreen from './src/screens/ChatListScreen';
import UserDetailsScreen from './src/screens/UserDetailsScreen';
import PatientDetailsForm from './src/components/PatientDetailsForm';
import PatientListScreen from './src/screens/PatientListScreen';
import PatientProfile from './src/screens/PatientProfile';

import Chart from './src/components/Chart'; //Temp


import { FIREBASE_AUTH } from './FirebaseConfig';




const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function ChatNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
}

function PatientsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="PatientListScreen" component={PatientListScreen} />
      <Stack.Screen name="AddPatients" component={PatientDetailsForm} />
      <Stack.Screen name="PatientProfile" component={PatientProfile} />
    </Stack.Navigator>
  );
}



function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Search') iconName = 'search';
          else if (route.name === 'Calendar') iconName = 'calendar';
          else if (route.name === 'Chat') iconName = 'mail';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Chat" component={ChatNavigator} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <TouchableOpacity onPress={() => console.log('Open profile')}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

function DrawerNavigator({navigation}) {

  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Main" component={BottomTabs} />
      <Drawer.Screen name="Settings" component={SettingScreen} />
      <Drawer.Screen name="Patients" component={PatientsNavigator} />
    </Drawer.Navigator>
  );
}





export default function App({navigation}) {

 const [user] = useAuthState(FIREBASE_AUTH)


  return (
    <>
    <NavigationContainer>
      <StatusBar style='auto'/>
      <Stack.Navigator initialRouteName={user ? 'MainDrawer': 'Login'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Details" component={UserDetailsScreen} />
        <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
        <Stack.Screen name="AddPatient" component={PatientDetailsForm} />
      </Stack.Navigator>
    </NavigationContainer>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
});
