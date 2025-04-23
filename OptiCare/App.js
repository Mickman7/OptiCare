import 'react-native-reanimated'; 
import React from 'react';
import { StyleSheet, Alert, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuthState } from 'react-firebase-hooks/auth'
import 'firebase/firestore'
import { GestureHandlerRootView } from 'react-native-gesture-handler';


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
import EventDetailsScreen from './src/screens/EventDetailsScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';

import BottomBar from './src/components/BottomBar';
import CustomDrawerContent from './src/components/CustomDrawerContent';


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

  const openNotifications = () => {
    Alert.alert('Notifications Opened');
  }

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      options={{
        headerRight: () => (
          <Ionicons name='notifications' size={20} color='black' style={{ marginRight: 15 }} onPress={openNotifications} />
        ),
      }}
      tabBar={(props) => <BottomBar{...props}/>}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        initialParams={{ triggerAddEvent: false }} 
      />
      <Tab.Screen name="Chat" component={ChatNavigator} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}






function DrawerNavigator({navigation}) {

  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Main" component={BottomTabs} />

    </Drawer.Navigator>
  );
}





export default function App({navigation}) {

 const [user, loading] = useAuthState(FIREBASE_AUTH);

 if (loading) {
    return (
        <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Loading...</Text>
        </GestureHandlerRootView>
    );
 }

 if (!user) {
    console.log("No user is logged in.");
 }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style='auto'/>
        <Stack.Navigator initialRouteName={user ? 'MainDrawer': 'Login'} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Details" component={UserDetailsScreen} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
          <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
          <Stack.Screen name="AddPatient" component={PatientDetailsForm} />
          <Stack.Screen name="Settings" component={SettingScreen} />
          <Stack.Screen name="Patients" component={PatientsNavigator} />
          <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
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
