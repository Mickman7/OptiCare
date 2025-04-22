import { StyleSheet, Text, View, TouchableOpacity, Platform, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import AuthForm from './AuthForm'
import DateTimePicker from '@react-native-community/datetimepicker'
import { collection, addDoc, serverTimestamp, updateDoc, doc} from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';

const PatientDetailsForm = ({navigation}) => {

    const [nhsNum, setNhsNum] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dob, setDob] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [gender, setGender] = useState('')
    const [address, setAddress]  = useState('')
    const [telephone, setTelephone] = useState('')
    const [email, setEmail] = useState('')

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || dob;
      setShowPicker(Platform.OS === 'ios'); 
      setDob(currentDate);
    };



    const handleSubmit = async() => {
      try{

        if(nhsNum && firstName && lastName && dob && gender && address && telephone && email){

          const docRef = await addDoc(collection(FIREBASE_DB, 'patients'), {
              nhsNum: nhsNum,
              firstName: firstName,
              lastName: lastName,
              dateOfBirth: dob,
              gender: gender,
              address: address,
              telephone: telephone,
              email: email,
              timestamp: serverTimestamp()
              
            });
            await updateDoc(doc(FIREBASE_DB, 'patients', docRef.id), {
              patientId: docRef.id, 
            });
  
            console.log('patient form successfully submitted')
            navigation.navigate('PatientListScreen');
        }else{
          Alert.alert('All fields must be entered');
        }
      }catch(err) {
          console.error("Error submitting patient details:", err.message)
      }
        
    }


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center',}}>

        <AuthForm.InputText
          label='NHS Number'
          value={nhsNum}
          onChange={setNhsNum}
          isPassword={false}
        />

        <AuthForm.InputText
          label='First Name'
          value={firstName}
          onChange={setFirstName}
          isPassword={false}
        />

        <AuthForm.InputText
          label='Last Name'
          value={lastName}
          onChange={setLastName}
          isPassword={false}
        />

          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={onChange}
          />
        
      
      <AuthForm.InputSelect
          label='Gender'
          options={['Male', 'Female', 'Other']}
          selectedValue={gender}
          onValueChange={(value) => setGender(value)}
      />

      <AuthForm.InputText
          label='Address'
          value={address}
          onChange={setAddress}
          isPassword={false}
      />
      <AuthForm.InputText
          label='Phone number'
          value={telephone}
          onChange={setTelephone}
          isPassword={false}
      />
      <AuthForm.InputText
          label='Email'
          value={email}
          onChange={setEmail}
          isPassword={false}
      />
      
      </ScrollView>
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text>Submit</Text>
      </TouchableOpacity>



    </View>
  )
}

export default PatientDetailsForm

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '95%'
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