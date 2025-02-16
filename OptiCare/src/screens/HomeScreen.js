import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import InfoCard from '../components/InfoCard'
import { FIREBASE_APP,FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import { Pressable } from 'react-native-gesture-handler';
import UserItem from '../components/UserItem';
import DefaultProfile from '../assets/DefaultProfileImage.png'
import Chart from '../components/Chart';


const img  = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

const currentUser = FIREBASE_AUTH.currentUser?.uid;


const Home = ({route}) => {

  const [infoValue, setInfoValue] = useState([]);
  const [sendValue, setSendValue] = useState('');
  const [formValue, setFormValue] = useState([{date: '05/02/2025', time: '15:00', type: 'Event', info: 'this is sent data test'}]); 
  const [userInfo, setUserInfo] = useState([])
  const [time, setTime] = useState('');
  const [type, setType] = useState('');
  const [info, setInfo] = useState('');


  // const {firstName, lastName, email, photoURL, address, dob, phone, speciality} = route.params;

  // Handle sending event data to Firebase
  const handleEvent = async () => {
    console.log('working...');
    if (!formValue.trim() || !time.trim() || !type.trim() || !info.trim()) return; // Prevent empty messages

    const eventData = {
      date: formValue,
      time,
      type,
      info,
    };

    console.log("Sending event:", eventData);

    try {
      await addDoc(collection(FIREBASE_DB, "infoCards"), eventData);
      console.log("Event successfully sent!");
      setSendValue(""); // Clear input after sending
    } catch (error) {
      console.error("Error creating event:", error);
    }

    setSendValue(''); // Clear input after sending
  };


  const getSchedule = async () => {
    try {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, "infoCards")); 
      const scheduleData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
      setInfoValue(scheduleData);
    } catch (err) {
      console.log('Fetch Error: ', err);
    }
  };

  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, "users")); 
      const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserInfo(userData);
      // console.log(userData)
    } catch (err) {
      console.log('Fetch Error: ', err);
    }
  };


  useEffect(() => {
    getSchedule(); 
    handleEvent();
    getUsers();

  }, []);

  return (
    <View>
      <View style={styles.scheduleContainer}>
        <ScrollView style={styles.schedule} horizontal={true}>
          {infoValue.length > 0 ? (
            infoValue.map((info) => (
              <InfoCard key={info.id} date={info.date} time={info.time} eventType={info.type} info={info.info} />
            ))
          ) : (
            <Text>No schedule found</Text>
          )}


        </ScrollView>

        <Pressable style={styles.button} onPress={handleEvent}>
          <Text>Add Event</Text>
        </Pressable>
      </View>
      
      <View style={styles.userContainer}>
        <Text>Recent Contacts</Text>
        <ScrollView horizontal={true}>
        {userInfo.map((user, index) => (
          <UserItem.UserCard key={index} image={img} name={user.firstName}/>
          ))}
        </ScrollView>
      </View>

      <View>
        <Chart/>
      </View>

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  scheduleContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  schedule: {
    flexDirection: 'row',
  },
  button: {
    width: 150,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#13AE85',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userContainer: {
    marginVertical: 15,
    marginHorizontal: 10
  }
})