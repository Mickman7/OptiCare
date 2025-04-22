import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, addDoc, serverTimestamp, updateDoc, doc, setDoc } from 'firebase/firestore';
import AuthForm from './AuthForm'
import DateTimePicker from '@react-native-community/datetimepicker'


const EventForm = ({ onClose, selectedDate }) => {

    const [date, setDate] = useState(selectedDate || currentDate);
    const [time, setTime] = useState(null);
    const [pickerTime, setPickerTime] = useState(new Date()); // Initialize with current time
    const [title, setTitle] = useState('');
    const [info, setInfo] = useState('');
    const [type, setType] = useState('No Type');
    const [organiser, setOrganiser] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const currentDate = new Date().toISOString().split('T')[0];
    const currentUser = FIREBASE_AUTH.currentUser;

    const onChange = (event, selectedTime) => {
      if (selectedTime) {
        setPickerTime(selectedTime); // Update pickerTime to the selected value
        const hours = selectedTime.getHours().toString().padStart(2, '0');
        const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        setTime(formattedTime); // Update time
      }
    };

    const addEvent = async () => {
      if (!currentUser) {
        Alert.alert('Error', 'No user is currently logged in.');
        return;
      }
    
      if (!selectedDate) {
        Alert.alert('Error', 'No date is selected.');
        return;
      }
  
      if (!title.trim() || !info.trim() || !organiser.trim()) {
        Alert.alert('Error', 'Please fill all fields.');
        return;
      }
    
      try {
        const eventRef = doc(collection(FIREBASE_DB, 'events')); 
        const eventData = {
          eventId: eventRef.id, 
          date: date || currentDate,
          title,
          info,
          type,
          time: time || 'N/A',
          organiser,
          createdBy: currentUser.uid,
          createdAt: serverTimestamp(),
        };
    
        await setDoc(eventRef, eventData); 
        Alert.alert('Success', 'Event submitted successfully!');
        onClose();
      } catch (err) {
        console.error('Error creating event:', err);
        Alert.alert('Error', 'Failed to create event.');
      }
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.exitBtn}>
            <TouchableOpacity onPress={onClose}>
                <Text>X</Text>
            </TouchableOpacity>
        </View>
      <Text>Add an Event</Text>
     
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        ></KeyboardAvoidingView>

        <AuthForm.InputText
            label='Event Title'
            value={title}
            onChange={setTitle}
            isPassword={false}
        />
        <AuthForm.InputText
            label='Event Info'
            value={info}
            onChange={setInfo}
            isPassword={false}
        />

        <AuthForm.InputSelect
          label="Type of Event"
          options={['Meeting', 'Consultation', 'Appointment', 'External Event']}
          selectedValue={type}
          onValueChange={(value) => setType(value)} 
        />

        <DateTimePicker
          value={pickerTime} // Use pickerTime to retain the selected value
          mode="time"
          display="default"
          onChange={onChange}
        />

        <AuthForm.InputText
            label='Event  organiser'
            value={organiser}
            onChange={setOrganiser}
            isPassword={false}
        />

        <TouchableOpacity onPress={addEvent} style={styles.submitButton}>
            <Text>Submit</Text>
        </TouchableOpacity>


    </ScrollView>
  )
}

export default EventForm

const styles = StyleSheet.create({
    container: {
        marginVertical: '35%',
        width: 400,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    exitBtn: {
        position: 'absolute',
        top: 8,              
        right: 8,             
        zIndex: 1,            
        padding: 5,
        margin: 5,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitButton: {
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