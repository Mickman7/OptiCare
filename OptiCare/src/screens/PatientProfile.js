import { Image, StyleSheet, Text, View, ActivityIndicator, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_APP, FIREBASE_DB } from '../../FirebaseConfig';
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import AuthForm from '../components/AuthForm';
import { useNavigation } from '@react-navigation/native';


const PatientProfile = ({route}) => {

    const { patientId } = route.params;
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState();
    const navigation = useNavigation();

    const addNotes = async() => {
        try {
            const notesCollectionRef = collection(FIREBASE_DB, 'patients', patientId, 'notes');
        
            await addDoc(notesCollectionRef, {
                notes: notes,
                timestamp: new Date(), 
            });
            navigation.goBack()
            console.log('Note added successfully!');
        } catch (err) {
        console.error('Error adding note:', err);
        }
    }

    const getPatientsById = async () => {
        try {
            const userDocRef = doc(FIREBASE_DB, 'patients', patientId);
            const userDocSnapshot = await getDoc(userDocRef);
        
            if (userDocSnapshot.exists()) {
                const data = userDocSnapshot.data();
                setUserData(data);
            } else {
              console.log("No such document!");
            }
          } catch (err) {
            console.log('Fetch Error: ', err);
          }finally{
            setLoading(false)
          }
      };

      useEffect(() => {
        getPatientsById();
      },[])

    //   useEffect(() => {
    //     console.log("Updated User Data:", userData);
    //   }, [userData])

      if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
      }

  return (
    <View>
        <View>
            {/* <Image source={require()}/> */}
            <Text>First Name: {userData.firstName}</Text>
            <Text>Last Name: {userData.lastName}</Text>
            <Text>Date of Birth:{}</Text>
            <Text>Gender: {userData.gender}</Text>
            <Text>NHS Number: {userData.nhsNum}</Text>
        </View>
        <Text>Email: {userData.email}</Text>
        <Text>Email: {userData.telephone}</Text>

        <View>
            <Text>Notes:</Text>
            <TextInput 
                value={notes}
                onChangeText={setNotes}
                style={{width: 300, height: 100, borderWidth: 1}}
            />
        </View>
        <AuthForm.AuthButton
            label='Add Note'
            onPress={addNotes}
        />
    </View>
  )
}

export default PatientProfile

const styles = StyleSheet.create({})