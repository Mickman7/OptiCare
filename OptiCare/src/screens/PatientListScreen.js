import { StyleSheet, Text, View, TextInput, ScrollView, navigate } from 'react-native'
import React, {useState, useEffect} from 'react'
import UserItem from '../components/UserItem'
import { FIREBASE_APP, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import AuthForm from '../components/AuthForm'

const PatientListScreen = ({navigation, route}) => {
    

    const [userInfo, setUserInfo] = useState([])
    const [searchVal, setSearchVal] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(userInfo);

    const getPatients = async () => {
        try {
          const querySnapshot = await getDocs(collection(FIREBASE_DB, "patients")); 
          const patientData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setUserInfo(patientData);
          setFilteredUsers(patientData); 
    
        } catch (err) {
          console.log('Fetch Error: ', err);
        }
      };


      const searchPatients = (text) => {
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

      const handleUserClick = (patientId) => {
        navigation.navigate("PatientProfile", { patientId });
      };

      useEffect(() => {
        getPatients();
      }, []);


  return (
    <View style={styles.searchContainer}>
        <TextInput
            value={searchVal}
            placeholder="Search"
            onChangeText={searchPatients}
            style={styles.searchInput}
        />
        <Text style={{}}>Search for Patients</Text>
        <ScrollView contentContainerStyle={styles.scrollView}>
            {filteredUsers.map((user, index) => (
            <UserItem.PatientItem key={index} name={user.firstName + ' ' + user.lastName} nhsNumber={user.nhsNum || 'No speciality given'} navigation={() => handleUserClick(user.patientId)}/>
            ))}
        </ScrollView>
        <AuthForm.AuthButton label='Add Patient' onPress={() => navigation.navigate('AddPatients')}/>

    </View>
  )
}

export default PatientListScreen

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
        alignItems: 'center',
        height: '70%',
        padding: 5,
        overflow: 'scroll'
      }
})