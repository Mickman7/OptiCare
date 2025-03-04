import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import UserItem from '../components/UserItem'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { FIREBASE_APP, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, getDocs } from "firebase/firestore";


import DefaultProfileImage from '../assets/DefaultProfileImage.png'





const SearchScreen = () => {

  const [userInfo, setUserInfo] = useState([])



  const [searchVal, setSearchVal] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(userInfo);



  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, "users")); 
      const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserInfo(userData);
      setFilteredUsers(userData); // Initialize filteredUsers with all users

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
          <UserItem key={index} name={user.firstName + ' ' + user.lastName} speciality={user.speciality || 'No speciality given'} image={DefaultProfileImage} />
        ))}
      </ScrollView>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  searchContainer: {
    alignItems: 'center',
    margin: 20,

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
    width: '100%'
  }
})