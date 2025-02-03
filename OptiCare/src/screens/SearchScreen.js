import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import UserItem from '../components/UserItem'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { FIREBASE_APP, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, getDocs } from "firebase/firestore";


// import img from '../assets/veschwab.png'

const img  = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'





const SearchScreen = () => {

  const [userInfo, setUserInfo] = useState([])



  const [searchVal, setSearchVal] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(userInfo);

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [isStaff, setIsStaff] = useState(false)
  const [occupation, setOccupation] = useState('')


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
      console.log(filteredUsers)
    } else {
      const filtered = userInfo.filter((user) =>
        user.firstName.toLowerCase().startsWith(text.toLowerCase())
    );
      setFilteredUsers(filtered);
      console.log(filteredUsers)


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
      <ScrollView style={styles.scrollView}>
        <Text>Search for users</Text>
        {filteredUsers.map((user, index) => (
          <UserItem key={index} name={user.firstName + ' ' + user.lastName} speciality={user.speciality || 'No speciality given'} image={img} />
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