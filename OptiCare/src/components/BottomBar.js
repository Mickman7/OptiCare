import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


//Screens
import Home from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CalendarScreen from '../screens/CalendarScreen';

const Tab = createBottomTabNavigator();


const BottomBar = ({navigation, state, onPress}) => {

  const [isActive, setIsActive] = useState(state.index);


  const handleTabPress = (routeName, index) => {
    setIsActive(index);
    navigation.navigate(routeName);
  };

  const icons = {
    Home: 'home',
    Calendar: 'calendar',
    Chat: 'mail',
    Search: 'search'
  };


  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => (
        <TouchableOpacity
        key={route.key}
        style={styles.tabItem}
        onPress={() => handleTabPress(route.name, index)}
      >
        <Ionicons name={icons[route.name]} size={30} color={isActive === index ? '#13AE85' : 'black'}/>
      </TouchableOpacity>
      ))}


      <TouchableOpacity
        onPress={onPress}
        title='addEventBtn'
        style={styles.addEventBtn}
      >
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30,}}>+</Text>
      </TouchableOpacity>

    {/* <TouchableOpacity
      onPress={() => {
        navigation.navigate('Home');
        setIsActive(true)
      }}
      
    >
      <Ionicons name='home' size={30} />
    </TouchableOpacity>


    <TouchableOpacity
      onPress={() => {
        // Navigate using the `navigation` prop that you received
        navigation.navigate('Calendar');
      }}
      title='Calendar'
    >
      <Ionicons name='calendar' size={30} />
    </TouchableOpacity>


    <TouchableOpacity
      onPress={() => {
       console.log('Button Pressed')
      }}
      title='addEventBtn'
      style={styles.addEventBtn}
    >
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30,}}>+</Text>
    </TouchableOpacity>


    <TouchableOpacity
      onPress={() => {
        // Navigate using the `navigation` prop that you received
        navigation.navigate('Chat');
      }}
      title='Chat'
    >
      <Ionicons name='mail' size={30} />
    </TouchableOpacity>


    <TouchableOpacity
      onPress={() => {
        // Navigate using the `navigation` prop that you received
        navigation.navigate('Search');
      }}
      title='Search'
    >

      <Ionicons name='search' size={30} />
    </TouchableOpacity> */}
    
  </View>
  )
}

export default BottomBar

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 75,
    width: '100%',
    backgroundColor: 'white'
  },
  addEventBtn: {
    position: 'absolute',
    top: -25, 
    left: '50%',
    transform: [{ translateX: -30 }],
    alignSelf: 'center',
    backgroundColor: '#13AE85',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }

})