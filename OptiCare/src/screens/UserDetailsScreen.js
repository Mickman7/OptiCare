import { StyleSheet, Text, View, ScrollView, navigate } from 'react-native'
import React, { useState } from 'react'
import AuthForm from '../components/AuthForm'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';

import { collection, query, orderBy, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';






const UserDetailsScreen = ({navigation, route}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [photoURL, setPhotoURL] = useState('https://example.com/default-avatar.png');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [speciality, setSpeciality] = useState('');


    const messagesRef = collection(FIREBASE_DB, 'users');
    const [user] = useAuthState(FIREBASE_AUTH);
    // const { userId, email } = route.params;


    const sendUserDetails = async () => {
        if (!user) {
            console.error("No authenticated user found.");
            return;
        }
    
        const userId = FIREBASE_AUTH.currentUser.uid;
        const userEmail = FIREBASE_AUTH.currentUser.email;
    
        // Check if the required details are present
        if (!firstName || !lastName || !address || !dob || !phone || !speciality) {
            console.error("All fields must be filled out.");
            return;
        }
    
        const userDetails = {
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            email: userEmail,
            photoURL: photoURL,
            createdAt: serverTimestamp(),
            address: address,
            dob: dob,
            phone: phone,
            speciality: speciality
        };
    
        try {
            // Save user details to Firestore
            await addDoc(collection(FIREBASE_DB, 'users'), userDetails);
            console.log('User details submitted successfully!');
    
            // Navigate to MainDrawer and pass the user data
            navigation.navigate('MainDrawer', {
                userId,
                firstName,
                lastName,
                email: userEmail,
                photoURL,
                address,
                dob,
                phone,
                speciality
            });
    
        } catch (err) {
            console.error("Error submitting user details:", err.message);
        }
    };
    
    

  return (
    <View>
      <Text>UserDetailsScreen</Text>
      <ScrollView>
        <AuthForm.InputText
            label='First name'
            value={firstName}
            onChange={setFirstName}
            placeholder='Enter first name'
        />
        <AuthForm.InputText
            label='Last name'
            value={lastName}
            onChange={setLastName}
            placeholder='Enter last name'
        />
        <AuthForm.InputText
            label='Profile Picture'
            value={photoURL}
            onChange={setPhotoURL}
            placeholder='Enter picture url'
        />
        <AuthForm.InputText
            label='Adress'
            value={address}
            onChange={setAddress}
            placeholder='Enter your address'
        />
        <AuthForm.InputText
            label='Date of birth'
            value={dob}
            onChange={setDob}
            placeholder='Enter your date of birth'
        />
        <AuthForm.InputText
            label='Phone number'
            value={phone}
            onChange={setPhone}
            placeholder='Enter your phone number'
        />
        <AuthForm.InputText
            label='Speciality'
            value={speciality}
            onChange={setSpeciality}
            placeholder='Enter speciality'
        />

        <AuthForm.AuthButton label='Add' onPress={sendUserDetails}/>



      </ScrollView>
    </View>
  )
}

export default UserDetailsScreen

const styles = StyleSheet.create({})