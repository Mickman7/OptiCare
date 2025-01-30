import { StyleSheet, Text, View, ScrollView} from 'react-native'
import React, { useState } from 'react'
import AuthForm from '../components/AuthForm'
import Button from '../components/Button'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    

  return (
    <View style={styles.container}>
      <AuthForm >

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