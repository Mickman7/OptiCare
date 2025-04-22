import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


//Screens
import Home from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CalendarScreen from '../screens/CalendarScreen';

const Tab = createBottomTabNavigator();


const BottomBar = ({ navigation, state, onAddPress }) => {

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

  const handleAddPress = () => {
    if (state.routes[state.index].name === 'Calendar') {
      navigation.navigate('Calendar', { triggerAddEvent: true }); // Ensure parameter is passed correctly
    } else {
      Alert.alert('Add button pressed'); 
    }
  };


  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => (
        <TouchableOpacity
        key={route.key}
        style={styles.tabItem}
        onPress={() => handleTabPress(route.name, index)}
      >
        <Ionicons name={icons[route.name]} size={35} color={isActive === index ? '#13AE85' : 'black'} style={{marginHorizontal: 15}}/>
      </TouchableOpacity>
      ))}


      <TouchableOpacity
        onPress={handleAddPress}
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
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 75,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
  },
  addEventBtn: {
    position: 'absolute',
    top: -30,
    left: '50%',
    transform: [{ translateX: -35 }],
    backgroundColor: '#13AE85',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
});