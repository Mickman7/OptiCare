import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const UserProfileScreen = () => {
  const route = useRoute(); // Use the useRoute hook
  const user = route.params?.user; 
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) {
      setLoading(false); 
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const userDoc = await getDoc(doc(FIREBASE_DB, 'users', user.id));
        if (userDoc.exists()) {
          setUserDetails(userDoc.data());
        } else {
          console.log('No such user document!');
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  if (!userDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User details not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Image style={styles.profileImage} source={require('../assets/DefaultProfileImage.png')} />
      <Text style={styles.nameText}>{userDetails.firstName + ' ' + userDetails.lastName}</Text>
      <Text style={styles.specialityText}>Speciality: {userDetails.speciality || 'No speciality given'}</Text>
      <Text style={styles.emailText}>Email: {userDetails.email || 'No email provided'}</Text>
      <Text style={styles.phoneText}>Phone: {userDetails.phone || 'No phone number provided'}</Text>
      <Text style={styles.addressText}>Address: {userDetails.address || 'No address provided'}</Text>
      <Text style={styles.dobText}>Date of Birth: {userDetails.dob || 'No date of birth provided'}</Text>
    </View>
  );
};


export default UserProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
      loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 40,
        left: 20,
      },
      backButtonText: {
        fontSize: 18,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center'
      },
      profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
      },
      nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      specialityText: {
        fontSize: 18,
        marginBottom: 10,
      },
      emailText: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
      },
      phoneText: {
        fontSize: 16,
        marginBottom: 10,
      },
      addressText: {
        fontSize: 16,
        marginBottom: 10,
      },
      dobText: {
        fontSize: 16,
        marginBottom: 10,
      },
      errorText: {
        fontSize: 18,
        color: 'red',
      },
})