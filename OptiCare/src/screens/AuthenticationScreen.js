import { StyleSheet, Text, View, ImageBackground} from 'react-native'
import React, { useState,useEffect } from 'react'
import AuthForm from '../components/AuthForm'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from '../../FirebaseConfig'; 
import Wallpaper from '../assets/hospital wallpaper.jpg'






const Login = ({navigation, route}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setUser] = useState(null); 
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
        console.log('Attempting authentication...');
        console.log('Email:', email);
        console.log('Password:', password);

        if (isLogin) {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in successfully!');
            navigation.navigate('MainDrawer');
        } else {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User created successfully!');
            navigation.navigate('Details');
        }
    } catch (error) {
        console.error('Authentication error:', error); 

        switch (error.code) {
            case 'auth/invalid-credential':
                Alert.alert('Error', 'Invalid credentials. Please try again.');
                break;
            case 'auth/user-not-found':
                Alert.alert('Error', 'No user found with this email.');
                break;
            case 'auth/wrong-password':
                Alert.alert('Error', 'Incorrect password.');
                break;
            case 'auth/too-many-requests':
                Alert.alert('Error', 'Too many attempts. Try again later.');
                break;
            default:
                Alert.alert('Error', `Authentication failed: ${error.message}`);
        }
    }
  };

  return (
      <ImageBackground
        source={Wallpaper} 
        style={styles.background}
      >
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
                isPassword={true}

            />

            {!isLogin ? (

                <AuthForm.InputText
                    label='Confirm Password'
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder='Confirm Password'
                    isPassword={true}
                />
                
            ) : ''}

            <AuthForm.AuthButton 
                label={isLogin ? 'Sign in': 'Sign up'} 
                onPress={handleAuthentication}
            />

            


          </AuthForm>
        </View>
      </ImageBackground>
  )
}





const userDetails = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  return(
    <View>
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
    </View>
  );
}








export default Login

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16

    },
    background: {
      flex: 1,
    }
})