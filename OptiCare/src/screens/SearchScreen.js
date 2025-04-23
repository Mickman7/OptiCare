import { StyleSheet, Text, View, scrollView, TextInput, ScrollView, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import UserItem from '../components/UserItem'
import { FIREBASE_APP, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

import DefaultProfileImage from '../assets/DefaultProfileImage.png'
import AuthForm from '../components/AuthForm';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState([])

  const [searchVal, setSearchVal] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(userInfo);

  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, "users")); 
      const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserInfo(userData);
      setFilteredUsers(userData); 

    } catch (err) {
      console.log('Fetch Error: ', err);
    }
  };

  const handleSearchChange = (text) => {
    setSearchVal(text);
    if (text === '') {
      setFilteredUsers(userInfo);
    } else {
      const filtered = userInfo.filter((user) =>
        user.firstName.toLowerCase().startsWith(text.toLowerCase())
    );
      setFilteredUsers(filtered);

    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.searchContainer}>
        <TextInput
          value={searchVal}
          placeholder="Search"
          onChangeText={handleSearchChange}
          style={styles.searchInput}
        />
        <Text>Search for users</Text>
        <ScrollView style={styles.scrollView}>
          {filteredUsers.map((user, index) => (
            <UserItem
              key={index}
              name={user.firstName + ' ' + user.lastName}
              speciality={user.speciality || 'No speciality given'}
              image={DefaultProfileImage}
              onPress={() => navigation.navigate('UserProfile', { user })}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white', // Optional: Set a background color
  },
  searchContainer: {
    alignItems: 'center',
    margin: 15,

  },
  searchInput: {
    padding: 15,
    // borderWidth: 1,
    width: 350,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    margin: 20,

  },
  scrollView: {
    overflow: 'scroll',
    width: '100%',
    height: '100%'
  }
})