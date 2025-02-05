import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';


export const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user.uid; // Return the UID after successful sign-up
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};