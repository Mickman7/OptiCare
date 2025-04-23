import { Image, StyleSheet, Text, View, ActivityIndicator, TextInput, ScrollView } from 'react-native'
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
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
      }

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileHeader}>
            <Image 
                source={{ uri: 'https://via.placeholder.com/150' }} 
                style={styles.profileImage} 
            />
            <Text style={styles.profileName}>{userData.firstName} {userData.lastName}</Text>
        </View>
        <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Date of Birth:</Text>
            <Text style={styles.infoValue}>{userData.dob || 'N/A'}</Text>
            <Text style={styles.infoLabel}>Gender:</Text>
            <Text style={styles.infoValue}>{userData.gender}</Text>
            <Text style={styles.infoLabel}>NHS Number:</Text>
            <Text style={styles.infoValue}>{userData.nhsNum}</Text>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{userData.email}</Text>
            <Text style={styles.infoLabel}>Telephone:</Text>
            <Text style={styles.infoValue}>{userData.telephone}</Text>
        </View>
        <View style={styles.notesSection}>
            <Text style={styles.notesLabel}>Notes:</Text>
            <TextInput 
                value={notes}
                onChangeText={setNotes}
                style={styles.notesInput}
                multiline
                placeholder="Add your notes here..."
            />
        </View>
        <AuthForm.AuthButton
            label='Add Note'
            onPress={addNotes}
            style={styles.addButton}
        />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
        alignItems: 'center'
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
        width: '100%'
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    infoSection: {
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: '100%'

    },
    infoLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
    },
    infoValue: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    notesSection: {
        marginBottom: 20,
        width: '100%'

    },
    notesLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#555',
        marginBottom: 10,
    },
    notesInput: {
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
        textAlignVertical: 'top',
        
    },
    addButton: {
        marginTop: 10,
        alignSelf: 'center',
    },
});

export default PatientProfile