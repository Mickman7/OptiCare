// profileService.js
import { db } from './firebaseConfig'; // Import Firebase Firestore config
import { doc, setDoc } from 'firebase/firestore';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

export const saveUserProfile = async (firstName, lastName, address) => {
  const user = FIREBASE_AUTH.currentUser; // Get the currently authenticated user
  if (user) {
    const userRef = doc(db, 'users', user.uid); // Use the UID as the document ID
    await setDoc(userRef, {
      firstName,
      lastName,
      email: user.email, // Email from Firebase Auth
      address,
    });
  } else {
    throw new Error('No user signed in');
  }
};