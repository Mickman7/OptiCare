import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import InfoCard from '../components/InfoCard'
import { FIREBASE_APP, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import AuthForm from '../components/AuthForm';






const Home = () => {

  const [infoValue, setInfoValue] = useState([]);
  const [sendValue, setSendValue] = useState('');
  const [formValue, setFormValue] = useState([{date: '05/02/2025', time: '15:00', type: 'Event', info: 'this is sent data test'}]); // Add state for the form field
  const [time, setTime] = useState('');
  const [type, setType] = useState('');
  const [info, setInfo] = useState('');

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


  useEffect(() => {
    getSchedule(); 
    handleEvent();
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
  }
})