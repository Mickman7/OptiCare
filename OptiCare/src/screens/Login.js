import { StyleSheet, Text, View} from 'react-native'
import React, { useState,useEffect } from 'react'
import AuthForm from '../components/AuthForm'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig"; 



 



const Login = ({navigation, route}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setUser] = useState(null); // Track user authentication state
    const [loading, setLoading] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    const auth = FIREBASE_AUTH;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
          setUser(user);
        });
      
        return unsubscribe;
      }, []);
      
    


  const handleAuthentication = async () => {
    if (!email || !password) {
        console.error("Email or password is empty.");
        return;
      }
    
      if (!isLogin && password !== confirmPassword) {
        console.error("Passwords do not match.");
        return;
      }
    
      try {
        if (user) {
          // If user is already authenticated, log out
          console.log('User logged out successfully!');
          await signOut(auth);
        } else {
          // Sign in or sign up
          if (isLogin) {
            // Sign in
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('Home')
            console.log('User signed in successfully!');
          } else {
            // Sign up
            await createUserWithEmailAndPassword(auth, email, password);
            navigation.navigate('Home')
            console.log('User created successfully!');
          }
        }
      } catch (error) {
        console.error('Authentication error:', error.message);
      }
  };

  return (
    <View style={styles.container}>
      <AuthForm 
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      >

        <AuthForm.InputText
            label='Email'
            value={email}
            onChange={setEmail}
            placeholder='Enter Email'
        />
        <AuthForm.InputText
            label='Password'
            value={password}
            onChange={setPassword}
            placeholder='Enter Password'

        />

        {!isLogin ? (

            <AuthForm.InputText
                label='Confirm Password'
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder='Confirm Password'
    
            />
        ) : ''}

        <AuthForm.AuthButton 
            label={isLogin ? 'Sign in': 'Sign up'} 
            onPress={handleAuthentication}
        />

        


      </AuthForm>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        padding: 16

    }
})